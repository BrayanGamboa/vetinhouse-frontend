import { useState, useEffect } from 'react';
import MainLayout from '../../../core/layouts/MainLayout';

interface MiembroEquipo {
  id: string;
  nombreCompleto: string;
  foto: string;
  rol: 'Paseador' | 'Veterinario' | 'Soporte Emergencias';
  ciudad: string;
  especialidad?: string;
  experienciaAnios?: string;
  descripcion: string;
  telefono?: string;
  email?: string;
  disponibilidadDias?: string[];
  tiposMascotas?: string[];
}

export default function EquipoView() {
  const [miembros, setMiembros] = useState<MiembroEquipo[]>([]);
  const [filtroRol, setFiltroRol] = useState<string>('Todos');

  // Equipo precargado
  const equipoPrecargado: MiembroEquipo[] = [
    {
      id: '1',
      nombreCompleto: 'Dr. Carlos Méndez',
      foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
      rol: 'Veterinario',
      ciudad: 'Bogotá',
      especialidad: 'Cirugía General',
      experienciaAnios: '10',
      descripcion: 'Veterinario especializado en cirugía con más de 10 años de experiencia. Apasionado por el bienestar animal.',
      telefono: '+57 300 123 4567',
      email: 'carlos.mendez@vetinhouse.com'
    },
    {
      id: '2',
      nombreCompleto: 'Dra. María Rodríguez',
      foto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
      rol: 'Veterinario',
      ciudad: 'Medellín',
      especialidad: 'Medicina Interna',
      experienciaAnios: '8',
      descripcion: 'Especialista en diagnóstico y tratamiento de enfermedades internas en mascotas pequeñas y medianas.',
      telefono: '+57 301 234 5678',
      email: 'maria.rodriguez@vetinhouse.com'
    },
    {
      id: '3',
      nombreCompleto: 'Juan Pérez',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      rol: 'Paseador',
      ciudad: 'Bogotá',
      experienciaAnios: '5',
      descripcion: 'Paseador profesional certificado. Experto en manejo de razas grandes y entrenamiento básico durante paseos.',
      telefono: '+57 302 345 6789',
      disponibilidadDias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
      tiposMascotas: ['Perros', 'Gatos']
    },
    {
      id: '4',
      nombreCompleto: 'Laura Gómez',
      foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      rol: 'Paseador',
      ciudad: 'Cali',
      experienciaAnios: '3',
      descripcion: 'Amante de los animales con certificación en primeros auxilios veterinarios. Especializada en perros de todas las razas.',
      telefono: '+57 303 456 7890',
      disponibilidadDias: ['Lunes', 'Miércoles', 'Viernes', 'Sábado', 'Domingo'],
      tiposMascotas: ['Perros']
    },
    {
      id: '5',
      nombreCompleto: 'Andrea Torres',
      foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      rol: 'Soporte Emergencias',
      ciudad: 'Bogotá',
      experienciaAnios: '6',
      descripcion: 'Coordinadora de emergencias veterinarias 24/7. Entrenada en primeros auxilios y manejo de situaciones críticas.',
      telefono: '+57 304 567 8901',
      email: 'emergencias@vetinhouse.com'
    },
    {
      id: '6',
      nombreCompleto: 'Dr. Roberto Jiménez',
      foto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
      rol: 'Veterinario',
      ciudad: 'Barranquilla',
      especialidad: 'Dermatología',
      experienciaAnios: '7',
      descripcion: 'Especialista en dermatología veterinaria. Experto en alergias, infecciones cutáneas y problemas de piel.',
      telefono: '+57 305 678 9012',
      email: 'roberto.jimenez@vetinhouse.com'
    },
    {
      id: '7',
      nombreCompleto: 'Sofia Martínez',
      foto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
      rol: 'Paseador',
      ciudad: 'Medellín',
      experienciaAnios: '4',
      descripcion: 'Paseadora con amor por los animales. Experiencia con perros de todas las edades, desde cachorros hasta seniors.',
      telefono: '+57 306 789 0123',
      disponibilidadDias: ['Martes', 'Jueves', 'Sábado', 'Domingo'],
      tiposMascotas: ['Perros', 'Gatos']
    },
    {
      id: '8',
      nombreCompleto: 'Miguel Ángel Castro',
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      rol: 'Soporte Emergencias',
      ciudad: 'Cali',
      experienciaAnios: '5',
      descripcion: 'Técnico en emergencias veterinarias con certificación internacional. Respuesta rápida 24/7.',
      telefono: '+57 307 890 1234',
      email: 'soporte@vetinhouse.com'
    },
    {
      id: '9',
      nombreCompleto: 'Dra. Patricia Vargas',
      foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      rol: 'Veterinario',
      ciudad: 'Bucaramanga',
      especialidad: 'Odontología',
      experienciaAnios: '9',
      descripcion: 'Veterinaria especializada en odontología. Limpieza dental, extracciones y tratamientos periodontales.',
      telefono: '+57 308 901 2345',
      email: 'patricia.vargas@vetinhouse.com'
    },
    {
      id: '10',
      nombreCompleto: 'Daniel Ramírez',
      foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      rol: 'Paseador',
      ciudad: 'Cartagena',
      experienciaAnios: '2',
      descripcion: 'Paseador joven y energético. Perfecto para perros activos que necesitan mucho ejercicio y juego.',
      telefono: '+57 309 012 3456',
      disponibilidadDias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      tiposMascotas: ['Perros']
    }
  ];

  useEffect(() => {
    // Cargar equipo precargado
    let equipoCompleto = [...equipoPrecargado];

    // Cargar paseadores registrados desde localStorage
    const solicitudesGuardadas = localStorage.getItem('solicitudesPaseador');
    if (solicitudesGuardadas) {
      const solicitudes = JSON.parse(solicitudesGuardadas);
      const paseadoresNuevos = solicitudes.map((solicitud: any) => ({
        id: solicitud.id,
        nombreCompleto: solicitud.nombreCompleto,
        foto: solicitud.foto || 'https://via.placeholder.com/400',
        rol: 'Paseador' as const,
        ciudad: solicitud.ciudad,
        experienciaAnios: solicitud.experienciaAnios,
        descripcion: solicitud.motivacion || 'Paseador registrado en nuestra plataforma.',
        telefono: solicitud.telefono,
        email: solicitud.email,
        disponibilidadDias: solicitud.disponibilidadDias,
        tiposMascotas: solicitud.tiposMascotas
      }));
      equipoCompleto = [...equipoCompleto, ...paseadoresNuevos];
    }

    setMiembros(equipoCompleto);
  }, []);

  const miembrosFiltrados = filtroRol === 'Todos' 
    ? miembros 
    : miembros.filter(m => m.rol === filtroRol);

  const getRolColor = (rol: string) => {
    switch (rol) {
      case 'Veterinario':
        return 'from-blue-500 to-cyan-500';
      case 'Paseador':
        return 'from-green-500 to-emerald-500';
      case 'Soporte Emergencias':
        return 'from-red-500 to-orange-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getRolIcon = (rol: string) => {
    switch (rol) {
      case 'Veterinario':
        return 'fa-user-md';
      case 'Paseador':
        return 'fa-dog';
      case 'Soporte Emergencias':
        return 'fa-ambulance';
      default:
        return 'fa-user';
    }
  };

  return (
    <MainLayout showBackgroundEffects={false}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4 animate-bounce">
              <i className="fas fa-users text-5xl text-blue-600"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Conoce a Nuestro Equipo
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Profesionales apasionados dedicados al cuidado y bienestar de tus mascotas
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['Todos', 'Veterinario', 'Paseador', 'Soporte Emergencias'].map((filtro) => (
              <button
                key={filtro}
                onClick={() => setFiltroRol(filtro)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  filtroRol === filtro
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                }`}
              >
                {filtro}
              </button>
            ))}
          </div>

          {/* Contador */}
          <div className="text-center mb-8">
            <p className="text-gray-600 font-medium">
              Mostrando <span className="text-blue-600 font-bold">{miembrosFiltrados.length}</span> {miembrosFiltrados.length === 1 ? 'miembro' : 'miembros'}
            </p>
          </div>

          {/* Grid de Miembros */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {miembrosFiltrados.map((miembro) => (
              <div
                key={miembro.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Foto */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={miembro.foto}
                    alt={miembro.nombreCompleto}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Sin+Foto';
                    }}
                  />
                  <div className={`absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r ${getRolColor(miembro.rol)} text-white font-bold text-sm shadow-lg flex items-center gap-2`}>
                    <i className={`fas ${getRolIcon(miembro.rol)}`}></i>
                    {miembro.rol}
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {miembro.nombreCompleto}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <i className="fas fa-map-marker-alt text-red-500"></i>
                    <span className="font-medium">{miembro.ciudad}</span>
                  </div>

                  {miembro.especialidad && (
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <i className="fas fa-stethoscope text-blue-500"></i>
                      <span className="font-medium">{miembro.especialidad}</span>
                    </div>
                  )}

                  {miembro.experienciaAnios && (
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <i className="fas fa-clock text-green-500"></i>
                      <span className="font-medium">
                        {miembro.experienciaAnios === '0' ? 'Menos de 1 año' : 
                         miembro.experienciaAnios === '5' ? 'Más de 5 años' : 
                         `${miembro.experienciaAnios}+ años de experiencia`}
                      </span>
                    </div>
                  )}

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {miembro.descripcion}
                  </p>

                  {miembro.tiposMascotas && miembro.tiposMascotas.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-500 mb-2">Experiencia con:</p>
                      <div className="flex flex-wrap gap-2">
                        {miembro.tiposMascotas.map((tipo) => (
                          <span
                            key={tipo}
                            className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-medium"
                          >
                            {tipo}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {miembro.disponibilidadDias && miembro.disponibilidadDias.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-500 mb-2">Disponibilidad:</p>
                      <p className="text-sm text-gray-700">
                        {miembro.disponibilidadDias.length === 7 
                          ? 'Toda la semana' 
                          : miembro.disponibilidadDias.join(', ')}
                      </p>
                    </div>
                  )}

                  {/* Botones de Contacto */}
                  <div className="flex gap-2 mt-4">
                    {miembro.telefono && (
                      <a
                        href={`tel:${miembro.telefono}`}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-lg font-semibold text-center hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <i className="fas fa-phone"></i>
                        Llamar
                      </a>
                    )}
                    {miembro.email && (
                      <a
                        href={`mailto:${miembro.email}`}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-semibold text-center hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <i className="fas fa-envelope"></i>
                        Email
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje si no hay resultados */}
          {miembrosFiltrados.length === 0 && (
            <div className="text-center py-16">
              <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
              <p className="text-xl text-gray-500">
                No se encontraron miembros del equipo con este filtro
              </p>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">¿Quieres unirte a nuestro equipo?</h2>
            <p className="text-lg mb-6 opacity-90">
              Estamos buscando paseadores apasionados que quieran ser parte de nuestra familia
            </p>
            <a
              href="/paseador"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Regístrate como Paseador
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
