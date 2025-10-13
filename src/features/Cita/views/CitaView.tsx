import { useState } from 'react';
import MainLayout from '../../../core/layouts/MainLayout';

interface CitaData {
  // Paso 1: Información del propietario
  nombrePropietario: string;
  telefono: string;
  email: string;
  
  // Paso 2: Información de la mascota
  nombreMascota: string;
  tipoMascota: string;
  raza: string;
  edad: string;
  peso: string;
  
  // Paso 3: Tipo de servicio
  tipoServicio: string;
  
  // Paso 4: Fecha y hora
  fecha: string;
  hora: string;
  
  // Paso 5: Ubicación y detalles
  direccion: string;
  ciudad: string;
  referencia: string;
  observaciones: string;
}

export default function CitaView() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<CitaData>({
    nombrePropietario: '',
    telefono: '',
    email: '',
    nombreMascota: '',
    tipoMascota: '',
    raza: '',
    edad: '',
    peso: '',
    tipoServicio: '',
    fecha: '',
    hora: '',
    direccion: '',
    ciudad: '',
    referencia: '',
    observaciones: ''
  });

  const totalSteps = 5;

  const updateFormData = (field: keyof CitaData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.nombrePropietario && formData.telefono && formData.email;
      case 2:
        return formData.nombreMascota && formData.tipoMascota && formData.edad;
      case 3:
        return formData.tipoServicio;
      case 4:
        return formData.fecha && formData.hora;
      case 5:
        return formData.direccion && formData.ciudad;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (isStepValid() && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío de datos
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Guardar la cita en localStorage
    const cita = {
      ...formData,
      id: Date.now().toString(),
      fechaCreacion: new Date().toISOString(),
      estado: 'Pendiente'
    };
    
    const citasGuardadas = localStorage.getItem('citas');
    const citas = citasGuardadas ? JSON.parse(citasGuardadas) : [];
    citas.push(cita);
    localStorage.setItem('citas', JSON.stringify(citas));
    
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const resetForm = () => {
    setFormData({
      nombrePropietario: '',
      telefono: '',
      email: '',
      nombreMascota: '',
      tipoMascota: '',
      raza: '',
      edad: '',
      peso: '',
      tipoServicio: '',
      fecha: '',
      hora: '',
      direccion: '',
      ciudad: '',
      referencia: '',
      observaciones: ''
    });
    setStep(1);
    setShowSuccess(false);
  };

  // Modal de éxito
  if (showSuccess) {
    return (
      <MainLayout title="Cita Agendada" showBackgroundEffects={false}>
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-3xl shadow-2xl p-8 text-center transform animate-[scaleIn_0.5s_ease-out]">
              {/* Icono de éxito animado */}
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-[bounce_1s_ease-in-out]">
                <i className="fas fa-check-circle text-5xl text-green-500"></i>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                ¡Cita Agendada Exitosamente!
              </h2>
              
              <p className="text-gray-600 mb-6">
                Hemos recibido tu solicitud de cita para <strong>{formData.nombreMascota}</strong>.
                Te contactaremos pronto al <strong>{formData.telefono}</strong> para confirmar los detalles.
              </p>
              
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <i className="fas fa-calendar-alt text-green-600 text-xl mt-1"></i>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Fecha solicitada:</p>
                    <p className="text-gray-700">
                      {new Date(formData.fecha).toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} a las {formData.hora}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <i className="fas fa-info-circle text-blue-600 text-xl mt-1"></i>
                  <div className="text-left">
                    <p className="text-sm text-blue-800">
                      Recibirás un correo de confirmación en <strong>{formData.email}</strong> con todos los detalles de tu cita.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={resetForm}
                  className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Nueva Cita
                </button>
                <a
                  href="/consultar-cita"
                  className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-center"
                >
                  <i className="fas fa-clipboard-list mr-2"></i>
                  Ver Mis Citas
                </a>
                <button
                  onClick={() => window.location.href = '/home'}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                >
                  <i className="fas fa-home mr-2"></i>
                  Inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Agendar Cita Veterinaria" showBackgroundEffects={false}>
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-5">
          
          {/* Header con progreso */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">Agendar Cita Veterinaria</h1>
                  <p className="text-green-100 text-sm">Paso {step} de {totalSteps}</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <i className="fas fa-paw text-3xl"></i>
                </div>
              </div>
              
              {/* Barra de progreso */}
              <div className="relative w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="absolute h-full bg-white rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
              
              {/* Indicadores de pasos */}
              <div className="flex justify-between mt-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      s < step ? 'bg-white text-green-600' :
                      s === step ? 'bg-white text-green-600 ring-4 ring-white/30 scale-110' :
                      'bg-white/20 text-white/60'
                    }`}>
                      {s < step ? <i className="fas fa-check"></i> : s}
                    </div>
                    <span className="text-xs mt-1 text-white/80 hidden sm:block">
                      {s === 1 ? 'Propietario' :
                       s === 2 ? 'Mascota' :
                       s === 3 ? 'Servicio' :
                       s === 4 ? 'Fecha' : 'Ubicación'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Formulario por pasos */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            
            {/* Paso 1: Información del propietario */}
            {step === 1 && (
              <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-user text-3xl text-green-600"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Información del Propietario</h2>
                  <p className="text-gray-600 mt-2">Empecemos con tus datos de contacto</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-user text-green-500 mr-2"></i>
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      value={formData.nombrePropietario}
                      onChange={(e) => updateFormData('nombrePropietario', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-phone text-green-500 mr-2"></i>
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => updateFormData('telefono', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      placeholder="+57 300 123 4567"
                      required
                    />
                  </div>
                </div>

                <div className="transform transition-all duration-300 hover:scale-105">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="fas fa-envelope text-green-500 mr-2"></i>
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>
              </div>
            )}

            {/* Paso 2: Información de la mascota */}
            {step === 2 && (
              <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-paw text-3xl text-blue-600"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Información de la Mascota</h2>
                  <p className="text-gray-600 mt-2">Cuéntanos sobre tu compañero peludo</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-tag text-blue-500 mr-2"></i>
                      Nombre de la Mascota *
                    </label>
                    <input
                      type="text"
                      value={formData.nombreMascota}
                      onChange={(e) => updateFormData('nombreMascota', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Max"
                      required
                    />
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-dog text-blue-500 mr-2"></i>
                      Tipo de Mascota *
                    </label>
                    <select
                      value={formData.tipoMascota}
                      onChange={(e) => updateFormData('tipoMascota', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      <option value="perro">🐕 Perro</option>
                      <option value="gato">🐱 Gato</option>
                      <option value="ave">🦜 Ave</option>
                      <option value="conejo">🐰 Conejo</option>
                      <option value="hamster">🐹 Hámster</option>
                      <option value="otro">🐾 Otro</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-list text-blue-500 mr-2"></i>
                      Raza
                    </label>
                    <input
                      type="text"
                      value={formData.raza}
                      onChange={(e) => updateFormData('raza', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Golden Retriever"
                    />
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-birthday-cake text-blue-500 mr-2"></i>
                      Edad *
                    </label>
                    <input
                      type="text"
                      value={formData.edad}
                      onChange={(e) => updateFormData('edad', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="3 años"
                      required
                    />
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-weight text-blue-500 mr-2"></i>
                      Peso
                    </label>
                    <input
                      type="text"
                      value={formData.peso}
                      onChange={(e) => updateFormData('peso', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="15 kg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Paso 3: Tipo de servicio */}
            {step === 3 && (
              <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-stethoscope text-3xl text-purple-600"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Tipo de Servicio</h2>
                  <p className="text-gray-600 mt-2">¿Qué tipo de atención necesitas?</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { value: 'consulta', icon: 'fa-clipboard-list', title: 'Consulta General', desc: 'Revisión de rutina y diagnóstico', color: 'green' },
                    { value: 'vacunacion', icon: 'fa-syringe', title: 'Vacunación', desc: 'Aplicación de vacunas y refuerzos', color: 'blue' },
                    { value: 'urgencia', icon: 'fa-ambulance', title: 'Urgencia', desc: 'Atención médica urgente', color: 'red' },
                    { value: 'control', icon: 'fa-heartbeat', title: 'Control', desc: 'Seguimiento y control veterinario', color: 'orange' },
                    { value: 'cirugia', icon: 'fa-user-md', title: 'Cirugía', desc: 'Procedimientos quirúrgicos menores', color: 'indigo' },
                    { value: 'otros', icon: 'fa-ellipsis-h', title: 'Otros', desc: 'Otro tipo de servicio', color: 'gray' }
                  ].map((service) => (
                    <label
                      key={service.value}
                      className={`relative flex items-start p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        formData.tipoServicio === service.value
                          ? `border-${service.color}-500 bg-${service.color}-50 shadow-md`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="tipoServicio"
                        value={service.value}
                        checked={formData.tipoServicio === service.value}
                        onChange={(e) => updateFormData('tipoServicio', e.target.value)}
                        className="sr-only"
                        required
                      />
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                        formData.tipoServicio === service.value
                          ? `bg-${service.color}-500 text-white`
                          : `bg-${service.color}-100 text-${service.color}-600`
                      }`}>
                        <i className={`fas ${service.icon} text-xl`}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1">{service.title}</h3>
                        <p className="text-sm text-gray-600">{service.desc}</p>
                      </div>
                      {formData.tipoServicio === service.value && (
                        <i className={`fas fa-check-circle text-${service.color}-500 text-xl absolute top-3 right-3`}></i>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Paso 4: Fecha y hora */}
            {step === 4 && (
              <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-calendar-alt text-3xl text-orange-600"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Fecha y Hora</h2>
                  <p className="text-gray-600 mt-2">¿Cuándo te gustaría agendar la cita?</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-calendar text-orange-500 mr-2"></i>
                      Fecha Preferida *
                    </label>
                    <input
                      type="date"
                      value={formData.fecha}
                      onChange={(e) => updateFormData('fecha', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      required
                    />
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-clock text-orange-500 mr-2"></i>
                      Hora Preferida *
                    </label>
                    <select
                      value={formData.hora}
                      onChange={(e) => updateFormData('hora', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      required
                    >
                      <option value="">Seleccionar hora...</option>
                      <option value="08:00">08:00 AM</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-info-circle text-orange-600 text-xl mt-1"></i>
                    <div>
                      <p className="font-semibold text-orange-800 mb-1">Horario de atención</p>
                      <p className="text-sm text-orange-700">
                        Lunes a viernes: 8:00 AM - 5:00 PM<br />
                        Sábados: 8:00 AM - 12:00 PM<br />
                        Domingos y festivos: Cerrado
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Paso 5: Ubicación y detalles */}
            {step === 5 && (
              <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-map-marker-alt text-3xl text-red-600"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Ubicación y Detalles</h2>
                  <p className="text-gray-600 mt-2">Información final para completar tu cita</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-city text-red-500 mr-2"></i>
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      value={formData.ciudad}
                      onChange={(e) => updateFormData('ciudad', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="Medellín"
                      required
                    />
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-map-pin text-red-500 mr-2"></i>
                      Referencia
                    </label>
                    <input
                      type="text"
                      value={formData.referencia}
                      onChange={(e) => updateFormData('referencia', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="Cerca del parque"
                    />
                  </div>
                </div>

                <div className="transform transition-all duration-300 hover:scale-105">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="fas fa-home text-red-500 mr-2"></i>
                    Dirección Completa *
                  </label>
                  <textarea
                    value={formData.direccion}
                    onChange={(e) => updateFormData('direccion', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                    placeholder="Calle 123 #45-67, Barrio El Poblado"
                    required
                  ></textarea>
                </div>

                <div className="transform transition-all duration-300 hover:scale-105">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="fas fa-comment-medical text-red-500 mr-2"></i>
                    Observaciones Adicionales
                  </label>
                  <textarea
                    value={formData.observaciones}
                    onChange={(e) => updateFormData('observaciones', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                    placeholder="Describe los síntomas, comportamiento o cualquier información relevante sobre tu mascota..."
                  ></textarea>
                </div>

                {/* Resumen de la cita */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="font-bold text-green-800 text-lg mb-4 flex items-center gap-2">
                    <i className="fas fa-clipboard-check"></i>
                    Resumen de tu Cita
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Propietario:</span>
                      <span className="font-semibold text-gray-800">{formData.nombrePropietario}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mascota:</span>
                      <span className="font-semibold text-gray-800">{formData.nombreMascota} ({formData.tipoMascota})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Servicio:</span>
                      <span className="font-semibold text-gray-800 capitalize">{formData.tipoServicio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fecha:</span>
                      <span className="font-semibold text-gray-800">
                        {new Date(formData.fecha).toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hora:</span>
                      <span className="font-semibold text-gray-800">{formData.hora}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ubicación:</span>
                      <span className="font-semibold text-gray-800">{formData.ciudad}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Botones de navegación */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <i className="fas fa-arrow-left"></i>
                  Anterior
                </button>
              )}
              
              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isStepValid()
                      ? 'bg-green-500 text-white hover:bg-green-600 hover:-translate-y-1 hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Siguiente
                  <i className="fas fa-arrow-right"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isStepValid() || isSubmitting}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isStepValid() && !isSubmitting
                      ? 'bg-green-500 text-white hover:bg-green-600 hover:-translate-y-1 hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Agendando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-calendar-check"></i>
                      Agendar Cita
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Información adicional */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-clock text-white text-xl"></i>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Respuesta Rápida</h3>
              <p className="text-sm text-gray-600">
                Te contactaremos en menos de 2 horas para confirmar tu cita
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-home text-white text-xl"></i>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">A Domicilio</h3>
              <p className="text-sm text-gray-600">
                Atención veterinaria profesional en la comodidad de tu hogar
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-md text-white text-xl"></i>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Profesionales</h3>
              <p className="text-sm text-gray-600">
                Veterinarios certificados con amplia experiencia
              </p>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
