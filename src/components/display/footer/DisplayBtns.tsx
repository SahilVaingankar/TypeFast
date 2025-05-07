// import Buttons from "./Buttons";

import { FaBackward, FaForward, FaPlay, FaRedo, FaStop } from "react-icons/fa";

const DisplayBtns = ({
  setTimer,
  updateRef,
  startTime,
  elaspedTime,
  running,
  setRunning,
  setProcessing,
  processing,
}: any) => {
  const stop = () => {
    clearInterval(updateRef.current);
    elaspedTime.current = 0;
    setTimer("00 : 00 : 00");
    setRunning(false);
    setProcessing(false);
  };

  const restart = () => {
    stop();
  };

  const pause = () => {
    startTime.current = Date.now() - elaspedTime.current;
    setRunning(!running);
    setProcessing(true);
  };

  return (
    <footer className="bg-blue-700 w-full">
      <div className="py-2 flex justify-center items-center gap-0.5 h-full">
        <button className="h-11 w-13 bg-gray-400 border-2 border-white mr-10 lg:mr-15">
          <FaBackward className="m-auto" />
        </button>
        <button
          className="h-10 w-10 bg-gray-400 border-2 border-white mr-20"
          onClick={restart}>
          <FaRedo className="m-auto" />
        </button>
        <button
          className="absolute h-14 w-14 border-2 border-white rounded-full"
          onClick={pause}>
          <FaPlay className="m-auto text-white h-7 w-7 pl-1" />
        </button>
        <button
          className="h-10 w-10 bg-gray-400 border-2 border-white"
          onClick={stop}>
          <FaStop className="text-red-500 m-auto" />
        </button>
        <button className="h-11 w-13 bg-gray-400 border-2 border-white ml-10 lg:ml-15">
          <FaForward className="m-auto" />
        </button>
      </div>
    </footer>
  );
};

export default DisplayBtns;
