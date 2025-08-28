import { useState } from 'react';
import { Link } from 'react-router';

export default function PaseadorView() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    experiencia: '',
    motivacion: '',
    disponibilidad: '',
    transporte: '',
    terminos: false
  });

  const steps = [
    { id: 1, title: 'Personal', icon: 'fas fa-user' },
    { id: 2, title: 'Experiencia', icon: 'fas fa-briefcase' },
    { id: 3, title: 'Disponibilidad', icon: 'fas fa-clock' },
    { id: 4, title: 'Finalizar', icon: 'fas fa-check-circle' }
  ];

  const isStepCompleted = (stepId: number) => {
    switch (stepId) {
      case 1: return formData.nombre && formData.email && formData.telefono;
      case 2: return formData.experiencia && formData.motivacion;
      case 3: return formData.disponibilidad && formData.transporte;
      case 4: return true;
      default: return false;
    }
  };

  const canAccessStep = (stepId: number) => {
    for (let i = 1; i < stepId; i++) {
      if (!isStepCompleted(i)) return false;
    }
    return true;
  };

  const validateStep = (step: number) => {
    const newErrors: string[] = [];
    switch (step) {
      case 1:
        if (!formData.nombre) newErrors.push('Nombre es obligatorio');
        if (!formData.email) newErrors.push('Email es obligatorio');
        if (!formData.telefono) newErrors.push('Teléfono es obligatorio');
        break;
      case 2:
        if (!formData.experiencia) newErrors.push('Experiencia es obligatoria');
        if (!formData.motivacion) newErrors.push('Motivación es obligatoria');
        break;
      case 3:
        if (!formData.disponibilidad) newErrors.push('Disponibilidad es obligatoria');
        if (!formData.transporte) newErrors.push('Transporte es obligatorio');
        break;
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors([]);
    }
  };

  const goToStep = (stepId: number) => {
    if (canAccessStep(stepId)) {
      setCurrentStep(stepId);
      setErrors([]);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors.length > 0) setErrors([]);
  };

  const handleSubmit = async () => {
    if (!formData.terminos) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => window.location.href = '/home', 3000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check text-3xl text-green-600"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Solicitud Enviada!</h2>
          <p className="text-gray-600 mb-6">Te contactaremos pronto para continuar con el proceso.</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Información Personal</h2>
              <p className="text-gray-600">Cuéntanos sobre ti</p>
            </div>
            
            <input 
              type="text" 
              value={formData.nombre}
              onChange={(e) => updateFormData('nombre', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="Nombre completo"
            />

            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="Correo electrónico"
            />

            <input 
              type="tel" 
              value={formData.telefono}
              onChange={(e) => updateFormData('telefono', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="Teléfono"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Experiencia</h2>
              <p className="text-gray-600">Tu experiencia con mascotas</p>
            </div>
            
            <input 
              type="number" 
              min="0"
              value={formData.experiencia}
              onChange={(e) => updateFormData('experiencia', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="Años de experiencia"
            />

            <textarea 
              rows={4}
              value={formData.motivacion}
              onChange={(e) => updateFormData('motivacion', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 resize-none"
              placeholder="¿Por qué quieres ser paseador?"
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Disponibilidad</h2>
              <p className="text-gray-600">Cuándo puedes trabajar</p>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-3">¿Cuándo puedes pasear?</label>
              <div className="space-y-2">
                {['Lunes a Viernes', 'Fines de Semana', 'Todos los días'].map(option => (
                  <label key={option} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.disponibilidad === option ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-300'
                  }`}>
                    <input
                      type="radio"
                      name="disponibilidad"
                      value={option}
                      checked={formData.disponibilidad === option}
                      onChange={(e) => updateFormData('disponibilidad', e.target.value)}
                      className="mr-3 text-green-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-3">¿Tienes transporte propio?</label>
              <div className="grid grid-cols-2 gap-3">
                {['Sí', 'No'].map(option => (
                  <label key={option} className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.transporte === option ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-300'
                  }`}>
                    <input
                      type="radio"
                      name="transporte"
                      value={option}
                      checked={formData.transporte === option}
                      onChange={(e) => updateFormData('transporte', e.target.value)}
                      className="mr-2 text-green-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Casi Terminamos!</h2>
              <p className="text-gray-600">Revisa tu información</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-left space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Nombre:</span>
                <span className="font-medium">{formData.nombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Experiencia:</span>
                <span className="font-medium">{formData.experiencia} años</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Disponibilidad:</span>
                <span className="font-medium">{formData.disponibilidad}</span>
              </div>
            </div>

            <label className="flex items-center justify-center gap-3 p-4 border rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.terminos}
                onChange={(e) => updateFormData('terminos', e.target.checked)}
                className="text-green-600"
              />
              <span className="text-gray-700">Acepto los términos y condiciones</span>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/home" className="flex items-center gap-2 text-green-600 hover:text-green-700">
            <i className="fas fa-dog text-xl"></i>
            <span className="text-xl font-bold">VetInHouse</span>
          </Link>
          <Link to="/home" className="text-gray-600 hover:text-gray-800">
            <i className="fas fa-home mr-2"></i>
            Volver
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <button
                  onClick={() => goToStep(step.id)}
                  disabled={!canAccessStep(step.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                    step.id === currentStep 
                      ? 'bg-green-500 text-white' 
                      : canAccessStep(step.id)
                      ? 'bg-white border-2 border-green-500 text-green-500 hover:bg-green-50'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <i className={step.icon}></i>
                </button>
                <span className={`text-xs font-medium ${
                  step.id === currentStep ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {/* Errors */}
          {errors.length > 0 && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <i className="fas fa-exclamation-triangle text-red-500 mr-2"></i>
                <h4 className="font-medium text-red-700">Por favor corrige:</h4>
              </div>
              <ul className="text-sm text-red-600 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Anterior
          </button>

          {currentStep === 4 ? (
            <button
              onClick={handleSubmit}
              disabled={!formData.terminos || isSubmitting}
              className="px-8 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Enviando...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane mr-2"></i>
                  Enviar Solicitud
                </>
              )}
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Siguiente
              <i className="fas fa-arrow-right ml-2"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}