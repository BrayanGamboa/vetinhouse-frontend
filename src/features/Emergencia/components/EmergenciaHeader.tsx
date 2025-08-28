import { Link } from 'react-router';

interface EmergenciaHeaderProps {
  onLogout: () => void;
}

export default function EmergenciaHeader({ onLogout }: EmergenciaHeaderProps) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-5">
        <div className="flex items-center gap-2 text-2xl font-bold text-red-500">
          <i className="fas fa-shield-alt text-3xl"></i>
          <span>VetInHouse Emergencias</span>
        </div>
        
        <nav className="hidden lg:flex">
          <ul className="flex gap-2">
            <li><Link to="/home" className="nav-btn"><i className="fas fa-home"></i> Inicio</Link></li>
            <li><Link to="/emergencia" className="nav-btn active"><i className="fas fa-exclamation-triangle"></i> Emergencias</Link></li>
            <li><a href="#" className="nav-btn"><i className="fas fa-phone"></i> Contacto</a></li>
            <li><button onClick={onLogout} className="nav-btn logout-btn"><i className="fas fa-sign-out-alt"></i> Salir</button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}