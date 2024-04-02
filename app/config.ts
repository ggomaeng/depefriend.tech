import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { degen, mainnet } from 'wagmi/chains';
import { injected, safe, walletConnect } from 'wagmi/connectors';

const projectId = '933ceca09c35a7644b458f29423fa04c';

export const config = createConfig({
  chains: [mainnet, degen],
  connectors: [injected(), walletConnect({ projectId }), safe()],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [degen.id]: http(),
  },
});
