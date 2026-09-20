import { create } from "zustand";

type SecurityState = {
  biometricsEnabled: boolean;
  toggleBiometrics: () => void;
};

export const useSecurityStore = create<SecurityState>((set) => ({
  biometricsEnabled: true,
  toggleBiometrics: () => set((state) => ({ biometricsEnabled: !state.biometricsEnabled })),
}));
