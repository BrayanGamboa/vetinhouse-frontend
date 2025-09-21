import { useState } from 'react';

interface ReportEmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReport: (type: string, description: string, priority: 'low' | 'medium' | 'high') => void;
}

export default function ReportEmergencyModal({ 
  isOpen, 
  onClose, 
  onReport 
}: ReportEmergencyModalProps) {
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const emergencyTypes = [
    { id: 'animal-perdido', title: 'Animal Perdido', icon: 'fas fa-search', color: 'text-red-500' },
    { id: 'animal-herido', title: 'Animal Herido', icon: 'fas fa-band-aid', color: 'text-red-600' },
    { id: 'paseador-no-responde', title: 'Paseador No Responde', icon: 'fas fa-phone-slash', color: 'text-orange-500' },
    { id: 'comportamiento-extrano', title: 'Comportamiento Extraño', icon: 'fas fa-exclamation-circle', color: 'text-yellow-500' },
    { id: 'accidente', title: 'Accidente', icon: 'fas fa-car-crash', color: 'text-red-700' },
    { id: 'robo', title: 'Robo/Secuestro', icon: 'fas fa-user-ninja', color: 'text-purple-600' },
    { id: 'clima-adverso', title: 'Clima Adverso', icon: 'fas fa-cloud-rain', color: 'text-blue-500' },
    { id: 'otro', title: 'Otro', icon: 'fas fa-ellipsis-h', color: 'text-gray-500' }
  ];

  const priorityColors = {
    low: 'bg-green-500 border-green-600',
    medium: 'bg-orange-500 border-orange-600', 
    high: 'bg-red-500 border-red-600'
  };

  const handleSubmit = async () => {
    if (!selectedType || !description.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulación de envío
    setTimeout(() => {
      onReport(selectedType, description, priority);
      setIsSubmitting(false);
      setSelectedType('');
      setDescription('');
      setPriority('medium');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center modal-overlay p-4 backdrop-blur-sm z-[9999]">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-200 emergency-modal">
        
        {/* Header animado */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-red-400/30 animate-pulse"></div>
          <div className="relative flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <i className="fas fa-exclamation-triangle text-2xl animate-bounce"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Reportar Emergencia</h2>
                <p className="text-red-100">Describe la situación con tu mascota</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 flex items-center justify-center hover:scale-110"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          
          {/* Selección de tipo */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-list text-red-500"></i>
              Tipo de Emergencia
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {emergencyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 text-center hover:scale-105 hover:shadow-lg ${
                    selectedType === type.id 
                      ? 'border-red-500 bg-red-50 shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                  }`}
                >
                  <i className={`${type.icon} text-2xl ${selectedType === type.id ? 'text-red-500' : type.color} mb-2`}></i>
                  <div className={`font-medium text-sm ${selectedType === type.id ? 'text-red-700' : 'text-gray-700'}`}>
                    {type.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Nivel de prioridad */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-exclamation text-orange-500"></i>
              Nivel de Urgencia
            </h3>
            <div className="flex gap-4">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setPriority(level)}
                  className={`flex-1 p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    priority === level 
                      ? `${priorityColors[level]} text-white shadow-lg scale-105` 
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="text-center">
                    <i className={`fas fa-exclamation-circle text-2xl mb-2 ${
                      priority === level ? 'text-white' : 'text-gray-400'
                    }`}></i>
                    <div className={`font-bold ${priority === level ? 'text-white' : 'text-gray-700'}`}>
                      {level === 'low' ? 'BAJA' : level === 'medium' ? 'MEDIA' : 'ALTA'}
                    </div>
                    <div className={`text-sm ${priority === level ? 'text-white/90' : 'text-gray-500'}`}>
                      {level === 'low' ? 'No urgente' : level === 'medium' ? 'Atención pronto' : 'INMEDIATA'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Descripción */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-edit text-blue-500"></i>
              Descripción Detallada
            </h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe exactamente qué está pasando con tu mascota, dónde ocurrió, y cualquier detalle importante..."
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl resize-none focus:border-blue-500 focus:outline-none transition-colors duration-300 text-gray-700"
              maxLength={500}
            />
            <div className="text-right text-sm text-gray-500 mt-2">
              {description.length}/500 caracteres
            </div>
          </div>

          {/* Información automática */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
              <i className="fas fa-info-circle"></i>
              Información que se enviará automáticamente:
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Ubicación GPS actual</li>
              <li>• Hora exacta del reporte</li>
              <li>• Datos del paseador asignado</li>
              <li>• Información de tu mascota</li>
              <li>• Tus datos de contacto</li>
            </ul>
          </div>
        </div>

        {/* Footer con botones */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-3xl">
          <div className="flex gap-4 justify-end">
            <button 
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2"
            >
              <i className="fas fa-times"></i>
              Cancelar
            </button>
            <button 
              onClick={handleSubmit}
              disabled={!selectedType || !description.trim() || isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-2xl font-bold transition-all duration-300 flex items-center gap-2 hover:scale-105 disabled:scale-100 shadow-lg disabled:shadow-none"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner animate-spin"></i>
                  Enviando...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  Reportar Emergencia
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
