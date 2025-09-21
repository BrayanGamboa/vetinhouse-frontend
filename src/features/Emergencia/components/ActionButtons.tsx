import type { WalkerData } from '../types/emergencia.types';

interface ActionButtonsProps {
  unreadCount: number;
  walkerData: WalkerData;
  onCallWalker: () => void;
  onOpenChat: () => void;
  onReport: () => void;
  onContactVet: () => void;
}

export default function ActionButtons({ 
  unreadCount, 
  walkerData,
  onCallWalker, 
  onOpenChat, 
  onReport, 
  onContactVet 
}: ActionButtonsProps) {
  return (
    <div className="mx-auto max-w-6xl px-5 my-8">
      {/* Header de acciones */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Acciones Rápidas</h3>
        <p className="text-gray-600">Mantén contacto y reporta cualquier situación</p>
      </div>

      {/* Grid de botones mejorado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Llamar Paseador */}
        <button 
          onClick={onCallWalker}
          className="group relative bg-white/90 backdrop-blur-xl border-2 border-green-200 hover:border-green-400 rounded-3xl p-6 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:bg-green-500 overflow-hidden"
        >
          {/* Efecto de fondo animado */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-3xl"></div>
          
          {/* Anillos de llamada animados */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 border-2 border-green-400/30 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
            <div className="absolute w-24 h-24 border-2 border-green-400/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 delay-300"></div>
          </div>
          
          {/* Contenido */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            {/* Foto del paseador con efecto de llamada */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-3 border-green-100 group-hover:border-white/50 transition-all duration-300 shadow-lg bg-white">
                <img 
                  src={walkerData.image} 
                  alt={walkerData.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              {/* Icono de teléfono superpuesto */}
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 group-hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300">
                <i className="fas fa-phone text-white group-hover:text-green-500 text-sm group-hover:animate-bounce"></i>
              </div>
              {/* Indicador de estado online */}
              {walkerData.isOnline && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              )}
            </div>
            
            <div className="text-center">
              <h4 className="font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                Llamar a {walkerData.name.split(' ')[0]}
              </h4>
              <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors duration-300 mt-1">
                {walkerData.isOnline ? 'En línea' : 'Desconectado'}
              </p>
            </div>
          </div>
        </button>

        {/* Chat */}
        <button 
          onClick={onOpenChat}
          className="group relative bg-white/90 backdrop-blur-xl border-2 border-blue-200 hover:border-blue-400 rounded-3xl p-6 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:bg-blue-500 overflow-hidden"
        >
          {/* Efecto de fondo animado */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-3xl"></div>
          
          {/* Badge de mensajes no leídos */}
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 z-20">
              <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg animate-pulse">
                {unreadCount}
              </div>
            </div>
          )}
          
          {/* Contenido */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 group-hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all duration-300">
              <i className="fas fa-comment text-2xl text-blue-500 group-hover:text-white group-hover:animate-pulse"></i>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                Chat
              </h4>
              <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors duration-300 mt-1">
                Mensajes en tiempo real
              </p>
            </div>
          </div>
        </button>

        {/* Reportar Problema */}
        <button 
          onClick={onReport}
          className="group relative bg-white/90 backdrop-blur-xl border-2 border-orange-200 hover:border-orange-400 rounded-3xl p-6 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:bg-orange-500 overflow-hidden"
        >
          {/* Efecto de fondo animado */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-3xl"></div>
          
          {/* Contenido */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-orange-100 group-hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all duration-300">
              <i className="fas fa-flag text-2xl text-orange-500 group-hover:text-white group-hover:animate-bounce"></i>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                Reportar Problema
              </h4>
              <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors duration-300 mt-1">
                Incident report
              </p>
            </div>
          </div>
        </button>

        {/* Contactar Veterinario */}
        <button 
          onClick={onContactVet}
          className="group relative bg-white/90 backdrop-blur-xl border-2 border-red-200 hover:border-red-400 rounded-3xl p-6 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:bg-red-500 overflow-hidden"
        >
          {/* Efecto de fondo animado */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-3xl"></div>
          
          {/* Contenido */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-red-100 group-hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all duration-300">
              <i className="fas fa-user-md text-2xl text-red-500 group-hover:text-white group-hover:animate-pulse"></i>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                Contactar Veterinario
              </h4>
              <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors duration-300 mt-1">
                Emergencia médica
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Información adicional */}
      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-4 border border-blue-200">
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <i className="fas fa-info-circle text-blue-500"></i>
            <p className="font-medium">
              Todas las acciones son monitoreadas para tu seguridad y la de tu mascota
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}