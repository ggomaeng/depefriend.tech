'use client';
import WalletButtons from '@/app/WalletButtons';
import { config } from '@/app/config';
import { decrypt } from '@/app/deploy/decrypt';
import { uploadImage, uploadMetadata } from '@/app/ipfs';
import { generateNextAvailableSymbol } from '@/utils/symbol';
import { User } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { mintclub } from 'mint.club-v2-sdk';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createWalletClient, custom } from 'viem';
import { degen } from 'viem/chains';
import { useAccount, useSwitchChain } from 'wagmi';
import { getConnections } from 'wagmi/actions';

export default function DeployPage() {
  const { chainId, connector, address, isConnected } = useAccount();
  const [user, setUser] = useState<User>();
  const [error, setError] = useState('');
  const [mcUrl, setMcUrl] = useState('');
  const [creating, setCreating] = useState(false);
  const [txError, setTxError] = useState('');
  const searchParams = useSearchParams();
  const { switchChainAsync } = useSwitchChain();

  const [stack, setStack] = useState<string[]>([]);
  const hash = searchParams.get('hash');

  useEffect(() => {
    (async () => {
      if (hash) {
        const user = await decrypt(decodeURIComponent(hash));
        if (!user) {
          setError('User not found');
        } else {
          setUser(user);
        }
      }
    })();
  }, [hash]);

  useEffect(() => {
    setError('');
    setCreating(false);
    setTxError('');
    setStack([]);
  }, [address]);

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>Welcome depe friend!</h1>
      <Image
        src={`/api/depepefy/${user.fid}`}
        width={300}
        height={300}
        alt="pfp"
        onError={() => setError('No PFP found')}
      />
      <div>
        <p>
          Collection name: <b>depefriend - {user.username}</b>
        </p>
        <p>
          Max supply: <b>1,000</b>
        </p>
        <p>
          Starting price: <b>69,000 DEPE</b>
        </p>
        <p>
          End price: <b>420,000 DEPE</b>
        </p>
        {isConnected ? (
          <div>
            <div>Connected: {address}</div>
            <button
              style={{ marginTop: 10, marginBottom: 10, fontSize: 18 }}
              disabled={creating}
              onClick={async () => {
                console.log('clicked');
                try {
                  setCreating(true);
                  setStack([]);
                  setTxError('');
                  if (chainId !== degen.id) {
                    await switchChainAsync({ chainId: degen.id });
                  }

                  const formData = new FormData();
                  const image = await (
                    await fetch(`/api/depepefy/${user.fid}`)
                  ).arrayBuffer();
                  const file = new File([image], 'pfp.png', {
                    type: 'image/png',
                  });
                  const imageForm = new FormData();
                  imageForm.append('file', file);
                  setStack((prev) => [...prev, 'Uploading image to IPFS...']);
                  const imageUrl = await uploadImage(imageForm);
                  setStack((prev) => [...prev, 'Image upload complete']);

                  const name = `depefriend - ${user.username}`;
                  const metadataForm = new FormData();
                  metadataForm.append('image', imageUrl);
                  metadataForm.append('name', name);
                  setStack((prev) => [
                    ...prev,
                    'Uploading metadata to IPFS...',
                  ]);
                  const metadataUrl = await uploadMetadata(metadataForm);
                  setStack((prev) => [...prev, 'Metadata upload complete']);

                  setStack((prev) => [
                    ...prev,
                    'Creating NFT Collection Data...',
                  ]);
                  const { symbol } = await generateNextAvailableSymbol({
                    symbol: `depefriend-${user.username}`,
                  });
                  console.log({ symbol });

                  const [{ connector }] = getConnections(config);
                  const provider = await connector.getProvider();
                  const client = createWalletClient({
                    chain: degen,
                    transport: custom(provider as any),
                    account: address,
                  });
                  const sdk = mintclub.withWalletClient(client as any);
                  console.log(sdk);
                  const nft = sdk.nft(symbol);
                  console.log(nft, provider);
                  const a = await nft.create({
                    name,
                    reserveToken: {
                      address: '0x2B3006D34359F3C23429167a659b18cC9c6F8bcA', // DEPE
                      decimals: 18,
                    },
                    buyRoyalty: 5,
                    sellRoyalty: 5,
                    curveData: {
                      curveType: 'EXPONENTIAL',
                      stepCount: 69, // how granular the curve is
                      maxSupply: 1_000, // NFT max supply
                      initialMintingPrice: 69000, // starting price
                      finalMintingPrice: 420_000, // ending price
                    },
                    metadataUrl,
                    debug(args) {
                      console.log(args);
                    },
                    onSuccess: (tx) => {
                      setStack((prev) => [
                        ...prev,
                        `NFT created: ${tx.transactionHash}`,
                      ]);
                      setMcUrl(`https://mint.club/nft/degen/${symbol}`);
                    },
                    onError(e: any) {
                      setTxError(e?.message);
                      setCreating(false);
                      console.error(e);
                    },
                  });
                  console.log({ a });
                } catch (e: any) {
                  console.error(e);
                  setCreating(false);
                  setTxError(e?.message);
                }
              }}
            >
              {creating ? 'creating...' : 'create'}
            </button>
            {stack.map((s, i) => (
              <div key={i}>{s}</div>
            ))}
            {mcUrl && (
              <div>
                <a href={mcUrl}>trade your keys here</a>
              </div>
            )}
            {txError && (
              <div
                style={{
                  color: 'red',
                }}
              >
                {txError}
              </div>
            )}
          </div>
        ) : (
          <WalletButtons />
        )}
      </div>
    </div>
  );
}
