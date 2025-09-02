import { Link } from 'react-router';

export default function HeroBanner() {

  return (
    <section className="flex items-center justify-between max-w-6xl mx-auto my-12 px-5 gap-8 flex-col lg:flex-row">
      <div className="flex-1 order-2 lg:order-1">
        <h1 className="text-4xl lg:text-5xl mb-5 text-gray-800 animate-fade-in">
          Cuidado veterinario en la <span className="text-green-500 relative group cursor-pointer">
            comodidad
            <span className="absolute bottom-0 left-0 w-full h-2 bg-green-200 -z-10 group-hover:bg-green-300 transition-colors duration-300"></span>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              ¡En tu hogar! 🏠
            </span>
          </span> de tu hogar
        </h1>
        <p className="text-lg text-gray-600 mb-8 animate-fade-in-delay">
          Ofrecemos servicios veterinarios a domicilio, paseadores de perros y todo lo que tu mascota necesita sin que tengas que salir de casa.
        </p>
        
        {/* Estadísticas interactivas */}
        <div className="flex gap-6 mb-8 flex-wrap">
          <div className="bg-green-50 px-4 py-2 rounded-full cursor-pointer hover:bg-green-100 transition-colors group">
            <span className="text-green-600 font-semibold group-hover:animate-pulse">+500 mascotas felices 🐕</span>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-100 transition-colors group">
            <span className="text-blue-600 font-semibold group-hover:animate-pulse">24/7 disponible 🕐</span>
          </div>
          <div className="bg-purple-50 px-4 py-2 rounded-full cursor-pointer hover:bg-purple-100 transition-colors group">
            <span className="text-purple-600 font-semibold group-hover:animate-pulse">Veterinarios certificados 👨‍⚕️</span>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Link 
            to="/cita" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-semibold transition-all duration-300 hover:bg-green-600 hover:-translate-y-1 hover:shadow-lg group"
          >
            Agenda una cita 
            <i className="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
          </Link>
          
          <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-green-500 text-green-500 rounded-full font-semibold transition-all duration-300 hover:bg-green-500 hover:text-white hover:-translate-y-1 hover:shadow-lg group">
            <i className="fas fa-play group-hover:animate-pulse"></i>
            Ver video
          </button>
        </div>
      </div>
      
      <div className="flex-1 order-1 lg:order-2 relative">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Veterinario con mascota"
            className="w-full max-w-lg rounded-3xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}