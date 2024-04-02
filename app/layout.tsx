import { Providers } from '@/app/providers';
import { sharedMetadata } from '@/constants/metadata';
import { headers } from 'next/headers';
import { GoogleAnalytics } from '@next/third-parties/google';
import { cookieToInitialState } from 'wagmi';
import { config } from './config';

export const metadata = sharedMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));
  return (
    <html lang="en">
      <Providers initialState={initialState}>
        <body>{children}</body>
      </Providers>
      <GoogleAnalytics gaId="G-33WTETWFXX" />
    </html>
  );
}
