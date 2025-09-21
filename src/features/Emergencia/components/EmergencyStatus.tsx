import type { EmergencyType } from '../types/emergencia.types';

interface EmergencyStatusProps {
  isEmergencyActive: boolean;
  currentEmergency?: EmergencyType;
  onTriggerEmergency: () => void;
  onSimulateEmergency: () => void;
  onStopEmergency: () => void;
}

export default function EmergencyStatus({ 
  isEmergencyActive, 
  currentEmergency, 
  onTriggerEmergency, 
  onSimulateEmergency,
  onStopEmergency
}: EmergencyStatusProps) {
  const getStatusClass = () => {
    if (!isEmergencyActive) return 'from-emerald-400 via-green-500 to-green-600';
    if (currentEmergency?.severity === 'high') return 'from-red-400 via-red-500 to-red-600 animate-pulse';
    return 'from-orange-400 via-orange-500 to-orange-600';
  };

  const getStatusIcon = () => {
    if (!isEmergencyActive) return 'fas fa-shield-check';
    if (currentEmergency?.severity === 'high') return 'fas fa-exclamation-triangle';
    return 'fas fa-exclamation-circle';
  };

  const getStatusText = () => {
    if (!isEmergencyActive) return { title: 'Estado: Normal', subtitle: 'Tu mascota está segura' };
    if (currentEmergency?.severity === 'high') return { title: '¡EMERGENCIA!', subtitle: currentEmergency.title };
    return { title: 'Alerta', subtitle: currentEmergency?.title || 'Situación detectada' };
  };

  const getRiskLevel = () => {
    if (!isEmergencyActive) return { text: 'Riesgo: Bajo', class: 'bg-white/90 text-green-700 border-white/50' };
    if (currentEmergency?.severity === 'high') return { text: 'Riesgo: Alto', class: 'bg-white/90 text-red-700 border-white/50' };
    return { text: 'Riesgo: Medio', class: 'bg-white/90 text-orange-700 border-white/50' };
  };

  const status = getStatusText();
  const risk = getRiskLevel();

  return (
    <div className="mx-auto max-w-6xl px-5 my-8">
      {/* Contenedor principal mejorado */}
      <div className={`bg-gradient-to-br ${getStatusClass()} relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-3xl hover:scale-[1.02] transform`}>
        
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0">
          {/* Círculos flotantes */}
          <div className="absolute top-4 right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-8 left-8 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/15 rounded-full blur-lg animate-bounce delay-500"></div>
          
          {/* Patrón de ondas */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              <path d="M0,100 C150,200 350,0 400,100 L400,200 L0,200 Z" fill="rgba(255,255,255,0.1)" className="animate-pulse"/>
            </svg>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 p-8">
          
          {/* Header con icono principal */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              
              {/* Icono principal con múltiples efectos */}
              <div className="relative">
                {/* Glow exterior */}
                <div className="absolute inset-0 bg-white/30 rounded-3xl blur-2xl animate-pulse scale-125"></div>
                {/* Contenedor del icono */}
                <div className="relative bg-white/20 backdrop-blur-lg rounded-3xl p-6 border border-white/40 shadow-xl">
                  <div className="relative">
                    {/* Icono con sombra */}
                    <i className={`${getStatusIcon()} text-5xl text-white drop-shadow-2xl ${!isEmergencyActive ? 'animate-bounce' : currentEmergency?.severity === 'high' ? 'animate-pulse' : ''}`}></i>
                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-full blur-sm"></div>
                  </div>
                </div>
              </div>
              
              {/* Información de estado */}
              <div className="text-white">
                <h2 className="text-4xl font-black mb-3 drop-shadow-lg tracking-tight">
                  {status.title}
                </h2>
                <p className="text-xl opacity-95 mb-6 drop-shadow-sm font-medium">
                  {status.subtitle}
                </p>
                
                {/* Badge de riesgo mejorado */}
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl border-2 font-bold backdrop-blur-sm ${risk.class} shadow-xl hover:scale-105 transition-transform duration-300`}>
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-current animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-current animate-ping"></div>
                  </div>
                  <span className="text-lg">{risk.text}</span>
                </div>
              </div>
            </div>

            {/* Tiempo de emergencia mejorado si está activa */}
            {isEmergencyActive && (
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 border border-white/40 shadow-xl hover:scale-105 transition-transform duration-300">
                  <div className="text-white/90 text-sm font-bold mb-2 uppercase tracking-wider">
                    Tiempo transcurrido
                  </div>
                  <div className="text-3xl font-black text-white drop-shadow-lg">
                    05:23
                  </div>
                  <div className="w-full h-1 bg-white/20 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-white/60 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botones de acción mejorados */}
          <div className="flex flex-wrap gap-6 justify-center">
            
            {/* Botón condicional - Detener emergencia si está activa */}
            {isEmergencyActive ? (
              <button 
                onClick={onStopEmergency}
                className="group relative bg-gray-700/95 hover:bg-gray-600 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl backdrop-blur-sm border-2 border-gray-500/50 min-w-[250px] overflow-hidden"
              >
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Partículas flotantes */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-2 left-4 w-2 h-2 bg-white/40 rounded-full animate-ping delay-100"></div>
                  <div className="absolute bottom-3 right-6 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-300"></div>
                  <div className="absolute top-1/2 right-4 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce delay-500"></div>
                </div>
                
                {/* Contenido del botón */}
                <div className="relative flex items-center justify-center gap-4">
                  <i className="fas fa-stop-circle text-2xl animate-pulse group-hover:animate-bounce"></i>
                  <span className="tracking-wider">DETENER EMERGENCIA</span>
                </div>
              </button>
            ) : (
              <>
                {/* Botón principal - Reportar Emergencia */}
                <button 
                  onClick={onTriggerEmergency}
                  className="group relative bg-red-600/95 hover:bg-red-500 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl backdrop-blur-sm border-2 border-red-400/50 min-w-[250px] overflow-hidden"
                >
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Partículas flotantes */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-2 left-4 w-2 h-2 bg-white/40 rounded-full animate-ping delay-100"></div>
                    <div className="absolute bottom-3 right-6 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-300"></div>
                    <div className="absolute top-1/2 right-4 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce delay-500"></div>
                  </div>
                  
                  {/* Contenido del botón */}
                  <div className="relative flex items-center justify-center gap-4">
                    <i className="fas fa-exclamation-triangle text-2xl animate-bounce group-hover:animate-pulse"></i>
                    <span className="tracking-wider">REPORTAR EMERGENCIA</span>
                  </div>
                </button>
                
                {/* Botón secundario - Simular */}
                <button 
                  onClick={onSimulateEmergency}
                  className="group relative bg-blue-600/95 hover:bg-blue-500 text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-110 hover:shadow-xl backdrop-blur-sm border-2 border-blue-400/50 overflow-hidden"
                >
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Contenido del botón */}
                  <div className="relative flex items-center justify-center gap-3">
                    <i className="fas fa-robot text-xl group-hover:animate-spin"></i>
                    <span>Simular Emergencia</span>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Información adicional mejorada si no hay emergencia */}
      {!isEmergencyActive && (
        <div className="mt-8 text-center">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-green-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-6 text-green-700">
              <div className="bg-green-100 rounded-2xl p-4">
                <i className="fas fa-info-circle text-3xl text-green-600"></i>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-xl mb-2 text-gray-800">Instrucciones de Emergencia</h3>
                <p className="font-medium leading-relaxed">
                  En caso de emergencia real, presiona el botón rojo. 
                  <br />
                  Usa "Simular Emergencia" solo para pruebas del sistema.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}