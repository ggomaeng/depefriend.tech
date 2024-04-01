import kmeans from 'kmeans-ts';

export function rgbToHex([r, g, b]: [number, number, number]) {
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function getDominantColorInGrid(
  data: Buffer,
  startX: number,
  startY: number,
  cellWidth: number,
  cellHeight: number,
  width: number,
): [number, number, number] {
  const pixels: number[][] = [];
  for (let y = 0; y < cellHeight; y++) {
    for (let x = 0; x < cellWidth; x++) {
      const pixelIndex = ((startY + y) * width + (startX + x)) * 3;
      pixels.push([
        data[pixelIndex] ?? 0, // Red
        data[pixelIndex + 1] ?? 0, // Green
        data[pixelIndex + 2] ?? 0, // Blue
      ]);
    }
  }

  const K = 1;
  const result = kmeans(pixels, K);

  // Check if centroids are returned, not undefined, and the first element exists
  if (result.centroids.length === 0 || result.centroids[0] === undefined) {
    throw new Error('No valid centroids returned from kmeans.');
  }

  // Now that we've checked centroids[0] is not undefined, we can safely access it
  const dominantColor = result.centroids[0].map(Math.round);
  return dominantColor as [number, number, number];
}

export function hexColorDistance(hex1: string, hex2: string) {
  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);

  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);

  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}
