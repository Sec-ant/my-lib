import { greeting } from "../lib";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <div className="flex h-dvh w-full flex-col gap-0.5 overflow-hidden">
      {/* Navbar */}
      <div className="navbar justify-between bg-base-100 px-4 shadow-sm">
        <span className="truncate font-bold text-xl">My Lib</span>
        <div className="flex-none">
          {/* Dark Mode Toggle */}
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center bg-base-200 p-8">
        <div className="text-center">
          <p className="mb-4 text-lg">{greeting("World")}</p>
          <button type="button" onClick={() => {}} className="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
