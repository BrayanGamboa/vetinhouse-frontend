import type { Consultation } from '../types/historial.types';

interface ConsultationCardProps {
  consultation: Consultation;
  onViewDetails?: () => void;
}

export function ConsultationCard({ consultation, onViewDetails }: ConsultationCardProps) {
  const typeColors = {
    'Consulta General': 'blue',
    'Emergencia': 'red',
    'Control': 'green',
    'Especialidad': 'purple',
    'Vacunación': 'teal',
    'Desparasitación': 'cyan',
    'Cirugía': 'orange',
    'Seguimiento': 'indigo'
  };

  const color = typeColors[consultation.type as keyof typeof typeColors] || 'blue';

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 bg-${color}-100 rounded-full flex items-center justify-center`}>
            <i className={`fas fa-stethoscope text-${color}-600 text-xl`}></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-gray-900">{consultation.type}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                consultation.status === 'Completada' 
                  ? 'bg-green-100 text-green-800' 
                  : consultation.status === 'Pendiente'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {consultation.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{consultation.date.toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Costo</div>
          <div className="font-bold text-lg text-green-600">
            ${consultation.cost.toLocaleString('es-CO')}
          </div>
        </div>
      </div>

      {/* Motivo */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-1">Motivo de Consulta</div>
        <p className="text-sm font-medium text-gray-900">{consultation.reason}</p>
      </div>

      {/* Síntomas */}
      {consultation.symptoms.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">Síntomas</div>
          <div className="flex flex-wrap gap-2">
            {consultation.symptoms.map((symptom, index) => (
              <span
                key={index}
                className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-medium"
              >
                {symptom}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Signos Vitales */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        <div className="bg-blue-50 rounded-lg p-2">
          <div className="text-xs text-blue-600 mb-1">
            <i className="fas fa-thermometer-half mr-1"></i>Temp.
          </div>
          <div className="font-semibold text-blue-900">{consultation.vitalSigns.temperature}°C</div>
        </div>
        <div className="bg-red-50 rounded-lg p-2">
          <div className="text-xs text-red-600 mb-1">
            <i className="fas fa-heartbeat mr-1"></i>FC
          </div>
          <div className="font-semibold text-red-900">{consultation.vitalSigns.heartRate} bpm</div>
        </div>
        <div className="bg-teal-50 rounded-lg p-2">
          <div className="text-xs text-teal-600 mb-1">
            <i className="fas fa-lungs mr-1"></i>FR
          </div>
          <div className="font-semibold text-teal-900">{consultation.vitalSigns.respiratoryRate} rpm</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-2">
          <div className="text-xs text-purple-600 mb-1">
            <i className="fas fa-weight mr-1"></i>Peso
          </div>
          <div className="font-semibold text-purple-900">{consultation.vitalSigns.weight} kg</div>
        </div>
        <div className="bg-green-50 rounded-lg p-2">
          <div className="text-xs text-green-600 mb-1">
            <i className="fas fa-star mr-1"></i>CC
          </div>
          <div className="font-semibold text-green-900">{consultation.vitalSigns.bodyCondition}/5</div>
        </div>
      </div>

      {/* Diagnóstico */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <div className="text-xs text-blue-800 font-semibold mb-1 flex items-center gap-2">
          <i className="fas fa-clipboard-check"></i>
          Diagnóstico
        </div>
        <p className="text-sm text-blue-900">{consultation.diagnosis}</p>
      </div>

      {/* Tratamiento */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
          <i className="fas fa-pills"></i>
          Tratamiento
        </div>
        <p className="text-sm text-gray-900">{consultation.treatment}</p>
      </div>

      {/* Prescripciones */}
      {consultation.prescriptions.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
            <i className="fas fa-prescription"></i>
            Medicamentos Prescritos
          </div>
          <ul className="space-y-1">
            {consultation.prescriptions.map((prescription, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                <i className="fas fa-check text-green-600 mt-1 text-xs"></i>
                <span>{prescription}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recomendaciones */}
      {consultation.recommendations.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
            <i className="fas fa-lightbulb"></i>
            Recomendaciones
          </div>
          <ul className="space-y-1">
            {consultation.recommendations.map((recommendation, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                <i className="fas fa-arrow-right text-blue-600 mt-1 text-xs"></i>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Veterinario */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <i className="fas fa-user-md text-gray-400"></i>
        <span>{consultation.veterinarian}</span>
        <span className="text-gray-400">|</span>
        <span className="text-xs">Lic. {consultation.veterinarianLicense}</span>
      </div>

      {/* Próxima cita */}
      {consultation.nextAppointment && (
        <div className="bg-green-50 border-l-4 border-green-400 p-3 mb-4">
          <div className="flex items-center gap-2">
            <i className="fas fa-calendar-check text-green-600"></i>
            <span className="text-sm font-medium text-green-900">
              Próxima cita: {consultation.nextAppointment.toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
      )}

      {/* Botón de detalles */}
      {onViewDetails && (
        <button
          onClick={onViewDetails}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <i className="fas fa-file-medical"></i>
          Ver Examen Completo
        </button>
      )}
    </div>
  );
}
