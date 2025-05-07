import { createContext, useState } from "react";

export const RunningStateContext = createContext<{
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const RunningStateProvider = ({ children }: any) => {
  const [running, setRunning] = useState(false);

  return (
    <RunningStateContext.Provider value={{ running, setRunning }}>
      {children}
    </RunningStateContext.Provider>
  );
};

export default RunningStateProvider;
