import { useConnect } from 'wagmi';

export default function WalletButtons() {
  const { connectors, connect } = useConnect();
  return connectors.map((connector) => (
    <>
      <button
        key={connector.uid}
        onClick={() => connect({ connector })}
        style={{ fontSize: 18 }}
      >
        {connector.name === 'Injected'
          ? 'browser wallet'
          : connector.name === 'Safe'
            ? 'safe wallet'
            : connector.name.toLowerCase()}
      </button>
      &nbsp;&nbsp;
    </>
  ));
}
