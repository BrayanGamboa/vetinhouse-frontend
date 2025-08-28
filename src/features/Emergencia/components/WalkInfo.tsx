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
    if (isEmergencyActive) return 'bg-orange-500 text-white';
    return 'bg-green-500 text-white';
  };

  const getWalkStatusText = () => {
    if (isEmergencyActive) return 'En alerta';
    return 'En paseo';
  };

  return (
    <div className="bg-white mx-auto max-w-6xl rounded-2xl shadow-lg p-8 my-5">
      <div className="flex justify-between items-start gap-8 flex-wrap">
        {/* Información del paseador */}
        <div className="flex items-start gap-5 flex-1">
          <div className="relative">
            <img 
              src={walkerData.image}
              alt={walkerData.name}
              className="w-20 h-20 rounded-full object-cover shadow-lg"
            />
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getWalkerStatusClass()} rounded-full border-2 border-white flex items-center justify-center`}>
              <i className="fas fa-circle text-xs text-white"></i>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-1">{walkerData.name}</h3>
            <p className="text-gray-600 mb-3">⭐ {walkerData.rating} ({walkerData.reviews} reseñas)</p>
            
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getWalkStatusClass()}`}>
                {getWalkStatusText()}
              </span>
              <span className="text-gray-600 font-medium">{walkTime}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <i className="fas fa-route text-green-500 w-4"></i>
                <span>Ruta: {isEmergencyActive ? 'Irregular' : 'Normal'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <i className="fas fa-tachometer-alt text-green-500 w-4"></i>
                <span>Velocidad: Normal</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <i className={`fas fa-comments ${walkerData.isOnline ? 'text-green-500' : 'text-red-500'} w-4`}></i>
                <span>Comunicación: {walkerData.isOnline ? 'Activa' : 'Sin respuesta'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información de la mascota */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={petData.image}
              alt={petData.name}
              className="w-20 h-20 rounded-full object-cover shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <i className="fas fa-heart text-xs text-white"></i>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-1">{petData.name}</h4>
            <p className="text-gray-600 text-sm mb-3">{petData.breed}</p>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <i className="fas fa-heartbeat text-green-500 w-3"></i>
                <span>{petData.heartRate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <i className="fas fa-thermometer-half text-green-500 w-3"></i>
                <span>{petData.activity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}