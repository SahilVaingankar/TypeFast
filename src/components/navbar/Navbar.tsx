import NavbarBtns from "./NavbarBtns";
import navbarOptions from "./navbarOptions";

const Navbar = () => {
  return (
    <header>
      <nav className="bg-blue-700">
        <ul>
          <li className="flex justify-center items-center p-2 gap-2">
            {/* {navbarOptions.map((options) => ( */}
            {/* // <div className="relative w-full" key={btn}>
              //   <button className="border-2 border-white rounded-xl py-0.5 w-full min-w-23 text-white font-semibold hover:bg-white hover:text-blue-700 hover:border-blue-300 hover:cursor-pointer transition-all delay-75">
              //     {btn}
              //   </button>
              //   <ul className="absolute text-center top-10 left-0 border-2 rounded-lg py-0.5 w-full min-w-23">
              //     <li className="border-b-2">A - Z</li>
              //     <li className="border-b-2">A - Z</li>
              //     <li className="border-b-2">A - Z</li>
              //     <li className="border-b-2">A - Z</li>
              //     <li className="border-b-2">A - Z</li>
              //     <li className="border-b-2">A - Z</li>
              //     <li className="">A - Z</li>
              //   </ul>
              // </div> */}
            <NavbarBtns {...{ navbarOptions }} key={navbarOptions} />
            {/* ))} */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
