import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="bg-lightGrey min-h-screen max-w-screen">
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
