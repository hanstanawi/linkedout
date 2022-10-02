import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="w-full flex bg-white h-16 justify-space-between items-center px-20 sticky">
      <div className="py-2 container mx-auto">
        <Link to="/">
          <h1 className="text-2xl font-semibold">LinkedOut</h1>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
