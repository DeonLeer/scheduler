import React, { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  function transition(newMode, replace = false) {
    if (replace) {
      const previousModes = [...history];
      previousModes.pop();
      previousModes.push(newMode)
      setHistory(previousModes);
      setMode(newMode);

    } else {
      setMode(newMode);
      const previousModes = [...history];
      previousModes.push(newMode);
      setHistory(previousModes);
    }
  }

  function back() {
    if (history.length === 1) {
      setMode(history[0]);
    } else {
      const previousModes = [...history];
      previousModes.pop();
      setHistory(previousModes);
      setMode(previousModes[previousModes.length - 1]);
    }
  }

  return { mode, transition, back };
}

