import { createContext, useState } from "react";

export const RunningStateContext = createContext({
  running: false,
  setRunning: () => {},
});

const RunningStateProvider = ({ children }: any) => {
  const [running, setRunning] = useState(false);

  return (
    <RunningStateContext.Provider value={{ running, setRunning: () => {} }}>
      {children}
    </RunningStateContext.Provider>
  );
};

export default RunningStateProvider;
