import { Link } from "react-router";

export default function WelcomeView() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="text-center">
        <div className="text-6xl text-green-600 mb-4">
          <i className="fas fa-clinic-medical"></i>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">VetInHouse</h1>
        <p className="text-lg text-gray-600 mb-8">Sistema de Gestión Veterinaria</p>
        <Link
          to="/login"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
        >
          <i className="fas fa-sign-in-alt mr-2"></i>
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}
