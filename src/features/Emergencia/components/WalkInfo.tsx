import type { WalkerData, PetData } from '../types/emergencia.types';

interface WalkInfoProps {
  walkerData: WalkerData;
  petData: PetData;
  walkTime: string;
  isEmergencyActive: boolean;
}

export default function WalkInfo({ walkerData, petData, walkTime, isEmergencyActive }: WalkInfoProps) {
  const getWalkerStatusClass = () => {
    if (!walkerData.isOnline) return 'bg-red-500';
    if (isEmergencyActive) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getWalkStatusClass = () => {
    if (isEmergencyActive) return 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-300';
    return 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-300';
  };

  const getWalkStatusText = () => {
    if (isEmergencyActive) return 'En alerta';
    return 'En paseo';
  };

  const getWalkerStatusText = () => {
    if (!walkerData.isOnline) return { text: 'Sin conexión', class: 'text-red-600 bg-red-50 border-red-200' };
    if (isEmergencyActive) return { text: 'Alerta activa', class: 'text-orange-600 bg-orange-50 border-orange-200' };
    return { text: 'Conectado', class: 'text-green-600 bg-green-50 border-green-200' };
  };

  const walkerStatus = getWalkerStatusText();

  return (
    <div className="mx-auto max-w-6xl px-5 my-8">
      {/* Contenedor principal con glassmorphism */}
      <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:transform hover:scale-[1.01] hover:shadow-3xl">
        
        {/* Header del paseo */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <i className="fas fa-walking text-green-500"></i>
              Información del Paseo
            </h3>
            <div className={`px-4 py-2 rounded-full border-2 font-bold text-sm ${getWalkStatusClass()} shadow-lg`}>
              <i className="fas fa-circle mr-2 animate-pulse"></i>
              {getWalkStatusText()}
            </div>
          </div>
          
          {/* Tiempo de paseo destacado */}
          <div className="text-center bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-4 border border-green-200">
            <div className="text-gray-600 text-sm font-medium mb-1">Tiempo de paseo</div>
            <div className="text-3xl font-bold text-green-600">{walkTime}</div>
          </div>
        </div>

        {/* Grid de información */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Información del paseador */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start gap-4">
              {/* Avatar del paseador con indicador */}
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={walkerData.image}
                    alt={walkerData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Indicador de estado */}
                <div className={`absolute -bottom-2 -right-2 w-8 h-8 ${getWalkerStatusClass()} rounded-full border-4 border-white flex items-center justify-center shadow-lg`}>
                  <i className="fas fa-circle text-xs text-white"></i>
                </div>
              </div>
              
              {/* Datos del paseador */}
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-800 mb-1">{walkerData.name}</h4>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fas fa-star text-sm ${i < Math.floor(walkerData.rating) ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">
                    {walkerData.rating} ({walkerData.reviews} reseñas)
                  </span>
                </div>
                
                {/* Estado del paseador */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${walkerStatus.class}`}>
                  <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                  {walkerStatus.text}
                </div>
              </div>
            </div>

            {/* Estadísticas del paseo */}
            <div className="mt-6 space-y-3">
              <div className="bg-white/70 rounded-xl p-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="fas fa-route text-blue-500 w-4"></i>
                    <span>Ruta:</span>
                  </div>
                  <span className={`font-medium ${isEmergencyActive ? 'text-red-600' : 'text-green-600'}`}>
                    {isEmergencyActive ? 'Irregular' : 'Normal'}
                  </span>
                </div>
              </div>
              
              <div className="bg-white/70 rounded-xl p-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="fas fa-tachometer-alt text-blue-500 w-4"></i>
                    <span>Velocidad:</span>
                  </div>
                  <span className="font-medium text-green-600">Normal</span>
                </div>
              </div>
              
              <div className="bg-white/70 rounded-xl p-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className={`fas fa-comments ${walkerData.isOnline ? 'text-green-500' : 'text-red-500'} w-4`}></i>
                    <span>Comunicación:</span>
                  </div>
                  <span className={`font-medium ${walkerData.isOnline ? 'text-green-600' : 'text-red-600'}`}>
                    {walkerData.isOnline ? 'Activa' : 'Sin respuesta'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Información de la mascota */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start gap-4">
              {/* Avatar de la mascota */}
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={petData.image}
                    alt={petData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Indicador de salud */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                  <i className="fas fa-heart text-xs text-white animate-pulse"></i>
                </div>
              </div>
              
              {/* Datos de la mascota */}
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-800 mb-1">{petData.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{petData.breed}</p>
                
                {/* Estado de salud */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 border border-green-200 text-sm font-medium">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Saludable
                </div>
              </div>
            </div>

            {/* Métricas de salud */}
            <div className="mt-6 space-y-3">
              <div className="bg-white/70 rounded-xl p-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="fas fa-heartbeat text-red-500 w-4"></i>
                    <span>Frecuencia cardíaca:</span>
                  </div>
                  <span className="font-bold text-red-600">{petData.heartRate}</span>
                </div>
              </div>
              
              <div className="bg-white/70 rounded-xl p-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="fas fa-running text-green-500 w-4"></i>
                    <span>Actividad:</span>
                  </div>
                  <span className="font-bold text-green-600">{petData.activity}</span>
                </div>
              </div>
              
              <div className="bg-white/70 rounded-xl p-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="fas fa-thermometer-half text-blue-500 w-4"></i>
                    <span>Temperatura:</span>
                  </div>
                  <span className="font-bold text-blue-600">Normal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}