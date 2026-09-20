import { create } from "zustand";

export type ToastType = "success" | "error";

type ToastState = {
  visible: boolean;
  type: ToastType;
  message: string;
  show: (type: ToastType, message: string) => void;
  hide: () => void;
};

const AUTO_HIDE_MS = 3000;

let hideTimeout: ReturnType<typeof setTimeout> | null = null;

export const useToastStore = create<ToastState>((set) => ({
  visible: false,
  type: "success",
  message: "",

  show: (type, message) => {
    if (hideTimeout) clearTimeout(hideTimeout);
    set({ visible: true, type, message });
    hideTimeout = setTimeout(() => set({ visible: false }), AUTO_HIDE_MS);
  },

  hide: () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    set({ visible: false });
  },
}));
