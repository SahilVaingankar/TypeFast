import { useContext, useState } from "react";
import { RunningStateContext } from "../RunningStateProvider";
import Modal from "../display/Modal";

const NavbarBtns = ({ navbarOptions }: any) => {
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
    startTime,
    elaspedTime,
    updateRef,
    setTimer,
    setTypedStatus,
    setCurrentIndex,
  } = context;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  // const [selectedBtn, setSelectedBtn] = useState<string>("");

  const handleClick = (btn: string) => {
    if (!running && !processing) {
      setSelectedBtn(btn);
      // setIsOpen(!isOpen);
      !navbarOptions[btn] && console.log(btn);
    } else {
      startTime.current = Date.now() - elaspedTime.current;
      setSelectedBtn("");
      setRunning(false);
      setProcessing(true);

      // setRunning(false);
      setModal(true);
    }
    //  else {
    //   setSelectedBtn("");
    // }
  };

  const handleHover = (btn: string) => {
    if (!running && !processing) {
      setSelectedBtn(btn);
    }
  };

  return (
    <>
      {modal ? (
        <div className="">
          <Modal
            message="This action will end the current session. Do you want to quite the
          current game?"
            onCancel={() => {
              startTime.current = Date.now() - elaspedTime.current;
              setSelectedBtn("");
              setRunning(true);
              setProcessing(true);

              // setRunning(false);
              setModal(false);

              // clearInterval(updateRef.current);

              // elaspedTime.current = 0;
              // setSelectedBtn("");
              // setRunning(!running);
              // setProcessing(true);
              // setModal(false);
            }}
            onAccept={() => {
              clearInterval(updateRef.current);

              setTypedStatus([""]);
              setCurrentIndex(0);
              elaspedTime.current = 0;
              setTimer("00 : 00 : 00");
              setRunning(false);
              setProcessing(false);
              setModal(false);
            }}
          />
        </div>
      ) : null}

      <button
        className="border-2 border-white rounded-xl py-0.5 w-full min-w-23 text-white font-semibold hover:bg-white hover:text-blue-700 hover:border-blue-300 hover:cursor-pointer transition-all delay-75"
        onClick={() => handleClick("A-Z")}
        onMouseEnter={() => {
          handleHover("A-Z");
          setIsOpen(true);
        }}>
        A-Z
      </button>

      {Object.keys(navbarOptions).map((btn) => (
        <div className="relative w-full" key={btn}>
          <button
            className={`border-2 rounded-xl py-0.5 w-full min-w-23 font-semibold ${
              selectedBtn === btn && navbarOptions[btn]
                ? "bg-white text-blue-700 border-blue-300"
                : "text-white border-white"
            } hover:bg-white hover:text-blue-700 hover:border-blue-300 hover:cursor-pointer transition-all delay-75`}
            onClick={() => handleClick(btn)}
            onMouseEnter={() => {
              handleHover(btn);
            }}
            onBlur={() => {
              setSelectedBtn("");
              setIsOpen(false);
            }}>
            {btn}
          </button>
          {!running && selectedBtn === btn && navbarOptions[btn] ? (
            <ul className="absolute text-center top-10 left-0 border-2 rounded-lg py-0.5 w-full min-w-23 bg-gray-200 overflow-hidden">
              {navbarOptions[btn].slice(0, -1).map((option: string) => (
                <li
                  className="border-b-2 bg-white hover:bg-gray-200"
                  key={option}>
                  {option}
                </li>
              ))}
              <li className="bg-white hover:bg-gray-200 mb-[-2]">
                {navbarOptions[btn][navbarOptions[btn].length - 1]}
              </li>
            </ul>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default NavbarBtns;
