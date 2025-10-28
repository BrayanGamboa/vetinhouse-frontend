import type { Vaccine } from '../types/historial.types';

interface VaccineCardProps {
  vaccine: Vaccine;
  onDownloadCertificate?: () => void;
}

export function VaccineCard({ vaccine, onDownloadCertificate }: VaccineCardProps) {
  const isExpiringSoon = vaccine.nextDose && 
    (vaccine.nextDose.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) < 30;
  const isExpired = vaccine.nextDose && vaccine.nextDose < new Date();

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <i className="fas fa-syringe text-green-600 text-xl"></i>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{vaccine.name}</h3>
            <p className="text-sm text-gray-600">{vaccine.type}</p>
          </div>
        </div>
        {vaccine.certified && (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <i className="fas fa-certificate"></i>
            Certificada
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Fecha de Aplicación</div>
          <div className="font-semibold text-gray-900">
            {vaccine.date.toLocaleDateString('es-ES')}
          </div>
        </div>
        {vaccine.nextDose && (
          <div>
            <div className="text-xs text-gray-500 mb-1">Próxima Dosis</div>
            <div className={`font-semibold ${
              isExpired ? 'text-red-600' : isExpiringSoon ? 'text-orange-600' : 'text-gray-900'
            }`}>
              {vaccine.nextDose.toLocaleDateString('es-ES')}
              {isExpired && <i className="fas fa-exclamation-triangle ml-2"></i>}
              {isExpiringSoon && !isExpired && <i className="fas fa-clock ml-2"></i>}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <i className="fas fa-building text-gray-400"></i>
          <span className="text-gray-600">Fabricante:</span>
          <span className="font-medium text-gray-900">{vaccine.manufacturer}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <i className="fas fa-barcode text-gray-400"></i>
          <span className="text-gray-600">Lote:</span>
          <span className="font-mono font-medium text-gray-900">{vaccine.batch}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <i className="fas fa-user-md text-gray-400"></i>
          <span className="text-gray-600">Veterinario:</span>
          <span className="font-medium text-gray-900">{vaccine.veterinarian}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <i className="fas fa-hospital text-gray-400"></i>
          <span className="text-gray-600">Clínica:</span>
          <span className="font-medium text-gray-900">{vaccine.clinic}</span>
        </div>
      </div>

      {vaccine.notes && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="text-xs text-blue-800 font-semibold mb-1">Notas</div>
          <p className="text-sm text-blue-900">{vaccine.notes}</p>
        </div>
      )}

      {vaccine.sideEffects && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
          <div className="text-xs text-orange-800 font-semibold mb-1">Efectos Secundarios</div>
          <p className="text-sm text-orange-900">{vaccine.sideEffects}</p>
        </div>
      )}

      {isExpiringSoon && !isExpired && (
        <div className="bg-orange-50 border-l-4 border-orange-400 p-3 mb-4">
          <div className="flex items-center gap-2">
            <i className="fas fa-exclamation-circle text-orange-600"></i>
            <span className="text-sm font-medium text-orange-900">
              Próxima dosis en menos de 30 días
            </span>
          </div>
        </div>
      )}

      {isExpired && (
        <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-4">
          <div className="flex items-center gap-2">
            <i className="fas fa-times-circle text-red-600"></i>
            <span className="text-sm font-medium text-red-900">
              ¡Vacuna vencida! Agenda una cita para refuerzo
            </span>
          </div>
        </div>
      )}

      {onDownloadCertificate && vaccine.certified && (
        <button
          onClick={onDownloadCertificate}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <i className="fas fa-file-pdf"></i>
          Descargar Certificado
        </button>
      )}
    </div>
  );
}
