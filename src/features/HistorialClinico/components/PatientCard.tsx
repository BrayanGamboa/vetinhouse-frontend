import type { Patient } from '../types/historial.types';

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  const age = Math.floor((new Date().getTime() - patient.birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  const months = Math.floor((new Date().getTime() - patient.birthDate.getTime()) / (30.44 * 24 * 60 * 60 * 1000)) % 12;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border border-blue-100">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Foto del paciente */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            {patient.photo ? (
              <img 
                src={patient.photo} 
                alt={patient.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                <i className="fas fa-paw text-4xl text-white"></i>
              </div>
            )}
          </div>
        </div>

        {/* Información principal */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">{patient.name}</h2>
              <div className="flex items-center gap-3 text-gray-600">
                <span className="flex items-center gap-1">
                  <i className="fas fa-dog"></i>
                  {patient.species} - {patient.breed}
                </span>
                <span className="flex items-center gap-1">
                  <i className={`fas fa-${patient.gender === 'Macho' ? 'mars' : 'venus'}`}></i>
                  {patient.gender}
                </span>
              </div>
            </div>
            {patient.sterilized && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <i className="fas fa-check-circle"></i>
                Esterilizado
              </span>
            )}
          </div>

          {/* Datos básicos en grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-xs text-gray-500 mb-1">Edad</div>
              <div className="font-semibold text-gray-900">{age} años {months > 0 && `${months}m`}</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-xs text-gray-500 mb-1">Peso</div>
              <div className="font-semibold text-gray-900">{patient.weight} kg</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-xs text-gray-500 mb-1">Color</div>
              <div className="font-semibold text-gray-900">{patient.color}</div>
            </div>
            {patient.bloodType && (
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-xs text-gray-500 mb-1">Tipo Sangre</div>
                <div className="font-semibold text-gray-900">{patient.bloodType}</div>
              </div>
            )}
          </div>

          {/* Microchip */}
          {patient.microchip && (
            <div className="bg-white rounded-lg p-3 shadow-sm mb-4">
              <div className="flex items-center gap-2">
                <i className="fas fa-microchip text-blue-600"></i>
                <span className="text-sm text-gray-600">Microchip:</span>
                <span className="font-mono font-semibold text-gray-900">{patient.microchip}</span>
              </div>
            </div>
          )}

          {/* Alertas médicas */}
          <div className="space-y-2">
            {patient.allergies.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <i className="fas fa-exclamation-triangle text-red-600 mt-1"></i>
                  <div>
                    <div className="font-semibold text-red-900 text-sm">Alergias:</div>
                    <div className="text-sm text-red-700">{patient.allergies.join(', ')}</div>
                  </div>
                </div>
              </div>
            )}

            {patient.chronicConditions.length > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <i className="fas fa-heartbeat text-orange-600 mt-1"></i>
                  <div>
                    <div className="font-semibold text-orange-900 text-sm">Condiciones Crónicas:</div>
                    <div className="text-sm text-orange-700">{patient.chronicConditions.join(', ')}</div>
                  </div>
                </div>
              </div>
            )}

            {patient.currentMedication.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <i className="fas fa-pills text-blue-600 mt-1"></i>
                  <div>
                    <div className="font-semibold text-blue-900 text-sm">Medicación Actual:</div>
                    <div className="text-sm text-blue-700">{patient.currentMedication.join(', ')}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Información del propietario */}
        <div className="md:w-64 bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <i className="fas fa-user"></i>
            Propietario
          </h3>
          <div className="space-y-2 text-sm">
            <div>
              <div className="text-gray-500">Nombre</div>
              <div className="font-medium text-gray-900">{patient.owner.name}</div>
            </div>
            <div>
              <div className="text-gray-500">Teléfono</div>
              <div className="font-medium text-gray-900">{patient.owner.phone}</div>
            </div>
            <div>
              <div className="text-gray-500">Email</div>
              <div className="font-medium text-gray-900 break-all">{patient.owner.email}</div>
            </div>
            <div>
              <div className="text-gray-500">Dirección</div>
              <div className="font-medium text-gray-900">{patient.owner.address}</div>
              <div className="font-medium text-gray-900">{patient.owner.city}</div>
            </div>
          </div>

          {patient.insurance && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <i className="fas fa-shield-alt text-green-600"></i>
                Seguro
              </h4>
              <div className="space-y-1 text-sm">
                <div className="font-medium text-gray-900">{patient.insurance.company}</div>
                <div className="text-gray-600 text-xs">Póliza: {patient.insurance.policyNumber}</div>
                <div className="text-gray-600 text-xs">{patient.insurance.coverage}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
