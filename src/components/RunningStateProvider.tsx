import { createContext, Dispatch, RefObject, useRef, useState } from "react";

export const RunningStateContext = createContext<{
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  processing: boolean;
  setProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBtn: string;
  setSelectedBtn: React.Dispatch<React.SetStateAction<string>>;
  timer: string | number;
  setTimer: React.Dispatch<React.SetStateAction<string | number>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  typedStatus: string[];
  setTypedStatus: React.Dispatch<React.SetStateAction<string[]>>;
  startTime: RefObject<number>;
  elaspedTime: RefObject<number>;
  updateRef: RefObject<number | undefined>;
} | null>(null);

const RunningStateProvider = ({ children }: any) => {
  const [running, setRunning] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState("");
  const [timer, setTimer] = useState<string | number>("00 : 00 : 00");
  const startTime = useRef<number>(Date.now());
  const elaspedTime = useRef<number>(0);
  const updateRef = useRef<number | undefined>(undefined);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedStatus, setTypedStatus] = useState<string[]>([""]);

  return (
    <RunningStateContext.Provider
      value={{
        running,
        setRunning,
        processing,
        setProcessing,
        selectedBtn,
        setSelectedBtn,
        timer,
        setTimer,
        currentIndex,
        setCurrentIndex,
        typedStatus,
        setTypedStatus,
        startTime,
        elaspedTime,
        updateRef,
      }}>
      {children}
    </RunningStateContext.Provider>
  );
};

export default RunningStateProvider;
