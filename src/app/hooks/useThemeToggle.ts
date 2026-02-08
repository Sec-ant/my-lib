import { useCallback } from "react";
import { useConfigStore } from "@/stores/configStore";

export function useThemeToggle() {
  const isDarkMode = useConfigStore((state) => state.isDarkMode);

  const handleThemeChange = useCallback(() => {
    useConfigStore.setState(({ isDarkMode }) => ({
      isDarkMode: !isDarkMode,
    }));
  }, []);

  return { isDarkMode, handleThemeChange };
}
