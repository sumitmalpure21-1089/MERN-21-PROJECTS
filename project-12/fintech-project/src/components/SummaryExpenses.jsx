import React from "react";
import { useMyStore } from "../store/myStore";
const SummaryExpenses = () => {
  const { income, expenses, balance } = useMyStore().getSummary();
  return (
    <section className="flex">
      <aside className="card">
        <h1>Total Income</h1>
        <p className="income"> ₹ {income}</p>
      </aside>
      <aside className="card">
        <h1> Total Expenses</h1>
        <p className="expense">₹ {expenses} </p>
      </aside>
      <aside className="card">
        <h1>Balance</h1>
        <p> ₹ {balance}</p>
      </aside>
    </section>
  );
};

export default SummaryExpenses;
