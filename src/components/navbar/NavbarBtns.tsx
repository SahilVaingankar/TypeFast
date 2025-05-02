const NavbarBtns = ({ navbarOptions }: any) => {
  return (
    <>
      <button className="border-2 border-white rounded-xl py-0.5 w-full min-w-23 text-white font-semibold hover:bg-white hover:text-blue-700 hover:border-blue-300 hover:cursor-pointer transition-all delay-75">
        A-Z
      </button>

      {Object.keys(navbarOptions).map((btn) => (
        <div className="relative w-full">
          <button
            className="border-2 border-white rounded-xl py-0.5 w-full min-w-23 text-white font-semibold hover:bg-white hover:text-blue-700 hover:border-blue-300 hover:cursor-pointer transition-all delay-75"
            key={btn}>
            {btn}
          </button>
          {navbarOptions[btn] ? (
            <ul className="absolute text-center top-10 left-0 border-2 rounded-lg py-0.5 w-full min-w-23">
              {navbarOptions[btn].slice(0, -1).map((option: string) => (
                <li className="border-b-2" key={option}>
                  {option}
                </li>
              ))}
              <li>{navbarOptions[btn][navbarOptions[btn].length - 1]}</li>
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
