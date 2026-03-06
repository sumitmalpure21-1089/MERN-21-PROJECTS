import { create } from "zustand";
import defaults from "../data/categories";

const loadTransactions = () => {
  const data = localStorage.getItem("ltransactions");
  return data ? JSON.parse(data) : [];
};

const loadCategories = () => {
  const data = localStorage.getItem("lcategories");
  return data
    ? JSON.parse(data)
    : { expenses: defaults.expenses, incomes: defaults.incomes };
};

export const useMyStore = create((set, get) => ({
  transactions: loadTransactions(),
  categories: loadCategories(),

  addTransaction: (transaction) => {
    // normalize amount and ensure id
    const tx = {
      ...transaction,
      amount: Number(transaction.amount),
      id: transaction.id ?? Date.now(),
    };
    const updated = [...get().transactions, tx];
    localStorage.setItem("ltransactions", JSON.stringify(updated));
    set({ transactions: updated });
  },
  addCategory: (type, name) => {
    if (!name) return;
    const key = type === "expense" ? "expenses" : "incomes";
    const prev = get().categories || { expenses: [], incomes: [] };
    if (prev[key].includes(name)) return; // already exists
    const updated = { ...prev, [key]: [...prev[key], name] };
    localStorage.setItem("lcategories", JSON.stringify(updated));
    set({ categories: updated });
  },
  deleteCategory: (type, name) => {
    const key = type === "expense" ? "expenses" : "incomes";
    const prev = get().categories || { expenses: [], incomes: [] };
    const updated = { ...prev, [key]: prev[key].filter((c) => c !== name) };
    localStorage.setItem("lcategories", JSON.stringify(updated));
    set({ categories: updated });
  },
  getSummary: () => {
    const transactions = get().transactions;
    const income = transactions
      .filter((t) => t.type == "income")
      .reduce((acc, t) => acc + Number(t.amount), 0);
    const expenses = transactions
      .filter((t) => t.type == "expense")
      .reduce((acc, t) => acc + Number(t.amount), 0);
    return { income, expenses, balance: income - expenses };
  },
  deleteTransaction: (id) => {
    const updated = get().transactions.filter((t) => t.id !== id);
    localStorage.setItem("ltransactions", JSON.stringify(updated));
    set({ transactions: updated });
  },
}));
