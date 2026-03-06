import React, { useState } from "react";
import Header from "./components/Header";
import SummaryExpenses from "./components/SummaryExpenses";
import TransactionForm from "./components/TransactionForm";
import TransactionsList from "./components/TransactionsList";
import Toast from "./components/Toast";
import AdminCategories from "./components/AdminCategories";

const App = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  return (
    <main className="container">
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 12,
        }}
      >
        <button onClick={() => setShowAdmin((s) => !s)} className="btn">
          {showAdmin ? "Close Admin" : "Open Admin"}
        </button>
      </div>
      <SummaryExpenses />
      {showAdmin ? <AdminCategories /> : <TransactionForm />}
      <TransactionsList />
      <Toast />
    </main>
  );
};

export default App;
