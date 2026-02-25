import { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import BalanceCard from "./components/BalanceCard";
import SendPayment from "./components/SendPayment";

function App() {
  const [publicKey, setPublicKey] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Simple Stellar Pay</h1>

      <WalletConnect setPublicKey={setPublicKey} />

      {publicKey && (
        <>
          <BalanceCard publicKey={publicKey} />
          <SendPayment publicKey={publicKey} />
        </>
      )}
    </div>
  );
}

export default App;