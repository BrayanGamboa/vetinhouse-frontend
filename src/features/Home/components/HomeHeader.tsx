import { useState } from 'react';
import { Link } from 'react-router';

interface HomeHeaderProps {
  onLogout: () => void;
}

export default function HomeHeader({ onLogout }: HomeHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-5">
          <div className="flex items-center gap-2 text-2xl font-bold text-green-500">
            <i className="fas fa-paw text-3xl"></i>
            <span>VetInHouse</span>
          </div>
          
          <nav className="hidden lg:flex">
            <ul className="flex gap-2 flex-wrap justify-end">
              <li><Link to="/home" className="nav-btn active"><i className="fas fa-home"></i> Inicio</Link></li>
              <li><Link to="/consultacita" className="nav-btn"><i className="fas fa-calendar-check"></i> Consulta Cita</Link></li>
              <li><Link to="/cita" className="nav-btn"><i className="fas fa-calendar-alt"></i> Agendar Cita</Link></li>
              <li><Link to="/petshop" className="nav-btn"><i className="fas fa-shopping-cart"></i> PetShop</Link></li>
              <li><Link to="/paseador" className="nav-btn"><i className="fas fa-walking"></i> Paseadores</Link></li>
              <li><Link to="/gps" className="nav-btn"><i className="fas fa-map-marker-alt"></i> GPS</Link></li>
              <li><Link to="/emergencia" className="nav-btn"><i className="fas fa-exclamation-triangle"></i> Emergencia</Link></li>
              <li><button onClick={onLogout} className="nav-btn logout-btn"><i className="fas fa-sign-out-alt"></i> Cerrar Sesión</button></li>
            </ul>
          </nav>
          
          <div className="lg:hidden flex flex-col gap-1 cursor-pointer" onClick={toggleMobileMenu}>
            <div className={`w-6 h-0.5 bg-green-500 transition-all duration-300 ${isMobileMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-green-500 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-green-500 transition-all duration-300 ${isMobileMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></div>
          </div>
        </div>
      </header>

      {/* Navegación móvil */}
      <nav className={`lg:hidden bg-white shadow-md transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="p-5 space-y-4">
          <li><Link to="/home" className="flex items-center gap-2 text-green-500 font-medium"><i className="fas fa-home"></i> Inicio</Link></li>
          <li><Link to="/consultacita" className="flex items-center gap-2 text-green-500 font-medium"><i className="fas fa-calendar-check"></i> Consulta Cita</Link></li>
          <li><Link to="/cita" className="flex items-center gap-2 text-green-500 font-medium"><i className="fas fa-calendar-alt"></i> Agendar Cita</Link></li>
          <li><Link to="/petshop" className="flex items-center gap-2 text-green-500 font-medium"><i className="fas fa-shopping-cart"></i> PetShop</Link></li>
          <li><Link to="/paseador" className="flex items-center gap-2 text-green-500 font-medium"><i className="fas fa-walking"></i> Paseadores</Link></li>
          <li><Link to="/gps" className="flex items-center gap-2 text-green-500 font-medium"><i className="fas fa-map-marker-alt"></i> GPS</Link></li>
          <li><Link to="/emergencia" className="flex items-center gap-2 text-green-500 font-medium"><i className="fas fa-exclamation-triangle"></i> Emergencia</Link></li>
          <li><button onClick={onLogout} className="flex items-center gap-2 text-red-600 font-medium"><i className="fas fa-sign-out-alt"></i> Cerrar Sesión</button></li>
        </ul>
      </nav>
    </>
  );
}