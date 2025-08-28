import type { EmergencyType } from '../types/emergencia.types';

interface EmergencyStatusProps {
  isEmergencyActive: boolean;
  currentEmergency?: EmergencyType;
  onTriggerEmergency: () => void;
  onSimulateEmergency: () => void;
}

export default function EmergencyStatus({ 
  isEmergencyActive, 
  currentEmergency, 
  onTriggerEmergency, 
  onSimulateEmergency 
}: EmergencyStatusProps) {
  const getStatusClass = () => {
    if (!isEmergencyActive) return 'bg-gradient-to-br from-green-500 to-green-700';
    if (currentEmergency?.severity === 'high') return 'bg-gradient-to-br from-red-500 to-red-700 animate-pulse';
    return 'bg-gradient-to-br from-orange-500 to-orange-700';
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
    if (!isEmergencyActive) return { text: 'Riesgo: Bajo', class: 'bg-green-200 text-green-800' };
    if (currentEmergency?.severity === 'high') return { text: 'Riesgo: Alto', class: 'bg-red-200 text-red-800' };
    return { text: 'Riesgo: Medio', class: 'bg-orange-200 text-orange-800' };
  };

  const status = getStatusText();
  const risk = getRiskLevel();

  return (
    <div className={`${getStatusClass()} text-white p-8 mx-auto max-w-6xl rounded-2xl shadow-xl my-5 transition-all duration-300`}>
      <div className="flex items-center justify-between gap-5 flex-wrap">
        <div className="flex items-center gap-5">
          <div className="text-5xl">
            <i className={getStatusIcon()}></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">{status.title}</h3>
            <p className="text-lg opacity-90">{status.subtitle}</p>
            <div className="mt-3">
              <span className={`px-4 py-1 rounded-full text-sm font-medium ${risk.class}`}>
                {risk.text}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={onTriggerEmergency}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 hover:scale-105"
          >
            <i className="fas fa-exclamation-triangle"></i>
            REPORTAR EMERGENCIA
          </button>
          <button 
            onClick={onSimulateEmergency}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center gap-2"
          >
            <i className="fas fa-robot"></i>
            Simular Emergencia
          </button>
        </div>
      </div>
    </div>
  );
}