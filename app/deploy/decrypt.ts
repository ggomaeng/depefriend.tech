'use server';
import { DEPE_SECRET } from '@/env/server-env';
import { AES, enc } from 'crypto-js';
import { NEYNAR_API_KEY } from '@/env/server-env';
import { NeynarAPIClient } from '@neynar/nodejs-sdk';
import axios from 'axios';

const client = new NeynarAPIClient(NEYNAR_API_KEY, {
  axiosInstance: axios.create({
    headers: {
      'User-Agent': 'nodejs',
    },
  }),
});

export async function decrypt(ciphertext: string) {
  const bytes = AES.decrypt(ciphertext, DEPE_SECRET);
  const { fid } = JSON.parse(bytes.toString(enc.Utf8)) as { fid: number };
  const { users } = await client.fetchBulkUsers([fid]);
  const user = users?.[0];
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}
