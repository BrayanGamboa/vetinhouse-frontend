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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-500 text-white p-6 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <i className="fas fa-robot"></i>
            Simular Tipo de Emergencia
          </h2>
          <button 
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors duration-300"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(emergencyTypes).map(([key, emergency]) => (
              <button
                key={key}
                onClick={() => handleSelectType(key)}
                className="p-5 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 rounded-2xl transition-all duration-300 text-left hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-center mb-3">
                  <i className={`${emergency.icon} text-3xl text-blue-500 mb-2`}></i>
                  <h4 className="font-semibold text-gray-800">{emergency.title}</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {emergency.description}
                </p>
              </button>
            ))}
            
            {/* Opciones adicionales */}
            <button
              onClick={() => handleSelectType('tiempo-excedido')}
              className="p-5 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 rounded-2xl transition-all duration-300 text-left hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-center mb-3">
                <i className="fas fa-clock text-3xl text-blue-500 mb-2"></i>
                <h4 className="font-semibold text-gray-800">Tiempo Excedido</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Paseo dura más de lo acordado
              </p>
            </button>

            <button
              onClick={() => handleSelectType('zona-peligrosa')}
              className="p-5 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 rounded-2xl transition-all duration-300 text-left hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-center mb-3">
                <i className="fas fa-exclamation-triangle text-3xl text-blue-500 mb-2"></i>
                <h4 className="font-semibold text-gray-800">Zona Peligrosa</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ingreso a área no autorizada
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}