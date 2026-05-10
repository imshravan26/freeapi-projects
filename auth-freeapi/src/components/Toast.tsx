import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Toast = {
  id: number;
  message: string;
  type?: "info" | "success" | "error";
  visible?: boolean;
};

type ToastContextValue = {
  show: (message: string, type?: Toast["type"]) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    // add hidden first so we can trigger enter animation
    setToasts((t) => [...t, { id, message, type, visible: false }]);

    // next tick: mark visible to trigger transition
    setTimeout(() => {
      setToasts((t) =>
        t.map((x) => (x.id === id ? { ...x, visible: true } : x)),
      );
    }, 10);

    // schedule hide then removal
    const hideMs = 3200;
    const removeMs = 3600;
    setTimeout(() => {
      setToasts((t) =>
        t.map((x) => (x.id === id ? { ...x, visible: false } : x)),
      );
    }, hideMs);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, removeMs);
  }, []);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((t) => {
          const colorClass =
            t.type === "success"
              ? "bg-green-600"
              : t.type === "error"
                ? "bg-red-600"
                : "bg-blue-600";
          const visible = t.visible;
          const animClasses = visible
            ? "translate-x-0 opacity-100"
            : "translate-x-4 opacity-0";
          return (
            <div
              key={t.id}
              className={`min-w-50 max-w-[320px] px-4 py-2 rounded-md text-white shadow-lg text-sm transform transition-all duration-300 ease-out ${colorClass} ${animClasses}`}
            >
              {t.message}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

export default ToastProvider;
