import { useContext, useState } from "react";
import { RunningStateContext } from "../RunningStateProvider";
import Modal from "../display/Modal";

const NavbarBtns = ({ navbarOptions }: any) => {
  const context = useContext(RunningStateContext);
  // navbarOptions[btn]

  if (!context) {
    throw new Error(
      "RunningStateContext must be used within a RunningStateProvider"
    );
  }

  const {
    running,
    setRunning,
    isNavbarOpen,
    setIsNavbarOpen,
    processing,
    setProcessing,
    selectedBtn,
    setSelectedBtn,
    clickedBtn,
    setClickedBtn,
    request,
    setRequest,
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

  console.log("request :", request);
  // console.log(selectedBtn);

  const handleClick = (btn: string) => {
    // setRequest("");
    if (btn === "Code" || btn === "A-Z") {
      if (!running && !processing) {
        setSelectedBtn(btn);
        setClickedBtn(btn);
        setRequest(btn);
        console.log("request :", request);

        console.log(request);

        !navbarOptions[btn] && console.log(btn);
      } else {
        startTime.current = Date.now() - elaspedTime.current;
        // setRequest("");
        setSelectedBtn(btn);
        setRunning(false);
        setProcessing(true);

        // setRunning(false);
        setModal(true);
      }
    } else {
      if (!running && !processing) {
        !isNavbarOpen && setIsNavbarOpen(true);
        // setRequest("");
        setSelectedBtn(btn);
        setClickedBtn(btn);
        setRequest(navbarOptions[btn][0]);
        // console.log("clicked btn : ", clickedBtn);
      } else {
        startTime.current = Date.now() - elaspedTime.current;
        // setRequest("");
        setSelectedBtn(btn);
        setRunning(false);
        setProcessing(true);

        // setRunning(false);
        setModal(true);
      }
    }
    //  else {
    //   setSelectedBtn("");
    // }
  };

  console.log(request);

  // const handleHover = (btn: string) => {
  //   if (!running && !processing) {
  //     setSelectedBtn(btn);
  //   }
  // };

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
              setRunning(false);
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
              selectedBtn.endsWith("s") && setIsNavbarOpen(true);

              clearInterval(updateRef.current);

              setTypedStatus([""]);
              setCurrentIndex(0);
              elaspedTime.current = 0;
              setTimer("00 : 00 : 00");
              setRunning(false);
              setProcessing(false);
              setModal(false);
              setClickedBtn(selectedBtn);
              if (selectedBtn.endsWith("s")) {
                setRequest(navbarOptions[selectedBtn][0]);
              } else {
                setRequest(selectedBtn);
              }
            }}
          />
        </div>
      ) : null}

      <button
        className={`border-2 rounded-xl py-0.5 w-full min-w-20 text-[11px] sm:text-[15px] md:text-lg font-semibold ${
          // selectedBtn === "A-Z" && navbarOptions["A-Z"]
          //   ? "bg-white text-blue-700 border-blue-300"
          //   :
          clickedBtn === "A-Z"
            ? " text-blue-700 border-gray-200 bg-gray-200"
            : "text-white border-white"
        } hover:bg-white hover:text-blue-700 hover:border-blue-300 hover:cursor-pointer transition-all delay-75`}
        onClick={() => handleClick("A-Z")}
        // onMouseEnter={() => {
        //   setSelectedBtn("A-Z");
        // setIsOpen(true);
        // }}
      >
        A-Z
      </button>

      {Object.keys(navbarOptions).map((btn) => (
        <div className="relative w-full" key={btn}>
          <button
            className={`border-2 rounded-xl py-0.5 w-full min-w-20 text-[11px] sm:text-[15px] md:text-lg font-semibold ${
              // selectedBtn === btn
              //   ? "text-blue-700 border-gray-200 bg-gray-200"
              //   :
              clickedBtn === btn
                ? " text-blue-700 border-gray-200 bg-gray-200"
                : "text-white border-white"
            } hover:bg-white hover:text-blue-700 hover:border-blue-300 hover:cursor-pointer transition-all delay-75`}
            onClick={() => handleClick(btn)}
            // onMouseEnter={() => {
            //   setSelectedBtn(btn);
            // }}
            onBlur={() => {
              // setSelectedBtn("");
              setIsOpen(false);
            }}>
            {btn.toLowerCase().slice(-5) === request.slice(-5)
              ? btn.slice(0, -5) + " (" + request + ")"
              : btn}
          </button>
          {/* {!running && selectedBtn === btn && navbarOptions[btn] ? ( */}
          {isNavbarOpen && !running && clickedBtn === btn && btn !== "Code" ? (
            <ul className="absolute text-center top-10 left-0 border-2 rounded-lg py-0.5 w-full min-w-23 bg-gray-200 overflow-hidden z-100">
              {navbarOptions[btn].slice(0, -1).map((option: string) => (
                <li
                  className={`border-b-2 cursor-pointer ${
                    request === option
                      ? "bg-gray-300"
                      : "bg-white hover:bg-gray-100"
                  }`}
                  key={option}
                  onClick={() => {
                    setRequest(option), setIsNavbarOpen(false);
                  }}

                  // onClick={() => setRequest(option)}
                >
                  {option}
                </li>
              ))}
              <li
                className={`${
                  request === navbarOptions[btn][navbarOptions[btn].length - 1]
                    ? "bg-gray-300"
                    : "bg-white hover:bg-gray-100"
                } mb-[-2]`}
                onClick={() => {
                  setRequest(navbarOptions[btn][navbarOptions[btn].length - 1]),
                    setIsNavbarOpen(false);
                }}>
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
