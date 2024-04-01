import { createCanvas, loadImage } from 'canvas';
import { NEYNAR_API_KEY } from '@/env/server-env';
import { getDominantColorInGrid, rgbToHex } from '@/utils/colors';
import { NeynarAPIClient } from '@neynar/nodejs-sdk';
import { readFile } from 'fs/promises';
import ky from 'ky';
import sharp from 'sharp';

const client = new NeynarAPIClient(NEYNAR_API_KEY);

export async function generate(fid: number) {
  const { users } = await client.fetchBulkUsers([fid]);
  const pfpUrl = users[0].pfp_url;

  if (!pfpUrl) {
    throw new Error('No PFP found');
  }

  const imageBuffer = await ky.get(pfpUrl).arrayBuffer();

  // Pixeling helping with finding dominant color
  const pixelatedBuffer = await sharp(imageBuffer)
    .resize(50, 50) // Pixelate by resizing down
    .raw()
    .removeAlpha()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = pixelatedBuffer;

  // dividing input image into grid
  // this will create a 3x3 grid
  const gridSizeX = 3;
  const gridSizeY = 3;
  const cellWidth = Math.floor(info.width / gridSizeX);
  const cellHeight = Math.floor(info.height / gridSizeY);

  const palette: [number, number, number][] = [];

  for (let y = 0; y < gridSizeY; y++) {
    for (let x = 0; x < gridSizeX; x++) {
      const startX = x * cellWidth;
      const startY = y * cellHeight;
      const dominantColor = getDominantColorInGrid(
        data,
        startX,
        startY,
        cellWidth,
        cellHeight,
        info.width,
      );
      palette.push(dominantColor);
    }
  }

  const gridColor = (x: number, y: number) => {
    // if 0,0 passed = 0
    // if 2,2 passed = 8
    return rgbToHex(palette[y * gridSizeX + x]);
  };

  const bg = gridColor(0, 0);
  const body = gridColor(1, 1);
  const hat = gridColor(1, 0);
  const lips = gridColor(2, 2);

  let newBodySvg = await readFile('./public/depe.svg', 'utf-8');
  let newFingerSvg = await readFile('./public/finger.svg', 'utf-8');
  // depe has 6 colors, 1 being black for outline and 1 white for eye.
  // only replace the middle 4 colors
  const bodyColors: string[] = newBodySvg.match(/#[0-9a-fA-F]+/g) || [];
  const fingerColors: string[] = newFingerSvg.match(/#[0-9a-fA-F]+/g) || [];

  // color body
  for (let i = 1; i < bodyColors.length - 1; i++) {
    const color = bodyColors[i];
    let newColor;

    if (i === 1) {
      newColor = bg;
    } else if (i === 2) {
      newColor = hat;
    } else if (i === 3) {
      newColor = body;
    } else if (i === 4) {
      newColor = lips;
    } else {
      newColor = color || '';
    }
    newBodySvg = newBodySvg.replaceAll(color, newColor);
  }

  // color finger
  for (let i = 0; i < fingerColors.length - 1; i++) {
    const color = fingerColors[i];
    let newColor;

    // bg
    if (i === 0) {
      newColor = 'transparent';
    } else if (i === 1) {
      // finger
      newColor = body;
    }

    if (newColor) {
      newFingerSvg = newFingerSvg.replaceAll(color, newColor);
    }
  }

  const canvas = createCanvas(1000, 1000);
  const ctx = canvas.getContext('2d');
  const bodyImg = await loadImage(Buffer.from(newBodySvg));
  const fingerImg = await loadImage(Buffer.from(newFingerSvg));
  const userPfp = await loadImage(
    fid === 1 ? 'https://i.imgur.com/KgPToF4.gif' : Buffer.from(imageBuffer),
  );
  ctx.drawImage(bodyImg, 0, 0);
  ctx.save();
  // Add golden glow behind
  ctx.beginPath();
  ctx.arc(370, 830, 60, 0, Math.PI * 2, true); // Slightly larger radius for the glow effect
  ctx.fillStyle = 'gold';
  ctx.shadowColor = 'gold';
  ctx.shadowBlur = 20;
  ctx.fill();
  ctx.restore();
  ctx.save();
  // Continue with original drawing operations
  ctx.beginPath();
  ctx.arc(370, 830, 50, 0, Math.PI * 2, true);
  ctx.strokeStyle = 'black'; // Set border color to black
  ctx.lineWidth = 12; // Set border width
  ctx.stroke(); // Draw the border
  ctx.closePath();
  ctx.clip();
  ctx.translate(370, 830);
  ctx.rotate((-20 * Math.PI) / 180);
  ctx.drawImage(userPfp, -50, -50, 100, 100);
  ctx.restore();
  ctx.drawImage(fingerImg, 0, 0);

  return canvas.toBuffer('image/png');
}
