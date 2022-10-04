import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="bg-lightGrey min-h-screen max-w-screen">
      <Navbar />
      <main className="h-full pb-10">
        <Outlet />
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      </main>
    </div>
  );
}

export default Layout;
