import NavbarBtns from "./NavbarBtns";
import navbarOptions from "./navbarOptions";

const Navbar = () => {
  return (
    <header>
      <nav className="bg-blue-700 h-[50px]">
        <ul>
          <li className="flex justify-center items-center p-2 gap-2">
            <NavbarBtns {...{ navbarOptions }} key={navbarOptions} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
