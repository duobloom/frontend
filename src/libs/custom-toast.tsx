import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
// import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

type ToastType = "success" | "error" | "warn" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

interface ToastContextType {
  toasts: Toast[];
  toast: {
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    warn: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{
  children: ReactNode;
  autoClose?: number;
  limit?: number;
}> = ({ children, autoClose = 3000, limit = 3 }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToast = (message: string, type: ToastType, duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      message,
      type,
      duration: duration || autoClose,
    };

    setToasts((prev) => (limit ? prev.slice(-(limit - 1)).concat(newToast) : prev.concat(newToast)));

    setTimeout(() => removeToast(id), newToast.duration);
  };

  const toastMethods = {
    success: (message: string, duration?: number) => addToast(message, "success", duration),
    error: (message: string, duration?: number) => addToast(message, "error", duration),
    warn: (message: string, duration?: number) => addToast(message, "warn", duration),
    info: (message: string, duration?: number) => addToast(message, "info", duration),
  };

  return (
    <ToastContext.Provider value={{ toasts, toast: toastMethods }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

const toastStyles = {
  success: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
  warn: "bg-yellow-500 text-black",
  info: "bg-black text-red",
};

// const toastIcons = {
//   success: CheckCircle,
//   error: AlertCircle,
//   warn: AlertTriangle,
//   info: AlertCircle,
// };

export const ToastContainer: React.FC = () => {
  const context = useContext(ToastContext);
  if (!context) return null;

  const { toasts } = context; // `removeToast`는 특정 toast를 제거하는 함수라고 가정

  const [exitingToasts, setExitingToasts] = useState<Set<string>>(new Set());

  const handleAnimationEnd = (toastId: string) => {
    if (exitingToasts.has(toastId)) {
      setExitingToasts((prev) => {
        const updated = new Set(prev);
        updated.delete(toastId);
        return updated;
      });
    }
  };

  const handleRemove = (toastId: string) => {
    setExitingToasts((prev) => new Set(prev).add(toastId));
  };

  useEffect(() => {
    const timers = toasts.map((toast) => setTimeout(() => handleRemove(toast.id), toast.duration || 3000));
    return () => timers.forEach(clearTimeout);
  }, [toasts]);

  return (
    <div className="pointer-events-none absolute top-[1.5rem] z-[9999] flex items-center justify-center">
      <div className="space-y-2">
        {toasts.map((toast) => {
          // const Icon = toastIcons[toast.type];
          const isExiting = exitingToasts.has(toast.id);

          return (
            <div
              key={toast.id}
              className={`flex h-[5rem] w-[34.5rem] items-center justify-center rounded-[1rem] p-3 opacity-[0.9] transition-all ${
                toastStyles[toast.type]
              } ${isExiting ? "animate-fadeout" : "animate-fadein"}`}
              onAnimationEnd={() => handleAnimationEnd(toast.id)}
            >
              {/* <Icon className="mr-2" size={20} /> */}
              <span className="text-[1.4rem] font-extrabold leading-normal">{toast.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.toast;
};

// 전역 toast 객체를 위한 별도의 관리 로직
class ToastManager {
  private static instance: ToastManager;
  private toastContext: ToastContextType | null = null;

  private constructor() {}

  static getInstance() {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  setContext(context: ToastContextType) {
    this.toastContext = context;
  }

  success(message: string, duration?: number) {
    if (this.toastContext) {
      this.toastContext.toast.info(message, duration);
    }
  }

  error(message: string, duration?: number) {
    if (this.toastContext) {
      this.toastContext.toast.info(message, duration);
    }
  }

  warn(message: string, duration?: number) {
    if (this.toastContext) {
      this.toastContext.toast.warn(message, duration);
    }
  }

  info(message: string, duration?: number) {
    if (this.toastContext) {
      this.toastContext.toast.info(message, duration);
    }
  }
}

export const toast = ToastManager.getInstance();

// ToastProvider에서 context를 설정하는 훅
export const useToastContext = () => {
  const context = useContext(ToastContext);

  useEffect(() => {
    if (context) {
      toast.setContext(context);
    }
  }, [context]);

  return context;
};
