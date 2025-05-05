import DisplayBtns from "./footer/DisplayBtns";
import DisplayScreen from "./DisplayScreen";
import DisplayTimer from "./DisplayTimer";
import { useEffect, useRef, useState } from "react";

const Display = () => {
  const [timer, setTimer] = useState("00 : 00 : 00");
  const [running, setRunning] = useState(false);
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

    if (!running) {
      updateRef.current = setInterval(update, 100);
    } else {
      clearInterval(updateRef.current);
    }

    return () => {
      clearInterval(updateRef.current);
    };
  }, [running]);

  return (
    <section className="flex flex-col items-center min-w-1 grow-1 h-[calc(100vh-50px)] border-2 leading-[100%]">
      <DisplayTimer {...{ timer }} />
      <DisplayScreen />
      <DisplayBtns
        {...{
          timer,
          setTimer,
          updateRef,
          startTime,
          elaspedTime,
          running,
          setRunning,
        }}
      />
    </section>
  );
};

export default Display;
