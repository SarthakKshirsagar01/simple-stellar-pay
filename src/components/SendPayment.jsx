import { useState } from "react";
import * as StellarSdk from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";
import { server, networkPassphrase } from "../utils/stellar";

export default function SendPayment({ publicKey }) {
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const sendPayment = async () => {
    try {
      setStatus("Processing...");

      const sourceAccount = await server.loadAccount(publicKey);

      const fee = await server.fetchBaseFee();

      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee,
        networkPassphrase,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination,
            asset: StellarSdk.Asset.native(),
            amount,
          })
        )
        .setTimeout(30)
        .build();

      const signedTx = await signTransaction(transaction.toXDR(), {
        networkPassphrase,
      });

      const tx = StellarSdk.TransactionBuilder.fromXDR(
        signedTx.signedTxXdr,
        networkPassphrase
      );

      const result = await server.submitTransaction(tx);

      setStatus(`✅ Success! Hash: ${result.hash}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Transaction failed");
    }
  };

  return (
    <div>
      <input
        placeholder="Destination Address"
        onChange={(e) => setDestination(e.target.value)}
      />
      <input
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendPayment}>Send XLM</button>

      <p>{status}</p>
    </div>
  );
}