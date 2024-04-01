import { generate } from '@/utils/depepefy';
import sharp from 'sharp';

async function seed(fid: number) {
  const buffer = await generate(fid);

  await sharp(buffer).toFile(`./seed/${fid}.png`);
}

[
  // 1, //
  // 3, // dwr
  // 8106, // p7
  // 8151, //if
  // 8152, //ggoma
  // 8942, // tomo
  // 242692, // seouler
  // 192539, // ygg
  // 10810, // gami
  // 262938, // animated
  // 244902, // sartoshi
  // 248216, // sarcrotes
].forEach(seed);
