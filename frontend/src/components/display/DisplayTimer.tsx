import { useEffect, useRef, useState } from "react";

const Timer = ({ timer, setIsNavbarOpen }: any) => {
  // const [timer, setTimer] = useState("00 : 00 : 00");
  // const [running, setRunning] = useState(false);
  // const startTime = useRef<number>(Date.now());
  // const elaspedTime = useRef<number>(0);
  // const updateRef = useRef<number | undefined>(undefined);

  // useEffect(() => {
  //   const update = () => {
  //     const currentTime = Date.now();

  //     elaspedTime.current = currentTime - startTime.current;

  //     const minutes = Math.floor(elaspedTime.current / 60000)
  //       .toString()
  //       .padStart(2, "0");
  //     const seconds = Math.floor((elaspedTime.current % 60000) / 1000)
  //       .toString()
  //       .padStart(2, "0");
  //     const milliseconds = Math.floor((elaspedTime.current % 1000) / 10)
  //       .toString()
  //       .padStart(2, "0");

  //     setTimer(`${minutes} : ${seconds} : ${milliseconds}`);
  //   };

  //   if (!running) {
  //     updateRef.current = setInterval(update, 100);
  //   } else {
  //     clearInterval(updateRef.current);
  //   }

  //   return () => {
  //     clearInterval(updateRef.current);
  //   };
  // }, [running]);

  // const stop = () => {
  //   clearInterval(updateRef.current);
  //   setTimer("00 : 00 : 00");
  // };

  // const restart = () => {
  //   startTime.current = Date.now();
  //   setTimer("00 : 00 : 00");
  // };

  // const pause = () => {
  //   startTime.current = Date.now() - elaspedTime.current;
  //   setRunning(!running);
  // };

  return (
    <header className="bg-black w-full" onClick={() => setIsNavbarOpen(false)}>
      {/* <header className="bg-black py-1 text-white flex justify-center items-center font-bold text-lg"> */}
      <div className="py-2 text-white font-bold text-lg w-full text-center">
        {timer}
      </div>
      {/* </header> */}
      {/* <button className="bg-blue-700 p-2 m-2 text-white" onClick={stop}>
        Stop
      </button>
      <button className="bg-blue-700 p-2 m-2 text-white" onClick={restart}>
        restart
      </button>
      <button className="bg-blue-700 p-2 m-2 text-white" onClick={pause}>
        pause
      </button> */}
    </header>
  );
};

export default Timer;
