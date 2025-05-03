import { useState } from "react";

const NavbarBtns = ({ navbarOptions }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBtn, setSelectedBtn] = useState<string>("");

  const handleClick = (btn: string) => {
    setSelectedBtn(btn);
    setIsOpen(!isOpen);
  };

  const handleHover = (btn: string) => {
    isOpen && setSelectedBtn(btn);
  };

  return (
    <>
      <button
        className="border-2 border-white rounded-xl py-0.5 w-full min-w-23 text-white font-semibold hover:bg-white hover:text-blue-700 hover:border-blue-300 hover:cursor-pointer transition-all delay-75"
        onClick={() => handleClick("A-Z")}
        onMouseEnter={() => handleHover("A-Z")}>
        A-Z
      </button>

      {Object.keys(navbarOptions).map((btn) => (
        <div className="relative w-full">
          <button
            className="border-2 border-white rounded-xl py-0.5 w-full min-w-23 text-white font-semibold hover:bg-white hover:text-blue-700 hover:border-blue-300 hover:cursor-pointer transition-all delay-75"
            key={btn}
            onClick={() => handleClick(btn)}
            onMouseEnter={() => handleHover(btn)}>
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
        </div>
      ))}
    </>
  );
};

export default NavbarBtns;
