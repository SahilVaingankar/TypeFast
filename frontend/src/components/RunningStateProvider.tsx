import { createContext, RefObject, useRef, useState } from "react";

export const RunningStateContext = createContext<{
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  isNavbarOpen: boolean;
  setIsNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  processing: boolean;
  setProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBtn: string;
  setSelectedBtn: React.Dispatch<React.SetStateAction<string>>;
  clickedBtn: string;
  setClickedBtn: React.Dispatch<React.SetStateAction<string>>;
  request: string;
  setRequest: React.Dispatch<React.SetStateAction<string>>;
  // timer: string | number;
  // setTimer: React.Dispatch<React.SetStateAction<string | number>>;
  timer: React.RefObject<string | number>;
  setTimer: (val: string | number) => void;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  typedStatus: string[];
  setTypedStatus: React.Dispatch<React.SetStateAction<string[]>>;
  content: string | undefined;
  setContent: React.Dispatch<React.SetStateAction<string | undefined>>;
  id: { key: string; id: number }[];
  setId: React.Dispatch<React.SetStateAction<{ key: string; id: number }[]>>;
  idIndex: number;
  setIdIndex: React.Dispatch<React.SetStateAction<number>>;

  startTime: RefObject<number>;
  elaspedTime: RefObject<number>;
  updateRef: RefObject<number | undefined>;
} | null>(null);

const RunningStateProvider = ({ children }: any) => {
  const [running, setRunning] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState("A-Z");
  const [clickedBtn, setClickedBtn] = useState("A-Z");
  const [request, setRequest] = useState("A-Z");
  // const [timer, setTimer] = useState<string | number>("00 : 00 : 00");
  const timer = useRef<string | number>("00 : 00 : 00");
  const setTimer = (val: string | number) => {
    timer.current = val;
  };

  const startTime = useRef<number>(Date.now());
  const elaspedTime = useRef<number>(0);
  const updateRef = useRef<number | undefined>(undefined);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedStatus, setTypedStatus] = useState<string[]>([""]);
  const [content, setContent] = useState<string | undefined>("content");
  const [id, setId] = useState<{ key: string; id: number }[]>([]);
  const [idIndex, setIdIndex] = useState<number>(-1);

  return (
    <RunningStateContext.Provider
      value={{
        running,
        setRunning,
        isNavbarOpen,
        setIsNavbarOpen,
        loading,
        setLoading,
        processing,
        setProcessing,
        selectedBtn,
        setSelectedBtn,
        clickedBtn,
        setClickedBtn,
        request,
        setRequest,
        timer,
        setTimer,
        currentIndex,
        setCurrentIndex,
        typedStatus,
        setTypedStatus,
        content,
        setContent,
        id,
        setId,
        idIndex,
        setIdIndex,
        // loading,
        // setLoading,
        startTime,
        elaspedTime,
        updateRef,
      }}>
      {children}
    </RunningStateContext.Provider>
  );
};

export default RunningStateProvider;
