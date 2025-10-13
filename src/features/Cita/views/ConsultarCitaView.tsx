import { useState, useEffect } from 'react';
import MainLayout from '../../../core/layouts/MainLayout';

interface Cita {
  id: string;
  nombrePropietario: string;
  telefono: string;
  email: string;
  nombreMascota: string;
  tipoMascota: string;
  raza: string;
  edad: string;
  peso: string;
  tipoServicio: string;
  fecha: string;
  hora: string;
  direccion: string;
  ciudad: string;
  referencia: string;
  observaciones: string;
  fechaCreacion: string;
  estado: string;
}

export default function ConsultarCitaView() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [selectedCita, setSelectedCita] = useState<Cita | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'Pendiente' | 'Confirmada' | 'Cancelada'>('all');

  useEffect(() => {
    loadCitas();
  }, []);

  const loadCitas = () => {
    const citasGuardadas = localStorage.getItem('citas');
    if (citasGuardadas) {
      const citasData = JSON.parse(citasGuardadas);
      setCitas(citasData.reverse()); // Mostrar las más recientes primero
    }
  };

  const deleteCita = (id: string) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta cita?');
    if (confirmDelete) {
      const updatedCitas = citas.filter(c => c.id !== id);
      localStorage.setItem('citas', JSON.stringify(updatedCitas.reverse()));
      setCitas(updatedCitas);
      if (selectedCita?.id === id) {
        setShowModal(false);
        setSelectedCita(null);
      }
    }
  };

  const updateEstado = (id: string, nuevoEstado: string) => {
    const updatedCitas = citas.map(c => 
      c.id === id ? { ...c, estado: nuevoEstado } : c
    );
    localStorage.setItem('citas', JSON.stringify(updatedCitas.reverse()));
    setCitas(updatedCitas);
    if (selectedCita?.id === id) {
      setSelectedCita({ ...selectedCita, estado: nuevoEstado });
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Confirmada':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Cancelada':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getEstadoGradient = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'Confirmada':
        return 'bg-gradient-to-r from-green-500 to-blue-500';
      case 'Cancelada':
        return 'bg-gradient-to-r from-red-500 to-red-700';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500';
    }
  };

  const getServicioIcon = (servicio: string) => {
    switch (servicio) {
      case 'Consulta Veterinaria':
        return '🩺';
      case 'Vacunación':
        return '💉';
      case 'Baño y Peluquería':
        return '🛁';
      case 'Desparasitación':
        return '💊';
      case 'Emergencia':
        return '🚨';
      case 'Cirugía Menor':
        return '⚕️';
      default:
        return '📋';
    }
  };

  const filteredCitas = filter === 'all' 
    ? citas 
    : citas.filter(c => c.estado === filter);

  const formatFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <MainLayout showBackgroundEffects={true}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fadeIn">
            <div className="inline-block mb-4">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-full shadow-lg animate-float">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Mis Citas Agendadas
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Gestiona y consulta todas tus citas veterinarias a domicilio
            </p>
          </div>

          {/* Filtros */}
          <div className="mb-8 flex flex-wrap justify-center gap-3 animate-slideDown">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:shadow-md border-2 border-gray-200'
              }`}
            >
              Todas ({citas.length})
            </button>
            <button
              onClick={() => setFilter('Pendiente')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === 'Pendiente'
                  ? 'bg-yellow-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:shadow-md border-2 border-yellow-300'
              }`}
            >
              Pendientes ({citas.filter(c => c.estado === 'Pendiente').length})
            </button>
            <button
              onClick={() => setFilter('Confirmada')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === 'Confirmada'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:shadow-md border-2 border-green-300'
              }`}
            >
              Confirmadas ({citas.filter(c => c.estado === 'Confirmada').length})
            </button>
            <button
              onClick={() => setFilter('Cancelada')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === 'Cancelada'
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:shadow-md border-2 border-red-300'
              }`}
            >
              Canceladas ({citas.filter(c => c.estado === 'Cancelada').length})
            </button>
          </div>

          {/* Lista de Citas */}
          {filteredCitas.length === 0 ? (
            <div className="text-center py-20 animate-fadeIn">
              <div className="inline-block mb-6">
                <div className="bg-gray-100 p-8 rounded-full">
                  <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No hay citas {filter !== 'all' ? filter.toLowerCase() + 's' : 'agendadas'}
              </h3>
              <p className="text-gray-500 mb-6">
                {filter === 'all' 
                  ? 'Agenda tu primera cita para comenzar'
                  : 'No tienes citas con este estado'}
              </p>
              <a
                href="/cita"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agendar Nueva Cita
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCitas.map((cita, index) => (
                <div
                  key={cita.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden animate-slideUp card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Header de la tarjeta */}
                  <div className={`${getEstadoGradient(cita.estado)} p-4 text-white`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl">{getServicioIcon(cita.tipoServicio)}</span>
                        <div>
                          <h3 className="font-bold text-lg">{cita.nombreMascota}</h3>
                          <p className="text-sm opacity-90">{cita.tipoMascota}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getEstadoColor(cita.estado)}`}>
                        {cita.estado}
                      </span>
                    </div>
                  </div>

                  {/* Contenido de la tarjeta */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center space-x-3 text-gray-700">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-medium">{cita.nombrePropietario}</span>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-700">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatFecha(cita.fecha)} - {cita.hora}</span>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-700">
                      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{cita.ciudad}</span>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 flex items-center">
                        <span className="mr-2">🩺</span>
                        {cita.tipoServicio}
                      </p>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="px-5 pb-5 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedCita(cita);
                        setShowModal(true);
                      }}
                      className="flex-1 bg-gradient-to-r from-slate-700 to-slate-900 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-slate-800 hover:to-black"
                    >
                      Ver Detalles
                    </button>
                    <button
                      onClick={() => deleteCita(cita.id)}
                      className="px-4 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Botón para agendar nueva cita */}
          {filteredCitas.length > 0 && (
            <div className="text-center mt-12 animate-fadeIn">
              <a
                href="/cita"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agendar Nueva Cita
              </a>
            </div>
          )}
        </div>

        {/* Modal de Detalles */}
        {showModal && selectedCita && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
              {/* Header del Modal */}
              <div className={`${getEstadoGradient(selectedCita.estado)} p-6 text-white sticky top-0 z-10`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-5xl">{getServicioIcon(selectedCita.tipoServicio)}</span>
                    <div>
                      <h2 className="text-3xl font-bold">{selectedCita.nombreMascota}</h2>
                      <p className="text-lg opacity-90">{selectedCita.tipoMascota} - {selectedCita.raza}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Contenido del Modal */}
              <div className="p-8 space-y-6">
                {/* Estado */}
                <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl">
                  <span className="font-semibold text-gray-700">Estado de la Cita:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateEstado(selectedCita.id, 'Pendiente')}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                        selectedCita.estado === 'Pendiente'
                          ? 'bg-yellow-500 text-white shadow-lg scale-110'
                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      }`}
                    >
                      Pendiente
                    </button>
                    <button
                      onClick={() => updateEstado(selectedCita.id, 'Confirmada')}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                        selectedCita.estado === 'Confirmada'
                          ? 'bg-green-500 text-white shadow-lg scale-110'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      Confirmada
                    </button>
                    <button
                      onClick={() => updateEstado(selectedCita.id, 'Cancelada')}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                        selectedCita.estado === 'Cancelada'
                          ? 'bg-red-500 text-white shadow-lg scale-110'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      Cancelada
                    </button>
                  </div>
                </div>

                {/* Información del Propietario */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Información del Propietario
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-gray-700 min-w-[100px]">Nombre:</span>
                      <span className="text-gray-900">{selectedCita.nombrePropietario}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-gray-700 min-w-[100px]">Teléfono:</span>
                      <a href={`tel:${selectedCita.telefono}`} className="text-blue-600 hover:underline">{selectedCita.telefono}</a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-gray-700 min-w-[100px]">Email:</span>
                      <a href={`mailto:${selectedCita.email}`} className="text-blue-600 hover:underline">{selectedCita.email}</a>
                    </div>
                  </div>
                </div>

                {/* Información de la Mascota */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Información de la Mascota
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-semibold text-gray-700 block mb-1">Tipo:</span>
                      <span className="text-gray-900">{selectedCita.tipoMascota}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 block mb-1">Raza:</span>
                      <span className="text-gray-900">{selectedCita.raza}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 block mb-1">Edad:</span>
                      <span className="text-gray-900">{selectedCita.edad}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 block mb-1">Peso:</span>
                      <span className="text-gray-900">{selectedCita.peso}</span>
                    </div>
                  </div>
                </div>

                {/* Detalles del Servicio */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Detalles del Servicio
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-700 block mb-1">Servicio:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getServicioIcon(selectedCita.tipoServicio)}</span>
                        <span className="text-gray-900 text-lg">{selectedCita.tipoServicio}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-semibold text-gray-700 block mb-1">Fecha:</span>
                        <span className="text-gray-900">{formatFecha(selectedCita.fecha)}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700 block mb-1">Hora:</span>
                        <span className="text-gray-900">{selectedCita.hora}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ubicación */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Ubicación
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-700 block mb-1">Dirección:</span>
                      <span className="text-gray-900">{selectedCita.direccion}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 block mb-1">Ciudad:</span>
                      <span className="text-gray-900">{selectedCita.ciudad}</span>
                    </div>
                    {selectedCita.referencia && (
                      <div>
                        <span className="font-semibold text-gray-700 block mb-1">Referencias:</span>
                        <span className="text-gray-900">{selectedCita.referencia}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Observaciones */}
                {selectedCita.observaciones && (
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <svg className="w-6 h-6 mr-2 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      Observaciones
                    </h3>
                    <p className="text-gray-900">{selectedCita.observaciones}</p>
                  </div>
                )}

                {/* Botones de Acción */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      deleteCita(selectedCita.id);
                    }}
                    className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar Cita
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-bold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
