import type { EmergencyType } from '../types/emergencia.types';

interface EmergencyTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  emergencyTypes: Record<string, EmergencyType>;
  onSelectType: (type: string) => void;
}

export default function EmergencyTypeModal({ 
  isOpen, 
  onClose, 
  emergencyTypes, 
  onSelectType 
}: EmergencyTypeModalProps) {
  if (!isOpen) return null;

  const handleSelectType = (type: string) => {
    onSelectType(type);
    onClose();
  };

  // Configuración de colores y estilos para cada tipo de emergencia
  const emergencyConfig = {
    'desviacion-ruta': {
      gradient: 'from-blue-500 to-blue-700',
      hoverGradient: 'from-blue-400 to-blue-600',
      iconColor: 'text-blue-500',
      borderColor: 'border-blue-200 hover:border-blue-400',
      bgHover: 'hover:bg-blue-50',
      severity: 'medium'
    },
    'comportamiento-sospechoso': {
      gradient: 'from-orange-500 to-orange-700',
      hoverGradient: 'from-orange-400 to-orange-600',
      iconColor: 'text-orange-500',
      borderColor: 'border-orange-200 hover:border-orange-400',
      bgHover: 'hover:bg-orange-50',
      severity: 'medium'
    },
    'mascota-extraviada': {
      gradient: 'from-red-500 to-red-700',
      hoverGradient: 'from-red-400 to-red-600',
      iconColor: 'text-red-500',
      borderColor: 'border-red-200 hover:border-red-400',
      bgHover: 'hover:bg-red-50',
      severity: 'high'
    },
    'tiempo-excedido': {
      gradient: 'from-purple-500 to-purple-700',
      hoverGradient: 'from-purple-400 to-purple-600',
      iconColor: 'text-purple-500',
      borderColor: 'border-purple-200 hover:border-purple-400',
      bgHover: 'hover:bg-purple-50',
      severity: 'low'
    },
    'zona-peligrosa': {
      gradient: 'from-red-600 to-red-800',
      hoverGradient: 'from-red-500 to-red-700',
      iconColor: 'text-red-600',
      borderColor: 'border-red-300 hover:border-red-500',
      bgHover: 'hover:bg-red-50',
      severity: 'high'
    }
  };

  const getSeverityBadge = (severity: string) => {
    const badges = {
      'low': { text: 'Riesgo Bajo', class: 'bg-green-100 text-green-700 border-green-200' },
      'medium': { text: 'Riesgo Medio', class: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      'high': { text: 'Riesgo Alto', class: 'bg-red-100 text-red-700 border-red-200' }
    };
    return badges[severity as keyof typeof badges] || badges.medium;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center modal-overlay p-4 z-[9999]">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto emergency-modal shadow-2xl animate-scaleIn">
        {/* Header mejorado */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white p-8 rounded-t-3xl relative overflow-hidden">
          {/* Efectos de fondo */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
          
          <div className="relative flex justify-between items-center">
            <h2 className="text-3xl font-black flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <i className="fas fa-robot text-2xl"></i>
              </div>
              <span className="drop-shadow-lg">Simular Tipo de Emergencia</span>
            </h2>
            <button 
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <p className="mt-4 text-blue-100 font-medium text-lg drop-shadow-sm">
            Selecciona el tipo de emergencia que deseas simular para probar el sistema
          </p>
        </div>

        {/* Body mejorado */}
        <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(emergencyTypes).map(([key, emergency]) => {
              const config = emergencyConfig[key as keyof typeof emergencyConfig] || emergencyConfig['comportamiento-sospechoso'];
              const severityBadge = getSeverityBadge(config.severity);
              
              return (
                <button
                  key={key}
                  onClick={() => handleSelectType(key)}
                  className={`group relative p-6 border-3 ${config.borderColor} ${config.bgHover} rounded-3xl transition-all duration-500 text-left hover:-translate-y-2 hover:shadow-2xl transform overflow-hidden`}
                >
                  {/* Efecto de brillo en hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${config.hoverGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Partículas decorativas */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-current opacity-20 rounded-full animate-ping"></div>
                  <div className="absolute bottom-3 left-3 w-1 h-1 bg-current opacity-30 rounded-full animate-pulse delay-300"></div>
                  
                  <div className="relative">
                    {/* Badge de severidad */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold mb-4 ${severityBadge.class}`}>
                      <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                      {severityBadge.text}
                    </div>
                    
                    {/* Icono y título */}
                    <div className="text-center mb-4">
                      <div className="relative inline-block">
                        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
                        <div className="relative bg-white p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                          <i className={`${emergency.icon} text-4xl ${config.iconColor} group-hover:scale-110 transition-transform duration-300`}></i>
                        </div>
                      </div>
                      <h4 className="font-bold text-xl text-gray-800 mt-3 group-hover:text-gray-900 transition-colors duration-300">
                        {emergency.title}
                      </h4>
                    </div>
                    
                    {/* Descripción */}
                    <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {emergency.description}
                    </p>
                    
                    {/* Indicador de acción */}
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                      <i className="fas fa-mouse-pointer text-xs"></i>
                      <span>Click para simular</span>
                    </div>
                  </div>
                </button>
              );
            })}
            
            {/* Opciones adicionales mejoradas */}
            <button
              onClick={() => handleSelectType('tiempo-excedido')}
              className="group relative p-6 border-3 border-purple-200 hover:border-purple-400 hover:bg-purple-50 rounded-3xl transition-all duration-500 text-left hover:-translate-y-2 hover:shadow-2xl transform overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold mb-4 bg-yellow-100 text-yellow-700 border-yellow-200">
                  <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                  Riesgo Bajo
                </div>
                
                <div className="text-center mb-4">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="relative bg-white p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <i className="fas fa-clock text-4xl text-purple-500 group-hover:scale-110 transition-transform duration-300"></i>
                    </div>
                  </div>
                  <h4 className="font-bold text-xl text-gray-800 mt-3">Tiempo Excedido</h4>
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  Paseo dura más de lo acordado
                </p>
                
                <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                  <i className="fas fa-mouse-pointer text-xs"></i>
                  <span>Click para simular</span>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleSelectType('zona-peligrosa')}
              className="group relative p-6 border-3 border-red-300 hover:border-red-500 hover:bg-red-50 rounded-3xl transition-all duration-500 text-left hover:-translate-y-2 hover:shadow-2xl transform overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold mb-4 bg-red-100 text-red-700 border-red-200">
                  <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                  Riesgo Alto
                </div>
                
                <div className="text-center mb-4">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="relative bg-white p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <i className="fas fa-exclamation-triangle text-4xl text-red-600 group-hover:scale-110 transition-transform duration-300 animate-pulse"></i>
                    </div>
                  </div>
                  <h4 className="font-bold text-xl text-gray-800 mt-3">Zona Peligrosa</h4>
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  Ingreso a área no autorizada
                </p>
                
                <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                  <i className="fas fa-mouse-pointer text-xs"></i>
                  <span>Click para simular</span>
                </div>
              </div>
            </button>
          </div>
          
          {/* Información adicional */}
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                <i className="fas fa-info-circle text-blue-600 text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Información sobre las simulaciones</h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Las simulaciones son completamente seguras y solo afectan la interfaz de prueba. 
                  Úsalas para familiarizarte con el sistema de emergencias antes de situaciones reales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}