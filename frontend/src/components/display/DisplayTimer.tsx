const Timer = ({ timer, setIsNavbarOpen }: any) => {
  return (
    <header className="bg-black w-full" onClick={() => setIsNavbarOpen(false)}>
      <div className="py-2 text-white font-bold text-lg w-full text-center">
        {timer}
      </div>
    </header>
  );
};

export default Timer;
