import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  const location = useLocation();

  return (
    <>
      {/* Prikazuj Navbar samo ako trenutna ruta nije login page (ruta '/') */}
      {location.pathname !== '/' && <Navbar />}
      <Outlet /> {/* Ovim renderuješ child rute */}
    </>
  );
};

export default Layout;
