import { useState } from 'react';
import MainLayout from '../../../core/layouts/MainLayout';

interface PaseadorData {
  nombreCompleto: string;
  cedula: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
  foto: string;
  experienciaAnios: string;
  tiposMascotas: string[];
  tamaniosMascotas: string[];
  certificaciones: string;
  referencias: string;
  disponibilidadDias: string[];
  horariosDisponibles: string;
  zonasServicio: string[];
  tarifaEsperada: string;
  tieneTransporte: string;
  tipoTransporte: string;
  tieneEquipamiento: string[];
  motivacion: string;
  situacionesEspeciales: string;
  aceptaTerminos: boolean;
}

export default function PaseadorView() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<PaseadorData>({
    nombreCompleto: '',
    cedula: '',
    fechaNacimiento: '',
    telefono: '',
    email: '',
    direccion: '',
    ciudad: '',
    foto: '',
    experienciaAnios: '',
    tiposMascotas: [],
    tamaniosMascotas: [],
    certificaciones: '',
    referencias: '',
    disponibilidadDias: [],
    horariosDisponibles: '',
    zonasServicio: [],
    tarifaEsperada: '',
    tieneTransporte: '',
    tipoTransporte: '',
    tieneEquipamiento: [],
    motivacion: '',
    situacionesEspeciales: '',
    aceptaTerminos: false
  });

  const totalSteps = 5;

  const updateFormData = (field: keyof PaseadorData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field: keyof PaseadorData, value: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(value)) {
      updateFormData(field, currentArray.filter(item => item !== value));
    } else {
      updateFormData(field, [...currentArray, value]);
    }
  };

  const isStepValid = (): boolean => {
    switch (step) {
      case 1:
        return !!(formData.nombreCompleto && formData.cedula && formData.fechaNacimiento && 
                  formData.telefono && formData.email && formData.direccion && formData.ciudad && formData.foto);
      case 2:
        return !!(formData.experienciaAnios && formData.tiposMascotas.length > 0 && 
                  formData.tamaniosMascotas.length > 0);
      case 3:
        return !!(formData.disponibilidadDias.length > 0 && formData.horariosDisponibles && 
                  formData.zonasServicio.length > 0 && formData.tarifaEsperada);
      case 4:
        return !!(formData.tieneTransporte && formData.tieneEquipamiento.length > 0);
      case 5:
        return !!(formData.motivacion && formData.aceptaTerminos);
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

  const calculateTarifaSugerida = (): string => {
    let base = 15000;
    const exp = parseInt(formData.experienciaAnios) || 0;
    if (exp >= 5) base += 8000;
    else if (exp >= 2) base += 5000;
    else if (exp >= 1) base += 2000;
    if (formData.tieneTransporte === 'Sí') base += 5000;
    if (formData.tieneEquipamiento.length >= 4) base += 3000;
    if (formData.disponibilidadDias.length >= 6) base += 4000;
    if (formData.certificaciones && formData.certificaciones.length > 20) base += 6000;
    return base.toLocaleString('es-CO');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const solicitud = {
      ...formData,
      id: Date.now().toString(),
      fechaSolicitud: new Date().toISOString(),
      estado: 'En Revisión',
      tarifaSugerida: calculateTarifaSugerida()
    };
    const solicitudesGuardadas = localStorage.getItem('solicitudesPaseador');
    const solicitudes = solicitudesGuardadas ? JSON.parse(solicitudesGuardadas) : [];
    solicitudes.push(solicitud);
    localStorage.setItem('solicitudesPaseador', JSON.stringify(solicitudes));
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const resetForm = () => {
    setFormData({
      nombreCompleto: '',
      cedula: '',
      fechaNacimiento: '',
      telefono: '',
      email: '',
      direccion: '',
      ciudad: '',
      foto: '',
      experienciaAnios: '',
      tiposMascotas: [],
      tamaniosMascotas: [],
      certificaciones: '',
      referencias: '',
      disponibilidadDias: [],
      horariosDisponibles: '',
      zonasServicio: [],
      tarifaEsperada: '',
      tieneTransporte: '',
      tipoTransporte: '',
      tieneEquipamiento: [],
      motivacion: '',
      situacionesEspeciales: '',
      aceptaTerminos: false
    });
    setStep(1);
    setShowSuccess(false);
  };

  if (showSuccess) {
    return (
      <MainLayout title="Solicitud Enviada" showBackgroundEffects={false}>
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-3xl shadow-2xl p-8 text-center transform animate-[scaleIn_0.5s_ease-out]">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-[bounce_1s_ease-in-out]">
                <i className="fas fa-check-circle text-5xl text-white"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Solicitud Enviada Exitosamente!</h2>
              <p className="text-gray-600 mb-6">
                Hemos recibido tu solicitud para ser paseador afiliado de <strong>VetInHouse</strong>.
                Nuestro equipo revisará tu información y te contactaremos pronto al <strong>{formData.telefono}</strong>.
              </p>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <i className="fas fa-dollar-sign text-green-600 text-xl mt-1"></i>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Tarifa Sugerida por Paseo:</p>
                    <p className="text-2xl font-bold text-green-600">${calculateTarifaSugerida()} COP</p>
                    <p className="text-xs text-gray-500 mt-1">Basada en tu experiencia y habilidades</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <i className="fas fa-info-circle text-blue-600 text-xl mt-1"></i>
                  <div className="text-left">
                    <p className="text-sm text-blue-800">
                      Recibirás un correo de confirmación en <strong>{formData.email}</strong> con los próximos pasos del proceso de afiliación.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={resetForm} className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <i className="fas fa-plus mr-2"></i>Nueva Solicitud
                </button>
                <button onClick={() => window.location.href = '/home'} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300">
                  <i className="fas fa-home mr-2"></i>Inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Registro de Paseador" showBackgroundEffects={false}>
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-5">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">Registro de Paseador Afiliado</h1>
                  <p className="text-purple-100 text-sm">Paso {step} de {totalSteps}</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <i className="fas fa-walking text-3xl"></i>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-500 ease-out relative overflow-hidden" style={{ width: `${(step / totalSteps) * 100}%` }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-purple-100">
                  <span>Personal</span>
                  <span>Experiencia</span>
                  <span>Disponibilidad</span>
                  <span>Transporte</span>
                  <span>Confirmación</span>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="animate-[fadeIn_0.5s_ease-out]">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-4">
                      <i className="fas fa-user text-4xl text-green-600"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Información Personal</h2>
                    <p className="text-gray-600">Cuéntanos quién eres</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="transform transition-all duration-300 hover:scale-105">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Completo <span className="text-red-500">*</span></label>
                      <input type="text" value={formData.nombreCompleto} onChange={(e) => updateFormData('nombreCompleto', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300" placeholder="Juan Pérez García" />
                    </div>
                    <div className="transform transition-all duration-300 hover:scale-105">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Cédula <span className="text-red-500">*</span></label>
                      <input type="text" value={formData.cedula} onChange={(e) => updateFormData('cedula', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300" placeholder="1234567890" />
                    </div>
                    <div className="transform transition-all duration-300 hover:scale-105">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Nacimiento <span className="text-red-500">*</span></label>
                      <input type="date" value={formData.fechaNacimiento} onChange={(e) => updateFormData('fechaNacimiento', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300" />
                    </div>
                    <div className="transform transition-all duration-300 hover:scale-105">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono <span className="text-red-500">*</span></label>
                      <input type="tel" value={formData.telefono} onChange={(e) => updateFormData('telefono', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300" placeholder="+57 300 123 4567" />
                    </div>
                    <div className="md:col-span-2 transform transition-all duration-300 hover:scale-105">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                      <input type="email" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300" placeholder="correo@ejemplo.com" />
                    </div>
                    <div className="md:col-span-2 transform transition-all duration-300 hover:scale-105">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Dirección <span className="text-red-500">*</span></label>
                      <input type="text" value={formData.direccion} onChange={(e) => updateFormData('direccion', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300" placeholder="Calle 123 #45-67" />
                    </div>
                    <div className="transform transition-all duration-300 hover:scale-105">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Ciudad <span className="text-red-500">*</span></label>
                      <select value={formData.ciudad} onChange={(e) => updateFormData('ciudad', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300">
                        <option value="">Selecciona tu ciudad</option>
                        <option value="Bogotá">Bogotá</option>
                        <option value="Medellín">Medellín</option>
                        <option value="Cali">Cali</option>
                        <option value="Barranquilla">Barranquilla</option>
                        <option value="Cartagena">Cartagena</option>
                        <option value="Bucaramanga">Bucaramanga</option>
                        <option value="Pereira">Pereira</option>
                        <option value="Manizales">Manizales</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 transform transition-all duration-300 hover:scale-105">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">URL de tu Foto <span className="text-red-500">*</span></label>
                      <input type="url" value={formData.foto} onChange={(e) => updateFormData('foto', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300" placeholder="https://ejemplo.com/tu-foto.jpg" />
                      <p className="text-xs text-gray-500 mt-1">
                        Ingresa la URL de una foto profesional tuya. Esta foto se mostrará en "Conoce a nuestro equipo".
                      </p>
                      {formData.foto && (
                        <div className="mt-3">
                          <img src={formData.foto} alt="Preview" className="w-24 h-24 rounded-full object-cover border-4 border-green-200" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150'; }} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* PASO 2: Experiencia y Habilidades */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                      <i className="fas fa-award text-4xl text-blue-600"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Experiencia y Habilidades</h2>
                    <p className="text-gray-600">Cuéntanos sobre tu experiencia con mascotas</p>
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Años de Experiencia <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.experienciaAnios}
                      onChange={(e) => updateFormData('experienciaAnios', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300"
                    >
                      <option value="">Selecciona</option>
                      <option value="0">Menos de 1 año</option>
                      <option value="1">1-2 años</option>
                      <option value="2">2-3 años</option>
                      <option value="3">3-5 años</option>
                      <option value="5">Más de 5 años</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Tipos de Mascotas con Experiencia <span className="text-red-500">*</span>
                    </label>
                    <div className="grid md:grid-cols-3 gap-3">
                      {['Perros', 'Gatos', 'Aves', 'Conejos', 'Reptiles', 'Otros'].map((tipo) => (
                        <button
                          key={tipo}
                          type="button"
                          onClick={() => toggleArrayValue('tiposMascotas', tipo)}
                          className={`p-4 rounded-xl border-2 font-medium transition-all duration-300 transform hover:scale-105 ${
                            formData.tiposMascotas.includes(tipo)
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          {tipo}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Tamaños de Mascotas que Puedes Manejar <span className="text-red-500">*</span>
                    </label>
                    <div className="grid md:grid-cols-4 gap-3">
                      {['Pequeño (0-10kg)', 'Mediano (10-25kg)', 'Grande (25-40kg)', 'Extra Grande (+40kg)'].map((tamano) => (
                        <button
                          key={tamano}
                          type="button"
                          onClick={() => toggleArrayValue('tamaniosMascotas', tamano)}
                          className={`p-4 rounded-xl border-2 font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                            formData.tamaniosMascotas.includes(tamano)
                              ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white border-transparent shadow-lg'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-green-300'
                          }`}
                        >
                          {tamano}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Certificaciones o Cursos (Opcional)
                    </label>
                    <textarea
                      value={formData.certificaciones}
                      onChange={(e) => updateFormData('certificaciones', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 resize-none"
                      placeholder="Ej: Curso de primeros auxilios veterinarios, Certificado en adiestramiento canino, etc."
                    />
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Referencias (Opcional)
                    </label>
                    <textarea
                      value={formData.referencias}
                      onChange={(e) => updateFormData('referencias', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 resize-none"
                      placeholder="Nombres y contactos de personas que puedan dar referencias sobre tu trabajo con mascotas"
                    />
                  </div>
                </div>
              )}

              {/* PASO 3: Disponibilidad y Tarifas */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mb-4">
                      <i className="fas fa-calendar-alt text-4xl text-orange-600"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Disponibilidad y Tarifas</h2>
                    <p className="text-gray-600">Cuándo y dónde puedes trabajar</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Días Disponibles <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((dia) => (
                        <button
                          key={dia}
                          type="button"
                          onClick={() => toggleArrayValue('disponibilidadDias', dia)}
                          className={`p-3 rounded-xl border-2 font-medium transition-all duration-300 transform hover:scale-105 ${
                            formData.disponibilidadDias.includes(dia)
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-lg'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300'
                          }`}
                        >
                          {dia}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Horarios Disponibles <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.horariosDisponibles}
                      onChange={(e) => updateFormData('horariosDisponibles', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300"
                    >
                      <option value="">Selecciona</option>
                      <option value="Mañanas (6am - 12pm)">Mañanas (6am - 12pm)</option>
                      <option value="Tardes (12pm - 6pm)">Tardes (12pm - 6pm)</option>
                      <option value="Noches (6pm - 10pm)">Noches (6pm - 10pm)</option>
                      <option value="Todo el día">Todo el día</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Zonas de Servicio <span className="text-red-500">*</span>
                    </label>
                    <div className="grid md:grid-cols-3 gap-3">
                      {['Norte', 'Sur', 'Este', 'Oeste', 'Centro', 'Todas'].map((zona) => (
                        <button
                          key={zona}
                          type="button"
                          onClick={() => toggleArrayValue('zonasServicio', zona)}
                          className={`p-4 rounded-xl border-2 font-medium transition-all duration-300 transform hover:scale-105 ${
                            formData.zonasServicio.includes(zona)
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          {zona}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tarifa Esperada por Paseo (COP) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.tarifaEsperada}
                      onChange={(e) => updateFormData('tarifaEsperada', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300"
                      placeholder="15000"
                      min="10000"
                      step="1000"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Rango sugerido: $10,000 - $30,000 COP por paseo de 30-60 minutos
                    </p>
                  </div>

                  {/* Calculadora de Tarifa Sugerida */}
                  {formData.experienciaAnios && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-200">
                      <div className="flex items-center gap-3 mb-3">
                        <i className="fas fa-calculator text-2xl text-green-600"></i>
                        <h3 className="text-lg font-bold text-gray-800">Tarifa Sugerida</h3>
                      </div>
                      <p className="text-3xl font-bold text-green-600 mb-2">
                        ${calculateTarifaSugerida()} COP
                      </p>
                      <p className="text-sm text-gray-600">
                        Basada en tu experiencia, disponibilidad y equipamiento
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* PASO 4: Transporte y Equipamiento */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full mb-4">
                      <i className="fas fa-car text-4xl text-indigo-600"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Transporte y Equipamiento</h2>
                    <p className="text-gray-600">Con qué cuentas para realizar los paseos</p>
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      ¿Tienes Transporte Propio? <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {['Sí', 'No'].map((opcion) => (
                        <button
                          key={opcion}
                          type="button"
                          onClick={() => updateFormData('tieneTransporte', opcion)}
                          className={`p-6 rounded-xl border-2 font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                            formData.tieneTransporte === opcion
                              ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white border-transparent shadow-lg'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300'
                          }`}
                        >
                          {opcion}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.tieneTransporte === 'Sí' && (
                    <div className="transform transition-all duration-300 hover:scale-105">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tipo de Transporte
                      </label>
                      <select
                        value={formData.tipoTransporte}
                        onChange={(e) => updateFormData('tipoTransporte', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-300"
                      >
                        <option value="">Selecciona</option>
                        <option value="Automóvil">Automóvil</option>
                        <option value="Motocicleta">Motocicleta</option>
                        <option value="Bicicleta">Bicicleta</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Equipamiento que Posees <span className="text-red-500">*</span>
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        { value: 'Correas', icon: '🔗' },
                        { value: 'Arneses', icon: '🦺' },
                        { value: 'Bozales', icon: '😷' },
                        { value: 'Bolsas para desechos', icon: '🗑️' },
                        { value: 'Agua y bebederos portátiles', icon: '💧' },
                        { value: 'Premios/Snacks', icon: '🦴' },
                        { value: 'Kit de primeros auxilios', icon: '🩹' },
                        { value: 'GPS/Rastreador', icon: '📍' }
                      ].map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => toggleArrayValue('tieneEquipamiento', item.value)}
                          className={`p-4 rounded-xl border-2 font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-3 ${
                            formData.tieneEquipamiento.includes(item.value)
                              ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white border-transparent shadow-lg'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-green-300'
                          }`}
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <span>{item.value}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-info-circle text-blue-600 text-xl mt-1"></i>
                      <div className="text-sm text-blue-800">
                        <p className="font-semibold mb-1">Nota importante:</p>
                        <p>
                          Contar con transporte propio y equipamiento completo incrementa tu tarifa sugerida 
                          y te hace más atractivo para los clientes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PASO 5: Información Adicional y Confirmación */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full mb-4">
                      <i className="fas fa-clipboard-check text-4xl text-pink-600"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Información Adicional</h2>
                    <p className="text-gray-600">Último paso para completar tu registro</p>
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ¿Por qué quieres ser paseador afiliado? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.motivacion}
                      onChange={(e) => updateFormData('motivacion', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-all duration-300 resize-none"
                      placeholder="Cuéntanos qué te motiva a trabajar con nosotros y por qué te apasiona cuidar mascotas..."
                    />
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Situaciones Especiales (Opcional)
                    </label>
                    <textarea
                      value={formData.situacionesEspeciales}
                      onChange={(e) => updateFormData('situacionesEspeciales', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-all duration-300 resize-none"
                      placeholder="¿Hay alguna situación especial que debamos conocer? (alergias, limitaciones físicas, etc.)"
                    />
                  </div>

                  {/* Resumen de la Información */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <i className="fas fa-file-alt text-purple-600"></i>
                      Resumen de tu Solicitud
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Nombre:</span>
                        <p className="text-gray-900">{formData.nombreCompleto || 'No especificado'}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Ciudad:</span>
                        <p className="text-gray-900">{formData.ciudad || 'No especificado'}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Experiencia:</span>
                        <p className="text-gray-900">
                          {formData.experienciaAnios ? `${formData.experienciaAnios === '0' ? 'Menos de 1 año' : formData.experienciaAnios === '5' ? 'Más de 5 años' : `${formData.experienciaAnios}-${parseInt(formData.experienciaAnios)+1} años`}` : 'No especificado'}
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Disponibilidad:</span>
                        <p className="text-gray-900">
                          {formData.disponibilidadDias.length > 0 
                            ? `${formData.disponibilidadDias.length} días/semana`
                            : 'No especificado'}
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Transporte:</span>
                        <p className="text-gray-900">{formData.tieneTransporte || 'No especificado'}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Tarifa Sugerida:</span>
                        <p className="text-green-600 font-bold">${calculateTarifaSugerida()} COP</p>
                      </div>
                    </div>
                  </div>

                  {/* Términos y Condiciones */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.aceptaTerminos}
                        onChange={(e) => updateFormData('aceptaTerminos', e.target.checked)}
                        className="mt-1 w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                      <div className="flex-1">
                        <span className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                          Acepto los términos y condiciones <span className="text-red-500">*</span>
                        </span>
                        <p className="text-sm text-gray-600 mt-2">
                          Al registrarte como paseador afiliado, aceptas cumplir con nuestros estándares de servicio, 
                          políticas de seguridad y código de conducta. Recibirás capacitación y apoyo continuo de 
                          nuestro equipo.
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-star text-yellow-600 text-xl mt-1"></i>
                      <div className="text-sm text-gray-800">
                        <p className="font-semibold mb-1">¡Estás a un paso de unirte!</p>
                        <p>
                          Una vez enviada tu solicitud, nuestro equipo la revisará en un plazo de 2-3 días hábiles 
                          y te contactaremos para los siguientes pasos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
            <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-200">
              {step > 1 && (<button type="button" onClick={prevStep} className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 flex items-center justify-center gap-2 mr-4"><i className="fas fa-arrow-left"></i>Anterior</button>)}
              {step < totalSteps ? (
                <button type="button" onClick={nextStep} disabled={!isStepValid()} className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isStepValid() ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:-translate-y-1 hover:shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} ${step === 1 ? 'ml-auto' : ''}`}>Siguiente<i className="fas fa-arrow-right"></i></button>
              ) : (
                <button type="submit" disabled={!isStepValid() || isSubmitting} className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isStepValid() && !isSubmitting ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:-translate-y-1 hover:shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>{isSubmitting ? (<><i className="fas fa-spinner fa-spin"></i>Enviando...</>) : (<><i className="fas fa-paper-plane"></i>Enviar Solicitud</>)}</button>
              )}
            </div>
          </form>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <i className="fas fa-dollar-sign text-4xl text-green-600 mb-3"></i>
              <h3 className="font-bold text-gray-800 mb-2">Buenos Ingresos</h3>
              <p className="text-sm text-gray-600">Gana desde $10,000 por paseo según tu experiencia</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <i className="fas fa-calendar-check text-4xl text-blue-600 mb-3"></i>
              <h3 className="font-bold text-gray-800 mb-2">Flexibilidad</h3>
              <p className="text-sm text-gray-600">Tú decides cuándo y dónde trabajar</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <i className="fas fa-users text-4xl text-purple-600 mb-3"></i>
              <h3 className="font-bold text-gray-800 mb-2">Comunidad</h3>
              <p className="text-sm text-gray-600">Únete a nuestra red de paseadores profesionales</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
