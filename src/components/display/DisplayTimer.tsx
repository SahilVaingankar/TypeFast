import { useEffect, useRef, useState } from "react";

const Timer = () => {
  const [timer, setTimer] = useState("00 : 00 : 00");
  const [clicked, setClicked] = useState(false);
  const startTime = useRef<number>(Date.now());
  const updateRef = useRef<number | undefined>(undefined);
  const updatefunc = useRef<() => void>(() => {});

  useEffect(() => {
    const update = () => {
      const currentTime = Date.now();

      console.log("update");
      console.log(timer);

      const elaspedTime = currentTime - startTime.current;

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

    updateRef.current = setInterval(update, 100);
    updatefunc.current = update;

    return () => {
      clearInterval(updateRef.current);
    };
  }, []);

  const stop = () => {
    if (!clicked) {
      clearInterval(updateRef.current);
      setClicked(false);
    } else {
      updatefunc.current();
    }
  };

  return (
    <div>
      <div className="bg-black py-2 text-white flex justify-center items-center">
        {timer}
      </div>
      <button className="bg-blue-700 py-2 text-white" onClick={stop}>
        Stop
      </button>
    </div>
  );
};

export default Timer;
