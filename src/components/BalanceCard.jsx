import { useEffect, useState } from "react";
import { server } from "../utils/stellar";

export default function BalanceCard({ publicKey }) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) return;

      const account = await server.loadAccount(publicKey);

      const xlmBalance = account.balances.find(
        (b) => b.asset_type === "native"
      );

      setBalance(xlmBalance.balance);
    };

    fetchBalance();
  }, [publicKey]);

  return (
    <div>
      <h3>Balance:</h3>
      <p>{balance ? `${balance} XLM` : "—"}</p>
    </div>
  );
}