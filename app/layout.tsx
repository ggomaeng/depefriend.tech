import { sharedMetadata } from '@/constants/metadata';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { Providers } from '@/app/providers';

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
    </html>
  );
}
