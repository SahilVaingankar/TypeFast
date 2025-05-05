import DisplayBtns from "./footer/DisplayBtns";
import DisplayScreen from "./DisplayScreen";
import DisplayTimer from "./DisplayTimer";

const Display = () => {
  return (
    <section className="flex flex-col items-center min-w-1 grow-1 h-[calc(100vh-50px)] border-2 leading-[100%]">
      <DisplayTimer />
      <DisplayScreen />
      <DisplayBtns />
    </section>
  );
};

export default Display;
