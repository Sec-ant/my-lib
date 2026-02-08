import { useState } from "react";
import { greeting } from "../lib";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="mb-4 font-bold text-4xl">Library Dev App</h1>
      <p className="mb-4 text-lg">{greeting("World")}</p>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
      >
        Count: {count}
      </button>
    </div>
  );
}

export default App;
