import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { mainnet, degen } from 'wagmi/chains';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';

const projectId = '933ceca09c35a7644b458f29423fa04c';

export const config = createConfig({
  chains: [mainnet, degen],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [degen.id]: http(),
  },
});
