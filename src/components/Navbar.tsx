const Navbar = () => {
  const buttons = ["Words", "Lines", "Code"];
  return (
    <header>
      <nav className="bg-blue-700">
        <ul>
          <li className="flex justify-center items-center p-2 gap-2">
            {buttons.map((btn) => (
              <button className="flex justify-around items-center border-2 border-white rounded-xl py-0.5 w-full min-w-23 text-white font-semibold hover:bg-white hover:text-blue-700 hover:border-blue-300 transition-all delay-75">
                {btn}
              </button>
            ))}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
