/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from 'frog';
import { handle } from 'frog/next'; /** @jsxImportSource frog/jsx */
import { devtools } from 'frog/dev';
import { serveStatic } from 'frog/serve-static';
import { NeynarVariables, neynar } from 'frog/middlewares';
import { NEYNAR_API_KEY, PINATA_API_JWT } from '@/env/server-env';
import { PinataFDK } from 'pinata-fdk';
import ky from 'ky';

const fdk = new PinataFDK({
  pinata_jwt: PINATA_API_JWT,
  pinata_gateway: 'jade-general-jackal-249.mypinata.cloud',
});

const app = new Frog<{
  Variables: NeynarVariables;
}>({
  basePath: '/api',
  imageOptions: {
    width: 600,
    height: 600,
  },
});

app.use(
  neynar({
    apiKey: NEYNAR_API_KEY,
    features: ['interactor'],
  }),
);

app.use(
  '/',
  fdk.analyticsMiddleware({
    frameId: 'depepefy',
  }),
);

app.frame('/', (c) => {
  return c.res({
    image: 'https://i.imgur.com/HKXCGcC.gif',
    imageAspectRatio: '1:1',
    intents: [
      <Button action="/depe">🐸 🐸 🐸 DePEpEfrIenD ME 🐸 🐸 🐸</Button>,
    ],
  });
});

app.frame('/depe', async (c) => {
  const pfpUrl = c.var.interactor?.pfpUrl;
  const isImage =
    pfpUrl &&
    (await ky(pfpUrl).then(
      (res) => res.ok && res.headers.get('content-type')?.includes('image'),
    ));

  if (!pfpUrl || !isImage) {
    return c.res({
      image: (
        <div tw="flex h-full w-full flex-col items-center justify-center">
          <div tw="flex">You need to have a PFP</div>
        </div>
      ),
      imageAspectRatio: '1:1',
      intents: [<Button>🐸 🐸 🐸 DePEpEfY mE 🐸 🐸 🐸</Button>],
    });
  }

  const rootUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://depepefy.vercel.app'
      : `http://localhost:${process.env.PORT}`;
  const fid = c.var.interactor?.fid;

  return c.res({
    image: (
      <div tw="flex h-full w-full flex-col">
        <img
          src={`${rootUrl}/api/depepefy/${fid}`}
          width={'100%'}
          height={'100%'}
          alt=""
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    imageAspectRatio: '1:1',
    intents: [
      <Button.Link href={`${rootUrl}/api/depepefy/${fid}`}>
        Download Image
      </Button.Link>,
      <Button>Make it a collection</Button>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
