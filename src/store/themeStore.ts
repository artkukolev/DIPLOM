import { create } from "zustand";
import { persist } from "zustand/middleware";

type PaletteMode = "light" | "dark";

interface ThemeState {
  mode: PaletteMode;
  highContrast: boolean;
  toggleMode: () => void;
  setHighContrast: (enabled: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "light",
      highContrast: false,
      toggleMode: () =>
        set({ mode: get().mode === "light" ? "dark" : "light" }),
      setHighContrast: (enabled) => set({ highContrast: enabled }),
    }),
    { name: "school-theme" },
  ),
);
