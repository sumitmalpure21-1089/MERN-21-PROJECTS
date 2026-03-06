import React from "react";
import { useMyStore } from "../store/myStore";
const TransactionsList = () => {
  const transactions = useMyStore((state) => state.transactions);
  const deleteTransaction = useMyStore((state) => state.deleteTransaction);
  return (
    <section className="card">
      <h3> Transactions</h3>
      {transactions.map((t) => (
        <section
          key={t.id}
          className="flex"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <div>
            <strong>{t.title}</strong> ({t.category})
            <div style={{ fontSize: 12, color: "#666" }}>
              {t.flatNo ? `Flat: ${t.flatNo}` : null}
              {t.flatNo && t.month ? " • " : null}
              {t.month ? `Month: ${t.month}` : null}
            </div>
          </div>
          <div className={t.type}>
            ₹ {t.amount}
            <button onClick={() => deleteTransaction(t.id)}> X </button>
          </div>
        </section>
      ))}
    </section>
  );
};

export default TransactionsList;
