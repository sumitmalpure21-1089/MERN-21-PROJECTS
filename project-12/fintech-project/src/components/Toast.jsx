import React, { useEffect } from "react";
import { useToastStore } from "../store/toastStore";

export default function Toast() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);

  useEffect(() => {
    const timers = toasts.map((t) =>
      setTimeout(() => remove(t.id), t.timeout || 3000),
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, remove]);

  return (
    <div style={{ position: "fixed", right: 12, top: 12, zIndex: 9999 }}>
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            background: "#111",
            color: "#fff",
            padding: "8px 12px",
            marginBottom: 8,
            borderRadius: 6,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {t.title && <strong>{t.title} </strong>}
          {t.message}
        </div>
      ))}
    </div>
  );
}
