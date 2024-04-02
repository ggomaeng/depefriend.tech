/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */
import { DEPE_SECRET, NEYNAR_API_KEY, PINATA_API_JWT } from '@/env/server-env';
import { getRootUrl } from '@/utils/url';
import { AES } from 'crypto-js';
import { Button, Frog } from 'frog';
import { devtools } from 'frog/dev';
import { NeynarVariables, neynar } from 'frog/middlewares';
import { handle } from 'frog/next'; /** @jsxImportSource frog/jsx */
import { serveStatic } from 'frog/serve-static';
import ky from 'ky';
import { PinataFDK } from 'pinata-fdk';

const fdk = new PinataFDK({
  pinata_jwt: PINATA_API_JWT,
  pinata_gateway: 'jade-general-jackal-249.mypinata.cloud',
});

const app = new Frog<{
  Variables: NeynarVariables;
}>({
  browserLocation: '/',
  basePath: '/api',
  secret: DEPE_SECRET,
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
    title: 'depefriend.tech',
    image: 'https://i.imgur.com/HKXCGcC.gif',
    imageAspectRatio: '1:1',
    intents: [<Button action="/depe">depefriend me</Button>],
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
      title: 'depefriend.tech',
      image: (
        <div tw="flex h-full w-full flex-col items-center justify-center">
          <div tw="flex">you dont have a pfp</div>
        </div>
      ),
      imageAspectRatio: '1:1',
      intents: [<Button>Go back</Button>],
    });
  }

  const rootUrl = getRootUrl();
  const fid = c.var.interactor?.fid;

  const params = {
    fid,
  };

  console.log({ params });
  const encrypted = AES.encrypt(JSON.stringify(params), DEPE_SECRET).toString();

  return c.res({
    title: 'depefriend.tech',
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
        download image
      </Button.Link>,
      <Button.Link
        href={`${rootUrl}/deploy?hash=${encodeURIComponent(encrypted)}`}
      >
        become an official friend
      </Button.Link>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
