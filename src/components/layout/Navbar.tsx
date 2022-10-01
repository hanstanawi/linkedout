import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="w-full flex bg-white h-20 justify-space-between items-center px-20 fixed">
      <div className="py-2">
        <Link to="/">
          <h1 className="text-2xl font-semibold">LinkedOut</h1>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
