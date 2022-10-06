import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="w-full flex bg-bgBlue h-16 justify-space-between items-center md:px-20 px-6 sticky">
      <div className="py-2 container mx-auto">
        <div className="w-32">
          <Link to="/">
            <h1 className="md:text-2xl text-xl text-white font-semibold">
              LinkedOut
            </h1>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
