import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ConfigState {
  isDarkMode: boolean;
}

const INITIAL_CONFIG_STATE: ConfigState = {
  isDarkMode: false,
};

export const useConfigStore = create<ConfigState>()(
  persist(() => ({ ...INITIAL_CONFIG_STATE }), {
    name: "config-storage",
  }),
);
