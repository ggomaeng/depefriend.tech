import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { degen, mainnet, sepolia } from 'wagmi/chains';
import {
  coinbaseWallet,
  injected,
  safe,
  walletConnect,
} from 'wagmi/connectors';

const projectId = '933ceca09c35a7644b458f29423fa04c';

export const config = createConfig({
  chains: [mainnet, degen, sepolia],
  connectors: [
    injected(),
    coinbaseWallet({
      appName: 'depefriend.tech',
      appLogoUrl: 'https://depefriend.tech/android-chrome-512x512.png',
    }),
    walletConnect({ projectId }),
    safe(),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [degen.id]: http(),
    [sepolia.id]: http(),
  },
});
