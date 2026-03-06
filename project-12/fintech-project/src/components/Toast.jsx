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
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          {t.title && <strong>{t.title} </strong>}
          {t.message}
        </div>
      ))}
    </div>
  );
}
