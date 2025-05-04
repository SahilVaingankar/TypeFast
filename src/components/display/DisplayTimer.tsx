import { useEffect, useRef, useState } from "react";

const Timer = () => {
  const [timer, setTimer] = useState("00 : 00 : 00");
  const [running, setRunning] = useState(false);
  const startTime = useRef<number>(Date.now());
  const currentTime = useRef<number>(0);
  const updateRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const update = () => {
      currentTime.current = Date.now();

      console.log("update");
      console.log(timer);

      const elaspedTime = currentTime.current - startTime.current;

      const minutes = Math.floor((elaspedTime / (1000 * 60)) % 60)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((elaspedTime / 1000) % 60)
        .toString()
        .padStart(2, "0");
      const milliseconds = Math.floor(elaspedTime % 100)
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

  const stop = () => {
    clearInterval(updateRef.current);
    setTimer("00 : 00 : 00");
  };

  const restart = () => {
    currentTime.current = Date.now();
    startTime.current = Date.now();
    setTimer("00 : 00 : 00");
  };

  const pause = () => {
    setRunning(!running);
  };

  return (
    <div>
      <div className="bg-black py-2 text-white flex justify-center items-center">
        {timer}
      </div>
      <button className="bg-blue-700 p-2 m-2 text-white" onClick={stop}>
        Stop
      </button>
      <button className="bg-blue-700 p-2 m-2 text-white" onClick={restart}>
        restart
      </button>
      <button className="bg-blue-700 p-2 m-2 text-white" onClick={pause}>
        pause
      </button>
    </div>
  );
};

export default Timer;
