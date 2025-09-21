import { useState } from 'react';

interface ReportProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReport: (data: ReportData) => void;
}

interface ReportData {
  type: string;
  priority: 'low' | 'medium' | 'high';
  description: string;
  location?: string;
  photo?: File;
  timestamp: string;
}

const PROBLEM_TYPES = {
  behavior: {
    title: 'Comportamiento de la Mascota',
    icon: 'fas fa-paw',
    color: 'orange',
    description: 'Comportamiento inusual o problemático'
  },
  walker: {
    title: 'Problema con el Paseador',
    icon: 'fas fa-user-times',
    color: 'red',
    description: 'Incidentes relacionados con el servicio'
  },
  route: {
    title: 'Problema de Ruta',
    icon: 'fas fa-route',
    color: 'blue',
    description: 'Desvíos o problemas de ubicación'
  },
  safety: {
    title: 'Seguridad',
    icon: 'fas fa-shield-alt',
    color: 'purple',
    description: 'Situaciones de riesgo o peligro'
  },
  weather: {
    title: 'Condiciones Climáticas',
    icon: 'fas fa-cloud-rain',
    color: 'gray',
    description: 'Problemas relacionados con el clima'
  },
  other: {
    title: 'Otro Problema',
    icon: 'fas fa-exclamation-circle',
    color: 'yellow',
    description: 'Cualquier otro incidente'
  }
};

export default function ReportProblemModal({ isOpen, onClose, onReport }: ReportProblemModalProps) {
  const [selectedType, setSelectedType] = useState<string>('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedType || !description.trim()) return;

    setIsSubmitting(true);
    
    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 2000));

    const reportData: ReportData = {
      type: selectedType,
      priority,
      description: description.trim(),
      location: location.trim() || undefined,
      photo: photo || undefined,
      timestamp: new Date().toISOString()
    };

    onReport(reportData);
    
    // Reset form
    setSelectedType('');
    setPriority('medium');
    setDescription('');
    setLocation('');
    setPhoto(null);
    setStep(1);
    setIsSubmitting(false);
    onClose();
  };

  const canProceed = selectedType && description.trim().length >= 10;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-[slideInUp_0.3s_ease-out]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <i className="fas fa-flag text-2xl"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Reportar Problema</h2>
                <p className="text-white/90">Describe la situación para ayudarte mejor</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-4 flex gap-2">
            <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-white' : 'bg-white/30'}`}></div>
            <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-white' : 'bg-white/30'}`}></div>
            <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 3 ? 'bg-white' : 'bg-white/30'}`}></div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          
          {/* Step 1: Tipo de problema */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">¿Qué tipo de problema deseas reportar?</h3>
                <p className="text-gray-600">Selecciona la categoría que mejor describa la situación</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(PROBLEM_TYPES).map(([key, type]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedType(key)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                      selectedType === key
                        ? `border-${type.color}-400 bg-${type.color}-50 shadow-lg`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-${type.color}-100 rounded-xl flex items-center justify-center`}>
                        <i className={`${type.icon} text-${type.color}-600 text-xl`}></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{type.title}</h4>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </div>
                    {selectedType === key && (
                      <div className="mt-2 flex items-center gap-2 text-green-600">
                        <i className="fas fa-check-circle"></i>
                        <span className="text-sm font-medium">Seleccionado</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => selectedType && setStep(2)}
                  disabled={!selectedType}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  Continuar
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Detalles del problema */}
          {step === 2 && selectedType && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Detalles del Problema</h3>
                <p className="text-gray-600">Proporciona más información para resolver la situación</p>
              </div>

              {/* Problema seleccionado */}
              <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-${PROBLEM_TYPES[selectedType as keyof typeof PROBLEM_TYPES].color}-100 rounded-xl flex items-center justify-center`}>
                    <i className={`${PROBLEM_TYPES[selectedType as keyof typeof PROBLEM_TYPES].icon} text-${PROBLEM_TYPES[selectedType as keyof typeof PROBLEM_TYPES].color}-600`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{PROBLEM_TYPES[selectedType as keyof typeof PROBLEM_TYPES].title}</h4>
                    <p className="text-sm text-gray-600">{PROBLEM_TYPES[selectedType as keyof typeof PROBLEM_TYPES].description}</p>
                  </div>
                </div>
              </div>

              {/* Prioridad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Nivel de Prioridad</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['low', 'medium', 'high'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setPriority(level)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        priority === level
                          ? level === 'high' ? 'border-red-400 bg-red-50 text-red-700'
                            : level === 'medium' ? 'border-orange-400 bg-orange-50 text-orange-700'
                            : 'border-green-400 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                          level === 'high' ? 'bg-red-100' : level === 'medium' ? 'bg-orange-100' : 'bg-green-100'
                        }`}>
                          <i className={`fas ${level === 'high' ? 'fa-exclamation-triangle text-red-600' : level === 'medium' ? 'fa-exclamation-circle text-orange-600' : 'fa-info-circle text-green-600'}`}></i>
                        </div>
                        <p className="text-sm font-medium capitalize">{level === 'low' ? 'Baja' : level === 'medium' ? 'Media' : 'Alta'}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción del Problema *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe detalladamente qué ocurrió, cuándo y cualquier información relevante..."
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none resize-none h-32"
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500">Mínimo 10 caracteres</p>
                  <p className="text-sm text-gray-500">{description.length}/500</p>
                </div>
              </div>

              {/* Ubicación opcional */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación (opcional)</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej: Cerca del parque central, Calle 123..."
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-arrow-left"></i>
                  Atrás
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceed}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  Continuar
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmación y envío */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Confirmar Reporte</h3>
                <p className="text-gray-600">Revisa la información antes de enviar</p>
              </div>

              {/* Resumen */}
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-${PROBLEM_TYPES[selectedType as keyof typeof PROBLEM_TYPES].color}-100 rounded-xl flex items-center justify-center`}>
                    <i className={`${PROBLEM_TYPES[selectedType as keyof typeof PROBLEM_TYPES].icon} text-${PROBLEM_TYPES[selectedType as keyof typeof PROBLEM_TYPES].color}-600 text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{PROBLEM_TYPES[selectedType as keyof typeof PROBLEM_TYPES].title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        priority === 'high' ? 'bg-red-100 text-red-700' : 
                        priority === 'medium' ? 'bg-orange-100 text-orange-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        Prioridad {priority === 'low' ? 'Baja' : priority === 'medium' ? 'Media' : 'Alta'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Descripción:</h5>
                  <p className="text-gray-600 bg-white p-3 rounded-xl">{description}</p>
                </div>

                {location && (
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Ubicación:</h5>
                    <p className="text-gray-600 bg-white p-3 rounded-xl flex items-center gap-2">
                      <i className="fas fa-map-marker-alt text-red-500"></i>
                      {location}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <i className="fas fa-clock"></i>
                  <span>Timestamp: {new Date().toLocaleString()}</span>
                </div>
              </div>

              {/* Información del proceso */}
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <i className="fas fa-info-circle text-blue-600 mt-1"></i>
                  <div>
                    <h5 className="font-medium text-blue-800 mb-1">¿Qué pasará después?</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Recibirás una confirmación inmediata</li>
                      <li>• Nuestro equipo revisará tu reporte en los próximos 15 minutos</li>
                      <li>• Te contactaremos para seguimiento si es necesario</li>
                      <li>• Recibirás actualizaciones por notificación push</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-arrow-left"></i>
                  Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-medium transition-all flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner animate-spin"></i>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Enviar Reporte
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
