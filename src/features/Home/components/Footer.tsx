import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-16 px-5">
      <div className="flex flex-wrap justify-between max-w-6xl mx-auto gap-10">
        <div className="flex-1 min-w-64">
          <h3 className="text-lg mb-5 relative pb-2">
            Sobre VetInHouse
            <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-green-500"></span>
          </h3>
          <p className="text-gray-300 mb-5 leading-relaxed">
            Ofrecemos servicios veterinarios a domicilio y productos de calidad para el cuidado de tus mascotas.
          </p>
          <div className="flex gap-4">
            <a href="#" className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full text-white transition-all duration-300 hover:bg-green-500 hover:-translate-y-1">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full text-white transition-all duration-300 hover:bg-green-500 hover:-translate-y-1">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full text-white transition-all duration-300 hover:bg-green-500 hover:-translate-y-1">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full text-white transition-all duration-300 hover:bg-green-500 hover:-translate-y-1">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        
        <div className="flex-1 min-w-64">
          <h3 className="text-lg mb-5 relative pb-2">
            Enlaces rápidos
            <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-green-500"></span>
          </h3>
          <ul className="space-y-3">
            <li><Link to="/home" className="text-gray-300 hover:text-green-500 transition-all duration-300 hover:translate-x-1 inline-block">Inicio</Link></li>
            <li><Link to="/consultacita" className="text-gray-300 hover:text-green-500 transition-all duration-300 hover:translate-x-1 inline-block">Consulta Cita</Link></li>
            <li><Link to="/cita" className="text-gray-300 hover:text-green-500 transition-all duration-300 hover:translate-x-1 inline-block">Agendar Cita</Link></li>
            <li><Link to="/petshop" className="text-gray-300 hover:text-green-500 transition-all duration-300 hover:translate-x-1 inline-block">PetShop</Link></li>
            <li><Link to="/paseador" className="text-gray-300 hover:text-green-500 transition-all duration-300 hover:translate-x-1 inline-block">Paseadores</Link></li>
            <li><Link to="/gps" className="text-gray-300 hover:text-green-500 transition-all duration-300 hover:translate-x-1 inline-block">GPS</Link></li>
          </ul>
        </div>
        
        <div className="flex-1 min-w-64">
          <h3 className="text-lg mb-5 relative pb-2">
            Servicios
            <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-green-500"></span>
          </h3>
          <ul className="space-y-3">
            <li><Link to="/cita" className="text-gray-300 hover:text-green-500 transition-all duration-300 hover:translate-x-1 inline-block">Consulta general</Link></li>
            <li><Link to="/cita" className="text-gray-300 hover:text-green-500 transition-all duration-300 hover:translate-x-1 inline-block">Vacunación</Link></li>
            <li><Link to="/cita" className="text-gray-300 hover:text-green-500 transition-all duration-300 hover:translate-x-1 inline-block">Limpieza dental</Link></li>
            <li><Link to="/cita" className="text-gray-300 hover:text-green-500 transition-all duration-300 hover:translate-x-1 inline-block">Peluquería</Link></li>
            <li><Link to="/paseador" className="text-gray-300 hover:text-green-500 transition-all duration-300 hover:translate-x-1 inline-block">Paseo de mascotas</Link></li>
          </ul>
        </div>
        
        <div className="flex-1 min-w-64">
          <h3 className="text-lg mb-5 relative pb-2">
            Contacto
            <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-green-500"></span>
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-gray-300">
              <i className="fas fa-map-marker-alt text-green-500"></i>
              Av. Principal #123, Ciudad
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <i className="fas fa-phone text-green-500"></i>
              +123 456 7890
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <i className="fas fa-envelope text-green-500"></i>
              info@vetinhouse.com
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-10 pt-5 border-t border-white/10 text-center text-gray-400 text-sm">
        <p>&copy; 2025 VetInHouse. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}