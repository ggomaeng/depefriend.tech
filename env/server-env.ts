import dotenv from 'dotenv';
import { object, parse, string } from 'valibot';

dotenv.config();

const envSchema = object({
  NEYNAR_API_KEY: string('NEYNAR_API_KEY is required'),
  PINATA_API_JWT: string('PINATA_API_JWT is required'),
  DEPE_SECRET: string('DEPE_SECRET is required'),
  FILEBASE_API_KEY: string('FILEBASE_API_KEY is required'),
});

export const { FILEBASE_API_KEY, DEPE_SECRET, PINATA_API_JWT, NEYNAR_API_KEY } =
  parse(envSchema, process.env);
