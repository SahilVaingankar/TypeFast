import { useEffect, useState } from "react";

const Timer = ({ timer, running, setIsNavbarOpen }: any) => {
  const [runningTimer, setRunningTimer] = useState<string | number>(
    "00 : 00 : 00"
  );

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setRunningTimer(timer.current);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [running]);

  return (
    <header className="bg-black w-full" onClick={() => setIsNavbarOpen(false)}>
      <div className="py-2 text-white font-bold text-lg w-full text-center">
        {runningTimer}
      </div>
    </header>
  );
};

export default Timer;
