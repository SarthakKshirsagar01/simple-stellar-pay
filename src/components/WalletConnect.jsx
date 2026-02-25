import { useState } from "react";
import { isConnected, requestAccess } from "@stellar/freighter-api";

export default function WalletConnect({ setPublicKey }) {
  const connectWallet = async () => {
    try {
      const connected = await isConnected();

      if (!connected) {
        alert("Please install Freighter");
        return;
      }

      const access = await requestAccess();
      setPublicKey(access.address);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectWallet = () => {
    setPublicKey(null);
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={disconnectWallet}>Disconnect</button>
    </div>
  );
}