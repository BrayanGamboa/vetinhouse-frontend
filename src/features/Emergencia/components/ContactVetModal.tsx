import { useState } from 'react';

interface ContactVetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContact: (data: VetContactData) => void;
}

interface VetContactData {
  urgency: 'routine' | 'urgent' | 'emergency';
  symptoms: string[];
  description: string;
  petInfo: {
    age: string;
    weight: string;
    breed: string;
    lastVetVisit: string;
  };
  contactMethod: 'call' | 'video' | 'chat';
  timestamp: string;
}

const SYMPTOMS = {
  digestive: {
    title: 'Problemas Digestivos',
    icon: 'fas fa-stomach',
    options: ['Vómito', 'Diarrea', 'Falta de apetito', 'Dolor abdominal', 'Estreñimiento']
  },
  respiratory: {
    title: 'Problemas Respiratorios',
    icon: 'fas fa-lungs',
    options: ['Tos', 'Dificultad para respirar', 'Estornudos', 'Secreción nasal', 'Respiración rápida']
  },
  behavior: {
    title: 'Cambios de Comportamiento',
    icon: 'fas fa-brain',
    options: ['Letargo', 'Agresividad', 'Desorientación', 'Ansiedad', 'Temblores']
  },
  physical: {
    title: 'Síntomas Físicos',
    icon: 'fas fa-heartbeat',
    options: ['Cojera', 'Hinchazón', 'Heridas', 'Picazón excesiva', 'Pérdida de pelo']
  },
  emergency: {
    title: 'Síntomas de Emergencia',
    icon: 'fas fa-exclamation-triangle',
    options: ['Convulsiones', 'Pérdida de conciencia', 'Sangrado abundante', 'Intoxicación', 'Golpe de calor']
  }
};

const VETERINARIANS = [
  {
    id: 1,
    name: 'Dr. María González',
    specialty: 'Medicina General',
    rating: 4.9,
    experience: '8 años',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    availability: 'Disponible ahora',
    responseTime: '5-10 min'
  },
  {
    id: 2,
    name: 'Dr. Carlos Ruiz',
    specialty: 'Emergencias',
    rating: 4.8,
    experience: '12 años',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    availability: 'Disponible ahora',
    responseTime: '2-5 min'
  },
  {
    id: 3,
    name: 'Dra. Ana Martín',
    specialty: 'Comportamiento Animal',
    rating: 4.7,
    experience: '6 años',
    image: 'https://images.unsplash.com/photo-1594824375887-87a5c6ee5d87?w=400&h=400&fit=crop&crop=face',
    availability: 'Ocupada - 15 min',
    responseTime: '15-20 min'
  }
];

export default function ContactVetModal({ isOpen, onClose, onContact }: ContactVetModalProps) {
  const [urgency, setUrgency] = useState<'routine' | 'urgent' | 'emergency'>('routine');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [petInfo, setPetInfo] = useState({
    age: '',
    weight: '',
    breed: '',
    lastVetVisit: ''
  });
  const [contactMethod, setContactMethod] = useState<'call' | 'video' | 'chat'>('video');
  const [selectedVet, setSelectedVet] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async () => {
    if (!description.trim() || selectedSymptoms.length === 0) return;

    setIsSubmitting(true);
    
    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 2000));

    const contactData: VetContactData = {
      urgency,
      symptoms: selectedSymptoms,
      description: description.trim(),
      petInfo,
      contactMethod,
      timestamp: new Date().toISOString()
    };

    onContact(contactData);
    
    // Reset form
    setUrgency('routine');
    setSelectedSymptoms([]);
    setDescription('');
    setPetInfo({ age: '', weight: '', breed: '', lastVetVisit: '' });
    setContactMethod('video');
    setSelectedVet(null);
    setStep(1);
    setIsSubmitting(false);
    onClose();
  };

  const canProceed = selectedSymptoms.length > 0 && description.trim().length >= 10;
  const urgencyColor = urgency === 'emergency' ? 'red' : urgency === 'urgent' ? 'orange' : 'green';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-[slideInUp_0.3s_ease-out]">
        
        {/* Header */}
        <div className={`bg-gradient-to-r from-${urgencyColor}-500 to-${urgencyColor}-600 p-6 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <i className="fas fa-user-md text-2xl"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Contactar Veterinario</h2>
                <p className="text-white/90">Consulta médica especializada para tu mascota</p>
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
            <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 4 ? 'bg-white' : 'bg-white/30'}`}></div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          
          {/* Step 1: Urgencia */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">¿Qué tan urgente es la situación?</h3>
                <p className="text-gray-600">Esto nos ayuda a priorizar tu consulta</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['routine', 'urgent', 'emergency'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setUrgency(level)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      urgency === level
                        ? level === 'emergency' ? 'border-red-400 bg-red-50 shadow-lg'
                          : level === 'urgent' ? 'border-orange-400 bg-orange-50 shadow-lg'
                          : 'border-green-400 bg-green-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                        level === 'emergency' ? 'bg-red-100' : level === 'urgent' ? 'bg-orange-100' : 'bg-green-100'
                      }`}>
                        <i className={`fas text-2xl ${
                          level === 'emergency' ? 'fa-ambulance text-red-600' 
                          : level === 'urgent' ? 'fa-clock text-orange-600' 
                          : 'fa-calendar-check text-green-600'
                        }`}></i>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">
                        {level === 'routine' ? 'Consulta de Rutina' : level === 'urgent' ? 'Urgente' : 'Emergencia'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {level === 'routine' ? 'Consulta general, chequeo o dudas' 
                         : level === 'urgent' ? 'Síntomas preocupantes que requieren atención pronto'
                         : 'Situación crítica que requiere atención inmediata'}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {level === 'routine' ? 'Respuesta en 30-60 min' 
                         : level === 'urgent' ? 'Respuesta en 10-15 min'
                         : 'Respuesta inmediata'}
                      </p>
                    </div>
                    {urgency === level && (
                      <div className="mt-3 flex items-center justify-center gap-2 text-green-600">
                        <i className="fas fa-check-circle"></i>
                        <span className="text-sm font-medium">Seleccionado</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className={`px-6 py-3 bg-${urgencyColor}-500 hover:bg-${urgencyColor}-600 text-white rounded-xl font-medium transition-colors flex items-center gap-2`}
                >
                  Continuar
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Síntomas */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">¿Qué síntomas presenta tu mascota?</h3>
                <p className="text-gray-600">Selecciona todos los síntomas que observes</p>
              </div>

              <div className="space-y-4">
                {Object.entries(SYMPTOMS).map(([category, data]) => (
                  <div key={category} className="bg-gray-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <i className={`${data.icon} text-blue-600`}></i>
                      {data.title}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {data.options.map((symptom) => (
                        <button
                          key={symptom}
                          onClick={() => toggleSymptom(symptom)}
                          className={`p-3 rounded-xl border text-sm transition-all ${
                            selectedSymptoms.includes(symptom)
                              ? 'border-blue-400 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {symptom}
                          {selectedSymptoms.includes(symptom) && (
                            <i className="fas fa-check ml-2"></i>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {selectedSymptoms.length > 0 && (
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">Síntomas seleccionados:</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map((symptom) => (
                      <span key={symptom} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              )}

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
                  disabled={selectedSymptoms.length === 0}
                  className={`px-6 py-3 bg-${urgencyColor}-500 hover:bg-${urgencyColor}-600 disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors flex items-center gap-2`}
                >
                  Continuar
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Información de la mascota */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Información de tu Mascota</h3>
                <p className="text-gray-600">Ayúdanos a conocer mejor a tu mascota</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Edad aproximada</label>
                  <input
                    type="text"
                    value={petInfo.age}
                    onChange={(e) => setPetInfo(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="Ej: 3 años, 6 meses"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Peso aproximado</label>
                  <input
                    type="text"
                    value={petInfo.weight}
                    onChange={(e) => setPetInfo(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="Ej: 15 kg, 3.5 kg"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Raza</label>
                  <input
                    type="text"
                    value={petInfo.breed}
                    onChange={(e) => setPetInfo(prev => ({ ...prev, breed: e.target.value }))}
                    placeholder="Ej: Golden Retriever, Mestizo"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Última visita al veterinario</label>
                  <input
                    type="text"
                    value={petInfo.lastVetVisit}
                    onChange={(e) => setPetInfo(prev => ({ ...prev, lastVetVisit: e.target.value }))}
                    placeholder="Ej: Hace 2 meses, Hace 1 año"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción detallada *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe los síntomas, cuándo comenzaron, comportamiento actual, cualquier detalle relevante..."
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none h-32"
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500">Mínimo 10 caracteres</p>
                  <p className="text-sm text-gray-500">{description.length}/500</p>
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
                  onClick={() => setStep(4)}
                  disabled={!canProceed}
                  className={`px-6 py-3 bg-${urgencyColor}-500 hover:bg-${urgencyColor}-600 disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors flex items-center gap-2`}
                >
                  Continuar
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Seleccionar veterinario y método de contacto */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Veterinarios Disponibles</h3>
                <p className="text-gray-600">Selecciona un veterinario y método de consulta</p>
              </div>

              {/* Método de contacto */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Método de Consulta</h4>
                <div className="grid grid-cols-3 gap-3">
                  {(['call', 'video', 'chat'] as const).map((method) => (
                    <button
                      key={method}
                      onClick={() => setContactMethod(method)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        contactMethod === method
                          ? 'border-blue-400 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <i className={`fas text-2xl mb-2 ${
                          method === 'call' ? 'fa-phone text-green-600'
                          : method === 'video' ? 'fa-video text-blue-600'
                          : 'fa-comments text-purple-600'
                        }`}></i>
                        <p className="font-medium text-gray-800">
                          {method === 'call' ? 'Llamada' : method === 'video' ? 'Videollamada' : 'Chat'}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Veterinarios */}
              <div className="space-y-3">
                {VETERINARIANS.map((vet) => (
                  <button
                    key={vet.id}
                    onClick={() => setSelectedVet(vet.id)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left hover:scale-[1.02] ${
                      selectedVet === vet.id
                        ? 'border-blue-400 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={vet.image} 
                        alt={vet.name}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-bold text-gray-800">{vet.name}</h5>
                          <div className="flex items-center gap-1">
                            <i className="fas fa-star text-yellow-500 text-sm"></i>
                            <span className="text-sm text-gray-600">{vet.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-blue-600 font-medium">{vet.specialty}</p>
                        <p className="text-xs text-gray-500">{vet.experience} de experiencia</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            vet.availability.includes('Disponible') 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {vet.availability}
                          </span>
                          <span className="text-xs text-gray-500">
                            Respuesta: {vet.responseTime}
                          </span>
                        </div>
                      </div>
                      {selectedVet === vet.id && (
                        <i className="fas fa-check-circle text-blue-600 text-xl"></i>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-arrow-left"></i>
                  Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !selectedVet}
                  className={`px-8 py-3 bg-gradient-to-r from-${urgencyColor}-500 to-${urgencyColor}-600 hover:from-${urgencyColor}-600 hover:to-${urgencyColor}-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-medium transition-all flex items-center gap-2`}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner animate-spin"></i>
                      Conectando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-md"></i>
                      Contactar Veterinario
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
