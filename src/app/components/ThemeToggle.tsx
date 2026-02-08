import type { FC } from "react";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import MaterialSymbolsDarkModeOutlineRounded from "~icons/material-symbols/dark-mode-outline-rounded";
import MaterialSymbolsLightModeOutlineRounded from "~icons/material-symbols/light-mode-outline-rounded";

const ThemeToggle: FC = () => {
  const { isDarkMode, handleThemeChange } = useThemeToggle();

  return (
    <label className="btn btn-ghost btn-circle swap swap-rotate">
      <input
        type="checkbox"
        className="theme-controller"
        value="dim"
        checked={isDarkMode}
        onChange={handleThemeChange}
      />
      {/* Light mode icon */}
      <MaterialSymbolsLightModeOutlineRounded className="swap-off h-6 w-6" />
      {/* Dark mode icon */}
      <MaterialSymbolsDarkModeOutlineRounded className="swap-on h-6 w-6" />
    </label>
  );
};

export default ThemeToggle;
