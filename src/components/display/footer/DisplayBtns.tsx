// import Buttons from "./Buttons";

const DisplayBtns = () => {
  return (
    <footer className="bg-blue-700 w-full">
      <div className="py-2 flex justify-center items-center gap-0.5 h-full">
        <button className="h-11 w-13 bg-gray-400 border-2 border-white mr-10 lg:mr-15">
          X
        </button>
        <button className="h-10 w-10 bg-gray-400 border-2 border-white mr-20">
          X
        </button>
        <button className="absolute h-14 w-14 bg-gray-400 border-2 border-white rounded-full">
          X
        </button>
        <button className="h-10 w-10 bg-gray-400 border-2 border-white">
          X
        </button>
        <button className="h-11 w-13 bg-gray-400 border-2 border-white ml-10 lg:ml-15">
          X
        </button>
      </div>
    </footer>
  );
};

export default DisplayBtns;
