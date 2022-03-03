import { useState } from "react";

// custom hook, switches between modes in the Appointment component
export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setHistory(() => [...history, newMode]);
    }
    setMode(() => newMode);
  };

  function back() {
    if (history.length > 1) {
      const newHistory = history.slice(0, history.length - 1)
      setMode(newHistory[newHistory.length - 1])
      setHistory(newHistory)
    }
  }
  return { mode, transition, back };
}

