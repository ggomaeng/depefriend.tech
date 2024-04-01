import { mintclub } from 'mint.club-v2-sdk';

export async function generateNextAvailableSymbol(params: {
  symbol: string;
  tryCount?: number;
}) {
  const { symbol: immutableSymbol, tryCount = 1 } = params;

  let triedSymbol = immutableSymbol;

  console.log('immutableSymbol', immutableSymbol);

  if (tryCount > 1) {
    triedSymbol = `${immutableSymbol}${tryCount}`;
  }

  const exists = await mintclub.network('degen').nft(triedSymbol).exists();

  if (exists) {
    return generateNextAvailableSymbol({
      symbol: immutableSymbol,
      tryCount: tryCount + 1,
    });
  }

  return { symbol: triedSymbol, originalSymbol: immutableSymbol };
}
