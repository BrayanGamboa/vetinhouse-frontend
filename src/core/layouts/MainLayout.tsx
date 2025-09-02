import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import type { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  showBackgroundEffects?: boolean;
}

export default function MainLayout({ children, title, showBackgroundEffects = true }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Determinar si un enlace está activo
  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    // Configurar partículas interactivas solo si están habilitadas
    if (showBackgroundEffects && window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: ['#4CAF50', '#FF9800', '#2196F3', '#E91E63'] },
          shape: { 
            type: ['circle', 'triangle'],
            stroke: { width: 2, color: '#4CAF50' }
          },
          opacity: { value: 0.4, random: true },
          size: { value: 4, random: true, anim: { enable: true, speed: 2 } },
          line_linked: { enable: true, distance: 150, color: '#4CAF50', opacity: 0.3, width: 1 },
          move: { 
            enable: true, 
            speed: 3,
            direction: 'none',
            random: true,
            out_mode: 'bounce'
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: { 
            onhover: { enable: true, mode: 'grab' }, 
            onclick: { enable: true, mode: 'push' },
            resize: true
          },
          modes: {
            grab: { distance: 200, line_linked: { opacity: 0.8 } },
            push: { particles_nb: 4 }
          }
        }
      });
    }

    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showBackgroundEffects]);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* Efectos de fondo opcionales */}
      {showBackgroundEffects && (
        <>
          {/* Partículas de fondo */}
          <div id="particles-js" className="fixed w-full h-full -z-10"></div>
          
          {/* Elementos flotantes interactivos */}
          <div className="fixed w-full h-full pointer-events-none -z-10">
            <i className="fas fa-bone absolute text-green-100 text-2xl animate-[float_20s_linear_infinite] cursor-pointer pointer-events-auto transition-all duration-300 hover:text-green-300 hover:scale-125" style={{top: '10%', left: '10%'}}></i>
            <i className="fas fa-paw absolute text-green-100 text-lg animate-[float_15s_linear_infinite] cursor-pointer pointer-events-auto transition-all duration-300 hover:text-green-300 hover:scale-125" style={{top: '20%', left: '80%', animationDelay: '2s'}}></i>
            <i className="fas fa-fish absolute text-green-100 text-3xl animate-[float_18s_linear_infinite] cursor-pointer pointer-events-auto transition-all duration-300 hover:text-green-300 hover:scale-125" style={{top: '60%', left: '30%', animationDelay: '5s'}}></i>
            <i className="fas fa-dog absolute text-green-100 text-xl animate-[float_22s_linear_infinite] cursor-pointer pointer-events-auto transition-all duration-300 hover:text-green-300 hover:scale-125" style={{top: '80%', left: '70%', animationDelay: '8s'}}></i>
            <i className="fas fa-cat absolute text-green-100 text-2xl animate-[float_25s_linear_infinite] cursor-pointer pointer-events-auto transition-all duration-300 hover:text-green-300 hover:scale-125" style={{top: '40%', left: '50%', animationDelay: '10s'}}></i>
            <i className="fas fa-heart absolute text-pink-200 text-xl animate-[float_30s_linear_infinite] cursor-pointer pointer-events-auto transition-all duration-300 hover:text-pink-300 hover:scale-125" style={{top: '30%', left: '20%', animationDelay: '12s'}}></i>
          </div>
        </>
      )}

      {/* Header con navegación */}
      <header className="bg-white shadow-md sticky top-0 z-50 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-5">
          <div className="flex items-center gap-2 text-2xl font-bold text-green-500">
            <i className="fas fa-paw text-3xl"></i>
            <span>VetInHouse</span>
          </div>
          
          <nav className="hidden lg:flex">
            <ul className="flex gap-2 flex-wrap justify-end">
              <li>
                <Link 
                  to="/home" 
                  className={`nav-btn ${isActiveLink('/home') ? 'active' : ''}`}
                >
                  <i className="fas fa-home"></i> Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/consultacita" 
                  className={`nav-btn ${isActiveLink('/consultacita') ? 'active' : ''}`}
                >
                  <i className="fas fa-calendar-check"></i> Consulta Cita
                </Link>
              </li>
              <li>
                <Link 
                  to="/cita" 
                  className={`nav-btn ${isActiveLink('/cita') ? 'active' : ''}`}
                >
                  <i className="fas fa-calendar-alt"></i> Agendar Cita
                </Link>
              </li>
              <li>
                <Link 
                  to="/petshop" 
                  className={`nav-btn ${isActiveLink('/petshop') ? 'active' : ''}`}
                >
                  <i className="fas fa-shopping-cart"></i> PetShop
                </Link>
              </li>
              <li>
                <Link 
                  to="/paseador" 
                  className={`nav-btn ${isActiveLink('/paseador') ? 'active' : ''}`}
                >
                  <i className="fas fa-walking"></i> Paseadores
                </Link>
              </li>
              <li>
                <Link 
                  to="/gps" 
                  className={`nav-btn ${isActiveLink('/gps') ? 'active' : ''}`}
                >
                  <i className="fas fa-map-marker-alt"></i> GPS
                </Link>
              </li>
              <li>
                <Link 
                  to="/emergencia" 
                  className={`nav-btn ${isActiveLink('/emergencia') ? 'active' : ''}`}
                >
                  <i className="fas fa-exclamation-triangle"></i> Emergencia
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="nav-btn logout-btn">
                  <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                </button>
              </li>
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
          <li>
            <Link 
              to="/home" 
              className={`flex items-center gap-2 font-medium transition-colors duration-200 ${
                isActiveLink('/home') ? 'text-green-600' : 'text-green-500 hover:text-green-600'
              }`}
            >
              <i className="fas fa-home"></i> Inicio
            </Link>
          </li>
          <li>
            <Link 
              to="/consultacita" 
              className={`flex items-center gap-2 font-medium transition-colors duration-200 ${
                isActiveLink('/consultacita') ? 'text-green-600' : 'text-green-500 hover:text-green-600'
              }`}
            >
              <i className="fas fa-calendar-check"></i> Consulta Cita
            </Link>
          </li>
          <li>
            <Link 
              to="/cita" 
              className={`flex items-center gap-2 font-medium transition-colors duration-200 ${
                isActiveLink('/cita') ? 'text-green-600' : 'text-green-500 hover:text-green-600'
              }`}
            >
              <i className="fas fa-calendar-alt"></i> Agendar Cita
            </Link>
          </li>
          <li>
            <Link 
              to="/petshop" 
              className={`flex items-center gap-2 font-medium transition-colors duration-200 ${
                isActiveLink('/petshop') ? 'text-green-600' : 'text-green-500 hover:text-green-600'
              }`}
            >
              <i className="fas fa-shopping-cart"></i> PetShop
            </Link>
          </li>
          <li>
            <Link 
              to="/paseador" 
              className={`flex items-center gap-2 font-medium transition-colors duration-200 ${
                isActiveLink('/paseador') ? 'text-green-600' : 'text-green-500 hover:text-green-600'
              }`}
            >
              <i className="fas fa-walking"></i> Paseadores
            </Link>
          </li>
          <li>
            <Link 
              to="/gps" 
              className={`flex items-center gap-2 font-medium transition-colors duration-200 ${
                isActiveLink('/gps') ? 'text-green-600' : 'text-green-500 hover:text-green-600'
              }`}
            >
              <i className="fas fa-map-marker-alt"></i> GPS
            </Link>
          </li>
          <li>
            <Link 
              to="/emergencia" 
              className={`flex items-center gap-2 font-medium transition-colors duration-200 ${
                isActiveLink('/emergencia') ? 'text-green-600' : 'text-green-500 hover:text-green-600'
              }`}
            >
              <i className="fas fa-exclamation-triangle"></i> Emergencia
            </Link>
          </li>
          <li>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 text-red-600 font-medium hover:text-red-700 transition-colors duration-200"
            >
              <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>

      {/* Título de página opcional */}
      {title && (
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-8">
          <div className="max-w-6xl mx-auto px-5">
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Botón scroll to top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-green-600 hover:-translate-y-1 hover:scale-110 z-40 ${
          showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}
