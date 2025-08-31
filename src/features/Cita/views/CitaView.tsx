import MainLayout from '../../../core/layouts/MainLayout';

export default function CitaView() {
  return (
    <MainLayout title="Agendar Cita Veterinaria" showBackgroundEffects={false}>
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-5">
          
          {/* Formulario de cita */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Solicitar Cita Veterinaria a Domicilio
            </h2>
            
            <form className="space-y-6">
              {/* Información del propietario */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del propietario *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Tu número de teléfono"
                    required
                  />
                </div>
              </div>

              {/* Información de la mascota */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la mascota *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Nombre de tu mascota"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de mascota *
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                    <option value="ave">Ave</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Edad (aproximada)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Ej: 2 años"
                  />
                </div>
              </div>

              {/* Tipo de servicio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de servicio *
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                    <input type="radio" name="servicio" value="consulta" className="text-green-500 focus:ring-green-500" />
                    <div className="ml-3">
                      <div className="font-medium text-gray-800">Consulta General</div>
                      <div className="text-sm text-gray-600">Revisión de rutina y diagnóstico</div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                    <input type="radio" name="servicio" value="vacunacion" className="text-green-500 focus:ring-green-500" />
                    <div className="ml-3">
                      <div className="font-medium text-gray-800">Vacunación</div>
                      <div className="text-sm text-gray-600">Aplicación de vacunas</div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                    <input type="radio" name="servicio" value="urgencia" className="text-green-500 focus:ring-green-500" />
                    <div className="ml-3">
                      <div className="font-medium text-gray-800">Urgencia</div>
                      <div className="text-sm text-gray-600">Atención médica urgente</div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                    <input type="radio" name="servicio" value="otros" className="text-green-500 focus:ring-green-500" />
                    <div className="ml-3">
                      <div className="font-medium text-gray-800">Otros</div>
                      <div className="text-sm text-gray-600">Especificar en observaciones</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Fecha y hora preferida */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha preferida *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora preferida *
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Seleccionar hora</option>
                    <option value="08:00">08:00 AM</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección para la visita *
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Dirección completa donde se realizará la consulta"
                  required
                ></textarea>
              </div>

              {/* Observaciones */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observaciones adicionales
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Describe los síntomas, comportamiento o cualquier información relevante sobre tu mascota..."
                ></textarea>
              </div>

              {/* Botón de envío */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <i className="fas fa-calendar-check mr-2"></i>
                  Solicitar Cita
                </button>
              </div>
            </form>
          </div>

          {/* Información adicional */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-xl p-6 text-center">
              <div className="text-3xl text-green-500 mb-3">
                <i className="fas fa-clock"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Respuesta Rápida</h3>
              <p className="text-sm text-gray-600">
                Te contactaremos en menos de 2 horas para confirmar tu cita
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="text-3xl text-blue-500 mb-3">
                <i className="fas fa-home"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">A Domicilio</h3>
              <p className="text-sm text-gray-600">
                Atención veterinaria profesional en la comodidad de tu hogar
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-6 text-center">
              <div className="text-3xl text-purple-500 mb-3">
                <i className="fas fa-user-md"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Profesionales</h3>
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
