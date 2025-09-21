import type { EmergencyType } from '../types/emergencia.types';

interface EmergencyModalProps {
  isOpen: boolean;
  emergency: EmergencyType | null;
  emergencyTimer: string;
  onCancel: () => void;
  onEmergencyCall: () => void;
}

export default function EmergencyModal({ 
  isOpen, 
  emergency, 
  emergencyTimer, 
  onCancel, 
  onEmergencyCall 
}: EmergencyModalProps) {
  if (!isOpen || !emergency) return null;

  const getSeverityClass = () => {
    switch (emergency.severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-orange-500 bg-orange-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  const getSeverityBadge = () => {
    switch (emergency.severity) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-orange-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  const getSeverityText = () => {
    switch (emergency.severity) {
      case 'high': return 'ALTA';
      case 'medium': return 'MEDIA';
      default: return 'BAJA';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center modal-overlay p-4 z-[9999]">
      <div className={`bg-white rounded-2xl w-full max-w-lg border-4 ${getSeverityClass()} emergency-modal`}>
        {/* Header */}
        <div className="bg-red-500 text-white p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <i className="fas fa-exclamation-triangle"></i>
            EMERGENCIA DETECTADA
          </h2>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-red-600 mb-2">{emergency.title}</h3>
              <p className="text-gray-700 leading-relaxed">{emergency.description}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getSeverityBadge()}`}>
              {getSeverityText()}
            </span>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Acciones tomadas automáticamente:</h4>
            <ul className="space-y-2">
              {emergency.actions.map((action, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <i className="fas fa-check text-green-500 w-4"></i>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
            <div className="text-3xl font-bold text-red-600 mb-2">{emergencyTimer}</div>
            <p className="text-gray-600">Tiempo desde la detección</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
          <button 
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-medium transition-colors duration-300"
          >
            Falsa Alarma
          </button>
          <button 
            onClick={onEmergencyCall}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors duration-300 flex items-center gap-2"
          >
            <i className="fas fa-phone"></i>
            Llamar Ahora
          </button>
        </div>
      </div>
    </div>
  );
}