import React, { useState } from "react";
import { useMyStore } from "../store/myStore";
import { useToastStore } from "../store/toastStore";

const AdminCategories = () => {
  const categories = useMyStore((s) => s.categories) || {
    expenses: [],
    incomes: [],
  };
  const addCategory = useMyStore((s) => s.addCategory);
  const deleteCategory = useMyStore((s) => s.deleteCategory);
  const push = useToastStore((s) => s.push);

  const [type, setType] = useState("expense");
  const [name, setName] = useState("");
  const [pendingDelete, setPendingDelete] = useState({
    type: null,
    name: null,
  });
  const transactions = useMyStore((s) => s.transactions) || [];

  const handleAdd = () => {
    if (!name.trim()) return push({ message: "Name required", timeout: 2000 });
    addCategory(type, name.trim());
    push({ message: `${name} added to ${type}`, timeout: 2000 });
    setName("");
  };

  return (
    <section className="card">
      <h3>Manage Categories</h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleAdd} className="btn">
          Add
        </button>
      </div>

      <div style={{ display: "flex", gap: 24 }}>
        <div>
          <h4>Expenses</h4>
          {categories.expenses.map((c) => {
            const usedCount = transactions.filter(
              (t) => t.category === c,
            ).length;
            const inUse = usedCount > 0;
            return (
              <div
                key={c}
                style={{ display: "flex", gap: 8, alignItems: "center" }}
              >
                <span>{c}</span>
                {pendingDelete.type === "expense" &&
                pendingDelete.name === c ? (
                  <>
                    <button
                      onClick={() => {
                        deleteCategory("expense", c);
                        push({ message: `${c} removed`, timeout: 2000 });
                        setPendingDelete({ type: null, name: null });
                      }}
                      className="btn"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() =>
                        setPendingDelete({ type: null, name: null })
                      }
                      className="btn"
                    >
                      No
                    </button>
                  </>
                ) : inUse ? (
                  <>
                    <button
                      className="btn"
                      disabled
                      title={`Used by ${usedCount} transactions`}
                    >
                      Delete
                    </button>
                    <span style={{ fontSize: 12, color: "#666" }}>
                      {" "}
                      In use ({usedCount})
                    </span>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      setPendingDelete({ type: "expense", name: c })
                    }
                    className="btn"
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div>
          <h4>Incomes</h4>
          {categories.incomes.map((c) => {
            const usedCount = transactions.filter(
              (t) => t.category === c,
            ).length;
            const inUse = usedCount > 0;
            return (
              <div
                key={c}
                style={{ display: "flex", gap: 8, alignItems: "center" }}
              >
                <span>{c}</span>
                {pendingDelete.type === "income" && pendingDelete.name === c ? (
                  <>
                    <button
                      onClick={() => {
                        deleteCategory("income", c);
                        push({ message: `${c} removed`, timeout: 2000 });
                        setPendingDelete({ type: null, name: null });
                      }}
                      className="btn"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() =>
                        setPendingDelete({ type: null, name: null })
                      }
                      className="btn"
                    >
                      No
                    </button>
                  </>
                ) : inUse ? (
                  <>
                    <button
                      className="btn"
                      disabled
                      title={`Used by ${usedCount} transactions`}
                    >
                      Delete
                    </button>
                    <span style={{ fontSize: 12, color: "#666" }}>
                      {" "}
                      In use ({usedCount})
                    </span>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      setPendingDelete({ type: "income", name: c })
                    }
                    className="btn"
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdminCategories;
