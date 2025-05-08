import { createContext, useState } from "react";

export const RunningStateContext = createContext<{
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  processing: boolean;
  setProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBtn: string;
  setSelectedBtn: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

const RunningStateProvider = ({ children }: any) => {
  const [running, setRunning] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState("");

  return (
    <RunningStateContext.Provider
      value={{
        running,
        setRunning,
        processing,
        setProcessing,
        selectedBtn,
        setSelectedBtn,
      }}>
      {children}
    </RunningStateContext.Provider>
  );
};

export default RunningStateProvider;
