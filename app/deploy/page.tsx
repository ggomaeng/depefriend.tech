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
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi';
import { getConnections } from 'wagmi/actions';

const stepData = [
  { rangeTo: 0, price: 4269 },
  { rangeTo: 15, price: 4563.561 },
  { rangeTo: 29, price: 4878.446709 },
  { rangeTo: 44, price: 5215.059531921 },
  { rangeTo: 58, price: 5574.89863962355 },
  { rangeTo: 73, price: 5959.56664575757 },
  { rangeTo: 87, price: 6370.77674431485 },
  { rangeTo: 102, price: 6810.36033967257 },
  { rangeTo: 116, price: 7280.27520310998 },
  { rangeTo: 131, price: 7782.61419212457 },
  { rangeTo: 145, price: 8319.61457138116 },
  { rangeTo: 160, price: 8893.66797680646 },
  { rangeTo: 174, price: 9507.33106720611 },
  { rangeTo: 189, price: 10163.3369108433 },
  { rangeTo: 203, price: 10864.6071576915 },
  { rangeTo: 218, price: 11614.2650515722 },
  { rangeTo: 232, price: 12415.6493401307 },
  { rangeTo: 247, price: 13272.3291445997 },
  { rangeTo: 261, price: 14188.1198555771 },
  { rangeTo: 276, price: 15167.1001256119 },
  { rangeTo: 290, price: 16213.6300342792 },
  { rangeTo: 305, price: 17332.3705066444 },
  { rangeTo: 319, price: 18528.3040716029 },
  { rangeTo: 334, price: 19806.7570525435 },
  { rangeTo: 348, price: 21173.423289169 },
  { rangeTo: 363, price: 22634.3894961216 },
  { rangeTo: 377, price: 24196.162371354 },
  { rangeTo: 392, price: 25865.6975749775 },
  { rangeTo: 406, price: 27650.4307076509 },
  { rangeTo: 421, price: 29558.3104264788 },
  { rangeTo: 435, price: 31597.8338459058 },
  { rangeTo: 450, price: 33778.0843812733 },
  { rangeTo: 464, price: 36108.7722035812 },
  { rangeTo: 479, price: 38600.2774856283 },
  { rangeTo: 493, price: 41263.6966321367 },
  { rangeTo: 508, price: 44110.8916997541 },
  { rangeTo: 522, price: 47154.5432270371 },
  { rangeTo: 537, price: 50408.2067097027 },
  { rangeTo: 551, price: 53886.3729726721 },
  { rangeTo: 566, price: 57604.5327077865 },
  { rangeTo: 580, price: 61579.2454646238 },
  { rangeTo: 595, price: 65828.2134016828 },
  { rangeTo: 609, price: 70370.3601263989 },
  { rangeTo: 624, price: 75225.9149751205 },
  { rangeTo: 638, price: 80416.5031084038 },
  { rangeTo: 653, price: 85965.2418228836 },
  { rangeTo: 667, price: 91896.8435086626 },
  { rangeTo: 682, price: 98237.7257107603 },
  { rangeTo: 696, price: 105016.128784803 },
  { rangeTo: 711, price: 112262.241670954 },
  { rangeTo: 725, price: 120008.33634625 },
  { rangeTo: 740, price: 128288.911554141 },
  { rangeTo: 754, price: 137140.846451377 },
  { rangeTo: 769, price: 146603.564856522 },
  { rangeTo: 783, price: 156719.210831622 },
  { rangeTo: 798, price: 167532.836379004 },
  { rangeTo: 812, price: 179092.602089155 },
  { rangeTo: 827, price: 191449.991633307 },
  { rangeTo: 841, price: 204660.041056005 },
  { rangeTo: 856, price: 218781.583888869 },
  { rangeTo: 870, price: 233877.513177201 },
  { rangeTo: 885, price: 250015.061586428 },
  { rangeTo: 899, price: 267266.100835892 },
  { rangeTo: 914, price: 285707.461793568 },
  { rangeTo: 928, price: 305421.276657324 },
  { rangeTo: 943, price: 326495.34474668 },
  { rangeTo: 957, price: 349023.523534201 },
  { rangeTo: 972, price: 373106.14665806 },
  { rangeTo: 986, price: 398850.470777467 },
  { rangeTo: 1000, price: 426900 },
];

export default function DeployPage() {
  const { chainId, connector, address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
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
      <h1>welcome depe friend!</h1>
      <Image
        src={`/api/depepefy/${user.fid}`}
        width={300}
        height={300}
        alt="pfp"
        onError={() => setError('No PFP found')}
      />
      <div>
        <p>
          collection name: <b>depefriend - {user.username}</b>
        </p>
        <p>
          max supply: <b>1,000</b>
        </p>
        <p>
          starting price: <b>4,269 DEPE</b>
        </p>
        <p>
          end price: <b>426,900 DEPE</b>
        </p>
        {isConnected ? (
          <div>
            <div>
              <div>connected: {address}</div>
              <button onClick={() => disconnect?.()}>disconnect</button>
            </div>
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

                  const [{ connector }] = getConnections(config);
                  const provider = await connector.getProvider();
                  const client = createWalletClient({
                    chain: degen,
                    transport: custom(provider as any),
                    account: address,
                  });
                  const sdk = mintclub.withWalletClient(client as any);
                  const nft = sdk.nft(symbol);
                  const a = await nft.create({
                    name,
                    reserveToken: {
                      address: '0x2B3006D34359F3C23429167a659b18cC9c6F8bcA', // DEPE
                      decimals: 18,
                    },
                    buyRoyalty: 5,
                    sellRoyalty: 5,
                    stepData,
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
