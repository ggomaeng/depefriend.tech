import Image from 'next/image';
import { Button } from './Button';
import { sharedMetadata } from '@/constants/metadata';

import { getRootUrl } from '@/utils/url';
import { getFrameMetadata } from 'frog/next';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const url = getRootUrl();
  const frameMetadata = await getFrameMetadata(`${url}/api`);
  return {
    ...sharedMetadata,
    other: frameMetadata,
    openGraph: {
      ...sharedMetadata.openGraph,
      title: 'DepeFriend.tech',
    },
  };
}

export default function DepePage() {
  return (
    <div>
      <h1>DepeFriend.tech</h1>
      <Image
        src={'https://i.imgur.com/sWppBb5.png'}
        width={300}
        height={300}
        alt="depe"
      />
      <p>
        Introducing the <b>DepeFriend.tech</b>: an experimental project poised
        to revolutionize the way we interact with degens. If you still don&#39;t
        know what $DEPE is, you can click the x button on your browser right
        now. If you know what DEGEN / DEPE is, then you&#39;re in the right
        place, friend. DepeFriend.tech is like friend.tech, but for degens only.{' '}
        <i>Simple</i>.
      </p>
      <h2
        style={{
          marginTop: 40,
        }}
      >
        $DEPE - the first Memecoin on the $DEGEN Chain. $DEPE will be used to
        buy each other&#39;s keys. Basically, the more keys you have, the more
        degen friends you have. The price climbs on an exponential bonding curve
        just like friend.tech; however, you can only purchase other keys with
        $DEPE.
      </h2>
      <Image
        src="/depechart.png"
        width={800}
        height={600}
        style={{
          maxWidth: '100%',
          objectFit: 'contain',
        }}
        alt="chart"
      />

      <h1>Max supply of $DEPE 420,690,000,000 DEPE</h1>
      <h1>TVL as of April 2nd: 122.26M WDEGEN</h1>
      <a href="https://text.is/DegenPepe" target="_blank">
        $DEPE details
      </a>
      <div
        style={{
          marginTop: 20,
        }}
      >
        <Image
          src="https://i.imgur.com/HKXCGcC.gif"
          width={500}
          height={500}
          alt="gif"
          style={{
            maxWidth: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
      <h1>Are you really a degen if you&#39;re not on Warpcast?</h1>
      <h2>
        These collections can only be deployed by our degen friends on warpcast.
      </h2>
      <p>
        If you dont have warpcast or have no idea what DEGEN is, sorry - go play
        with pepe friends instead.
      </p>
      <h3>Each collection will have its own unique taste.</h3>
      <div>
        <p>
          Max supply: <b>1,000</b>
        </p>
        <p>
          Starting price: <b>4,269 DEPE</b>
        </p>
        <p>
          End price: <b>426,900 DEPE</b>
        </p>
      </div>
      <h1>How do I become a DEPEfriend?</h1>
      <h2>Also simple. Click on your favorite button below.</h2>
      <p
        style={{
          opacity: 0.2,
        }}
      >
        Hint: one of the buttons might give you a little surprise.
      </p>

      <div>
        <div>
          <Button>click me</Button>
          <Button>click me</Button>
        </div>
        <div>
          <Button>click me</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button>click me</Button>
        </div>
        <div>
          <Button>click me</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button>click me</Button>
        </div>
        <div>
          <Button>click me</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button>click me</Button>
        </div>
        <Button>click me</Button>
        <Button>click me</Button>
      </div>

      <br />
      <br />
      <div>
        <div>
          <Button>click me</Button>
          <Button>click me</Button>
        </div>
        <div>
          <Button>click me</Button>
        </div>
        <div>
          <Button>click me</Button>
          <Button>click me</Button>
        </div>
        <div>
          <Button>click me</Button>
        </div>
        <Button>click me</Button>
        <Button>click me</Button>
      </div>

      <br />
      <br />
      <div>
        <div>
          <Button>click me</Button>
          <Button>click me</Button>
        </div>
        <div>
          <Button>click me</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button>click me</Button>
        </div>
        <div>
          <Button>click me</Button>
          <Button>click me</Button>
        </div>
        <div>
          <Button>click me</Button>
        </div>
        <Button>click me</Button>
      </div>

      <br />
      <br />
      <div>
        <div>
          <Button>click me</Button>
          <Button>click me</Button>
        </div>
        <div>
          <Button>click me</Button>
        </div>
        <div>
          <Button>click me</Button>
          <Button>click me</Button>
        </div>
        <div>
          <Button>click me</Button>
        </div>
        <Button>click me</Button>
        <Button>click me</Button>
      </div>

      <div
        style={{
          marginTop: 100,
        }}
      >
        Design inspied by{' '}
        <a
          href="https://llwapirxnupqu7xw2fspfidormcfar7ek2yp65nu7k5opjwhdywq.arweave.net/WuwHojdtHwp-9tFk8qBuiwRQR-RWsP91tPq656bHHi0"
          target="_blank"
        >
          BOOK OF MEME
        </a>
      </div>
    </div>
  );
}
