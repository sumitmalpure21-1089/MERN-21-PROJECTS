import React, { useState } from "react";
import { useMyStore } from "../store/myStore";
import { useToastStore } from "../store/toastStore";

const TransactionForm = () => {
  const addTransaction = useMyStore((state) => state.addTransaction);
  const categoriesStore = useMyStore((state) => state.categories);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    flatNo: "",
    building: "",
    unit: "",
    month: "",
    notes: "",
  });

  const categories =
    form.type === "expense"
      ? categoriesStore?.expenses || []
      : categoriesStore?.incomes || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form };
    // If Maintenance Received, combine building/unit/month into flatNo
    if (form.type === "income" && form.category === "Maintenance Received") {
      const parts = [];
      if (form.building) parts.push(form.building);
      if (form.unit) parts.push(form.unit);
      if (form.month) parts.push(form.month);
      payload.flatNo = parts.join(" - ");
    }
    addTransaction({ ...payload, id: Date.now() });
    setForm({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      flatNo: "",
      building: "",
      unit: "",
      month: "",
      notes: "",
    });
  };

  const push = useToastStore((s) => s.push);

  return (
    <section className="card">
      <form onSubmit={handleSubmit}>
        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value, category: "" })
          }
        >
          <option value="expense"> Expense</option>
          <option value="income"> Income</option>
        </select>

        <select
          value={form.category}
          required
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">-- Select category --</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Admin-only category management removed from this form */}

        {/* Flat fields: either free flatNo or building/unit for Maintenance Received */}
        {form.type === "income" && form.category === "Maintenance Received" ? (
          <>
            <input
              placeholder="Building Name"
              value={form.building}
              onChange={(e) => setForm({ ...form, building: e.target.value })}
            />
            <input
              placeholder="Flat No"
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
            />
          </>
        ) : (
          <input
            placeholder="Flat No (optional)"
            value={form.flatNo}
            onChange={(e) => setForm({ ...form, flatNo: e.target.value })}
          />
        )}

        <input
          type="month"
          placeholder="Month (optional)"
          value={form.month}
          onChange={(e) => setForm({ ...form, month: e.target.value })}
        />
        <input
          placeholder="Title"
          required={form.type === "income"}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          required
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <button type="submit" className="btn">
          Add
        </button>
      </form>
    </section>
  );
};

export default TransactionForm;
