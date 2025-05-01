const NavbarBtns = ({ btn }: any) => {
  return (
    <div className="relative w-full">
      <button className="border-2 border-white rounded-xl py-0.5 w-full min-w-23 text-white font-semibold hover:bg-white hover:text-blue-700 hover:border-blue-300 hover:cursor-pointer transition-all delay-75">
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
      </ul>
    </div>
  );
};

export default NavbarBtns;
