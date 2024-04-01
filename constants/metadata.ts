import { Metadata } from 'next';

const ROOT_URL = 'https://depefriend.tech';

const title = 'depefriend.tech';
const description = 'will you be my depe friend?';

export const sharedMetadata: Metadata = {
  title,
  description,
  icons: {
    icon: '/apple-touch-icon.png',
    shortcut: '/apple-touch-icon.png',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon.png',
    },
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    url: ROOT_URL,
    title,
    siteName: title,
    description,
    images: [
      {
        url: `https://i.imgur.com/HKXCGcC.gif`,
        width: 1200,
        height: 630,
        alt: 'depefriend.tech',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: {
      url: `https://i.imgur.com/HKXCGcC.gif`,
      width: 1200,
      height: 630,
      alt: 'depefriend.tech',
    },
  },
  robots: {},
};
