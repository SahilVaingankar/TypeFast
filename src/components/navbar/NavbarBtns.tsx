import { useEffect, useState } from "react";

const NavbarBtns = ({
  navbarOptions,
  isOpen,
  setIsOpen,
  selectedBtn,
  setSelectedBtn,
}: any) => {
  const handleClick = (btn: string) => {
    if (isOpen) {
      setIsOpen(false);
      setSelectedBtn("");
    } else {
      setIsOpen(!isOpen);
      setSelectedBtn(btn);
    }
  };

  // if (btn == "Code") {
  //   console.log(btn);
  // }
  // useEffect(() => {
  // if (isOpen) {
  //   setIsOpen(false);
  //   setSelectedBtn("");
  // } else {
  // setIsOpen(!isOpen);
  // setSelectedBtn(btn);
  // }
  // setIsOpen(!isOpen);

  // return () => {
  //   setIsOpen(false);
  // setSelectedBtn("");
  //   };
  // }, [selectedBtn]);
  // };

  const handleHover = (btn: string) => {
    isOpen && setSelectedBtn(btn);
  };

  return (
    <>
      <button
        className="border-2 border-white rounded-xl py-0.5 w-full min-w-23 text-white font-semibold hover:bg-white hover:text-blue-700 hover:border-blue-300 hover:cursor-pointer transition-all delay-75"
        onClick={() => handleClick("A-Z")}
        onMouseEnter={() => handleHover("A-Z")}
        // onBlur={() => {
        //   if (!selectedBtn) {
        //     setIsOpen(false);
        //     setSelectedBtn("");
        //   }
        // }}
      >
        A-Z
      </button>

      {Object.keys(navbarOptions).map((btn) => (
        <div className="relative w-full">
          <button
            className="border-2 border-white rounded-xl py-0.5 w-full min-w-23 text-white font-semibold hover:bg-white hover:text-blue-700 hover:border-blue-300 hover:cursor-pointer transition-all delay-75"
            key={btn}
            onClick={() => handleClick(btn)}
            onMouseEnter={() => handleHover(btn)}
            // onBlur={() => {
            //   setIsOpen(false);
            //   setSelectedBtn("");

            // if (!selectedBtn) {
            //   setIsOpen(false);
            //   setSelectedBtn("");
            // } else {
            //   setIsOpen(false);
            //   setSelectedBtn("");
            // }
            // }}
          >
            {btn}
          </button>
          {isOpen && selectedBtn === btn && navbarOptions[btn] ? (
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
          {/* <li>
            {navbarOptions[btn]
              ? navbarOptions[btn][navbarOptions[btn].length - 1]
              : null}
          </li> */}
        </div>
      ))}
      {/* <button className="border-2 border-white rounded-xl py-0.5 w-full min-w-23 text-white font-semibold hover:bg-white hover:text-blue-700 hover:border-blue-300 hover:cursor-pointer transition-all delay-75">
        {btn}
      </button>
      <ul className="absolute text-center top-10 left-0 border-2 rounded-lg py-0.5 w-full min-w-23">
        <li className="border-b-2">A - Z {btn}</li>
        <li className="border-b-2">A - Z {btn}</li>
        <li className="border-b-2">A - Z {btn}</li>
        <li className="border-b-2">A - Z {btn}</li>
        <li className="border-b-2">A - Z {btn}</li>
        <li className="border-b-2">A - Z {btn}</li>
        <li className="">A - Z {btn}</li>
      </ul> */}
    </>
  );
};

export default NavbarBtns;
