import type { TimelineEvent } from '../types/historial.types';

const formatDate = (date: Date) => {
  return date.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

interface TimelineItemProps {
  event: TimelineEvent;
  onClick?: () => void;
}

export function TimelineItem({ event, onClick }: TimelineItemProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 border-blue-300',
    green: 'bg-green-100 text-green-600 border-green-300',
    red: 'bg-red-100 text-red-600 border-red-300',
    purple: 'bg-purple-100 text-purple-600 border-purple-300',
    orange: 'bg-orange-100 text-orange-600 border-orange-300',
    teal: 'bg-teal-100 text-teal-600 border-teal-300'
  };

  const colorClass = colorClasses[event.color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div className="flex gap-4 group">
      {/* Línea temporal */}
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center border-2 shadow-md group-hover:scale-110 transition-transform`}>
          <i className={`fas ${event.icon}`}></i>
        </div>
        <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
      </div>

      {/* Contenido */}
      <div 
        className={`flex-1 pb-8 ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
      >
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-100">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{event.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
              {formatDate(event.date)}
            </span>
          </div>

          {/* Información adicional según el tipo */}
          {event.eventType === 'consultation' && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">
                  <i className="fas fa-user-md mr-1"></i>
                  {event.data.veterinarian}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  event.data.status === 'Completada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {event.data.status}
                </span>
              </div>
            </div>
          )}

          {event.eventType === 'vaccine' && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>
                  <i className="fas fa-building mr-1"></i>
                  {event.data.clinic}
                </span>
                {event.data.certified && (
                  <span className="text-green-600">
                    <i className="fas fa-certificate mr-1"></i>
                    Certificada
                  </span>
                )}
              </div>
            </div>
          )}

          {event.eventType === 'surgery' && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600">
                  <i className="fas fa-clock mr-1"></i>
                  Duración: {event.data.procedure.duration} min
                </div>
                <div className={`${
                  event.data.status === 'Completada' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  <i className="fas fa-info-circle mr-1"></i>
                  {event.data.status}
                </div>
              </div>
            </div>
          )}

          {event.eventType === 'labTest' && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-sm text-gray-600">
                <i className="fas fa-vial mr-1"></i>
                {event.data.laboratory}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
