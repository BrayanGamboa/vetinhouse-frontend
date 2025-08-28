import { useState } from 'react';
import { Link } from 'react-router';
import type { Service } from '../types/home.types';

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalService, setModalService] = useState<Service | null>(null);

  const toggleFavorite = (serviceId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const openModal = (service: Service, e: React.MouseEvent) => {
    e.preventDefault();
    setModalService(service);
    setShowModal(true);
  };

  const getServiceDetails = (service: Service) => {
    const details = {
      'Consulta a Domicilio': {
        price: 'Desde $50.000',
        duration: '45-60 minutos',
        includes: ['Examen físico completo', 'Diagnóstico inicial', 'Recomendaciones', 'Receta médica'],
        popular: true
      },
      'Vacunación': {
        price: 'Desde $30.000',
        duration: '20-30 minutos', 
        includes: ['Aplicación de vacuna', 'Certificado', 'Seguimiento', 'Recomendaciones'],
        popular: false
      },
      'Cirugía Menor': {
        price: 'Desde $150.000',
        duration: '1-2 horas',
        includes: ['Procedimiento completo', 'Anestesia', 'Medicamentos', 'Seguimiento post-operatorio'],
        popular: false
      },
      'Grooming': {
        price: 'Desde $40.000',
        duration: '60-90 minutos',
        includes: ['Baño completo', 'Corte de pelo', 'Limpieza de oídos', 'Corte de uñas'],
        popular: true
      }
    };
    return details[service.title as keyof typeof details] || {
      price: 'Consultar',
      duration: 'Variable',
      includes: ['Servicio profesional'],
      popular: false
    };
  };

  return (
    <section className="py-20 px-5 bg-gray-50">
      <div className="text-center text-3xl mb-4 text-gray-800 relative">
        <h2 className="hover:text-green-600 transition-colors cursor-pointer">Nuestros Servicios</h2>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-green-500 rounded transition-all duration-300 hover:w-32"></div>
      </div>
      
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Haz click en cualquier servicio para ver más detalles. ❤️ para agregar a favoritos.
      </p>
      
      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => {
          const details = getServiceDetails(service);
          const isFavorite = favorites.includes(service.id);
          const isSelected = selectedService === service.id;
          
          return (
            <div 
              key={service.id}
              className={`bg-white rounded-2xl p-8 w-64 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer relative overflow-hidden group ${
                isSelected ? 'ring-2 ring-green-400 scale-105' : ''
              } ${details.popular ? 'border-2 border-yellow-300' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={(e) => {
                setSelectedService(isSelected ? null : service.id);
                openModal(service, e);
              }}
            >
              {/* Badge de popular */}
              {details.popular && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                  ⭐ Popular
                </div>
              )}

              {/* Botón de favorito */}
              <button
                onClick={(e) => toggleFavorite(service.id, e)}
                className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isFavorite 
                    ? 'bg-red-500 text-white scale-110' 
                    : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500'
                }`}
              >
                <i className={`fas fa-heart text-sm ${isFavorite ? 'animate-pulse' : ''}`}></i>
              </button>

              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 transition-all duration-300 ${
                isSelected 
                  ? 'bg-green-500 text-white scale-110 animate-bounce' 
                  : 'bg-green-100 text-green-500 group-hover:bg-green-200 group-hover:scale-110'
              }`}>
                <i className={`${service.icon} text-3xl`}></i>
              </div>

              <h3 className="mb-4 text-gray-800 font-semibold group-hover:text-green-600 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">
                {service.description}
              </p>

              {/* Información adicional que aparece al hover */}
              <div className={`transition-all duration-300 ${
                isSelected ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40'
              } overflow-hidden`}>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Precio:</span>
                    <span className="text-sm font-semibold text-green-600">{details.price}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Duración:</span>
                    <span className="text-sm text-gray-700">{details.duration}</span>
                  </div>
                  <button className="w-full bg-green-500 text-white py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors">
                    Ver detalles
                  </button>
                </div>
              </div>

              {/* Partículas decorativas */}
              {isSelected && (
                <>
                  <div className="absolute top-2 left-2 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                </>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Contador de favoritos */}
      {favorites.length > 0 && (
        <div className="text-center mt-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full">
            <i className="fas fa-heart animate-pulse"></i>
            <span className="font-semibold">
              {favorites.length} {favorites.length === 1 ? 'servicio favorito' : 'servicios favoritos'}
            </span>
          </div>
        </div>
      )}
      
      <div className="text-center mt-10">
        <Link 
          to="/cita" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-full font-semibold transition-all duration-300 hover:bg-green-600 hover:-translate-y-1 hover:shadow-lg hover:scale-105 group"
        >
          Agendar un servicio 
          <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </Link>
      </div>

      {/* Modal de detalles */}
      {showModal && modalService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${modalService.icon} text-3xl text-green-500`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{modalService.title}</h3>
              <p className="text-gray-600">{modalService.description}</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Precio:</span>
                <span className="font-semibold text-green-600">{getServiceDetails(modalService).price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duración:</span>
                <span className="text-gray-800">{getServiceDetails(modalService).duration}</span>
              </div>
              
              <div>
                <span className="text-gray-600 block mb-2">Incluye:</span>
                <ul className="text-sm text-gray-700 space-y-1">
                  {getServiceDetails(modalService).includes.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <i className="fas fa-check text-green-500 text-xs"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                Cerrar
              </button>
              <Link 
                to="/cita"
                className="flex-1 bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600 transition-colors text-center"
              >
                Agendar
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}