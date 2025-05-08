import DisplayBtns from "./footer/DisplayBtns";
import DisplayScreen from "./DisplayScreen";
import DisplayTimer from "./DisplayTimer";
import { useContext, useEffect, useRef, useState } from "react";
import { RunningStateContext } from "../RunningStateProvider";

const Display = () => {
  const [timer, setTimer] = useState("00 : 00 : 00");
  const context = useContext(RunningStateContext);

  if (!context) {
    throw new Error(
      "RunningStateContext must be used within a RunningStateProvider"
    );
  }

  const {
    running,
    setRunning,
    processing,
    setProcessing,
    selectedBtn,
    setSelectedBtn,
  } = context;
  // const [processing, setProcessing] = useState(false);
  const startTime = useRef<number>(Date.now());
  const elaspedTime = useRef<number>(0);
  const updateRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const update = () => {
      const currentTime = Date.now();

      elaspedTime.current = currentTime - startTime.current;

      const minutes = Math.floor(elaspedTime.current / 60000)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((elaspedTime.current % 60000) / 1000)
        .toString()
        .padStart(2, "0");
      const milliseconds = Math.floor((elaspedTime.current % 1000) / 10)
        .toString()
        .padStart(2, "0");

      setTimer(`${minutes} : ${seconds} : ${milliseconds}`);
    };

    if (running) {
      updateRef.current = setInterval(update, 100);
      console.log(timer);
    } else {
      clearInterval(updateRef.current);
    }

    return () => {
      clearInterval(updateRef.current);
    };
  }, [running]);

  return (
    <section
      className="flex flex-col items-center min-w-1 grow-1 h-[calc(100vh-50px)] border-2 leading-[100%]"
      onClick={() => setSelectedBtn("")}>
      <DisplayTimer {...{ timer }} />
      <DisplayScreen {...{ running, processing }} />
      <DisplayBtns
        {...{
          setTimer,
          updateRef,
          startTime,
          elaspedTime,
          running,
          setRunning,
          setProcessing,
          processing,
          setSelectedBtn,
        }}
      />
    </section>
  );
};

export default Display;
