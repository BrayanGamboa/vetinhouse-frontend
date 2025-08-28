import { useEffect, useState } from 'react';
import { useHome } from '../hooks/useHome';
import Loader from '../components/Loader';
import HomeHeader from '../components/HomeHeader';
import HeroBanner from '../components/HeroBanner';
import QuickAccess from '../components/QuickAccess';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';

export default function HomeView() {
  const { isLoading, quickAccessItems, services, testimonials, handleLogout } = useHome();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Configurar partículas interactivas
    if (window.particlesJS && !isLoading) {
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
  }, [isLoading]);

  return (
    <>
      <Loader isVisible={isLoading} />
      
      {!isLoading && (
        <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
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

          <HomeHeader onLogout={handleLogout} />
          <HeroBanner />
          <QuickAccess items={quickAccessItems} />
          <AboutSection />
          <ServicesSection services={services} />
          
          {/* Banner PetShop Interactivo */}
          <section className="py-12 px-5">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-10 mx-auto max-w-5xl shadow-xl text-white text-center relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4 flex justify-center gap-4">
                  <i className="fas fa-shopping-cart animate-pulse group-hover:animate-bounce"></i>
                  <i className="fas fa-paw animate-pulse group-hover:animate-bounce" style={{animationDelay: '0.5s'}}></i>
                </div>
                <h2 className="text-3xl font-bold mb-4 group-hover:text-yellow-200 transition-colors">Descubre nuestro PetShop</h2>
                <p className="text-lg mb-6 max-w-3xl mx-auto group-hover:text-green-100 transition-colors">
                  Encuentra alimentos premium, accesorios, juguetes y todo lo que necesitas para el cuidado y bienestar de tu compañero peludo.
                </p>
                <a href="/petshop" className="inline-flex items-center bg-white text-green-500 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group-hover:bg-yellow-100">
                  Ir a la tienda <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
          </section>

          {/* Banner Paseadores Interactivo */}
          <section className="py-12 px-5">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-10 mx-auto max-w-5xl shadow-xl text-white text-center relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4 flex justify-center gap-4">
                  <i className="fas fa-walking animate-pulse group-hover:animate-bounce"></i>
                  <i className="fas fa-dog animate-pulse group-hover:animate-bounce" style={{animationDelay: '0.5s'}}></i>
                </div>
                <h2 className="text-3xl font-bold mb-4 group-hover:text-yellow-200 transition-colors">Paseadores de Confianza</h2>
                <p className="text-lg mb-6 max-w-3xl mx-auto group-hover:text-orange-100 transition-colors">
                  Nuestros paseadores profesionales se encargarán de que tu mascota reciba el ejercicio que necesita mientras tú te ocupas de tus actividades diarias.
                </p>
                <a href="/paseador" className="inline-flex items-center bg-white text-orange-500 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group-hover:bg-yellow-100">
                  Encontrar paseador <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
          </section>

          <TestimonialsSection testimonials={testimonials} />
          
          {/* CTA Section Interactivo */}
          <section className="py-20 px-5 bg-gradient-to-br from-green-500 to-green-600 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 text-6xl animate-pulse cursor-pointer hover:scale-110 transition-transform">🐾</div>
              <div className="absolute top-20 right-20 text-4xl animate-pulse cursor-pointer hover:scale-110 transition-transform" style={{animationDelay: '1s'}}>❤️</div>
              <div className="absolute bottom-20 left-20 text-5xl animate-pulse cursor-pointer hover:scale-110 transition-transform" style={{animationDelay: '2s'}}>🏥</div>
              <div className="absolute bottom-10 right-10 text-3xl animate-pulse cursor-pointer hover:scale-110 transition-transform" style={{animationDelay: '3s'}}>🩺</div>
            </div>
            <div className="max-w-4xl mx-auto relative z-10">
              <h2 className="text-4xl font-bold mb-5">¿Listo para cuidar de tu mascota?</h2>
              <p className="text-lg mb-8 opacity-90">
                Agenda una cita ahora y recibe atención veterinaria profesional en la comodidad de tu hogar.
              </p>
              <a href="/cita" className="inline-flex items-center bg-white text-green-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-yellow-100 hover:scale-105 group">
                Agendar cita <i className="fas fa-calendar-check ml-2 group-hover:animate-pulse"></i>
              </a>
            </div>
          </section>

          <Footer />

          {/* Botón scroll to top mejorado */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-8 right-8 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-green-600 hover:-translate-y-1 hover:scale-110 z-40 ${showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          >
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      )}
    </>
  );
}