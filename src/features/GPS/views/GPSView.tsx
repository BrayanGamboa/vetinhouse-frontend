import { useEffect, useRef, useState } from 'react';
import MainLayout from '../../../core/layouts/MainLayout';

interface Agente {
  id: string;
  nombre: string;
  tipo: 'Veterinario' | 'Paseador' | 'Emergencias';
  foto: string;
  ubicacion: {
    lat: number;
    lng: number;
    direccion: string;
  };
  disponible: boolean;
  telefono: string;
  especialidad?: string;
  calificacion: number;
  distancia: number; // en km
}

export default function GPSView() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agente | null>(null);
  const [userLocation] = useState({ lat: 6.2476, lng: -75.5658 }); // El Poblado, Medellín
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos');

  // 5 agentes simulados en diferentes ubicaciones de Medellín
  const agentes: Agente[] = [
    {
      id: '1',
      nombre: 'Dr. Carlos Méndez',
      tipo: 'Veterinario',
      foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
      ubicacion: {
        lat: 6.2442,
        lng: -75.5735,
        direccion: 'Clínica Veterinaria El Poblado, Calle 10 #43-80'
      },
      disponible: true,
      telefono: '+57 300 123 4567',
      especialidad: 'Cirugía General',
      calificacion: 4.8,
      distancia: 0.8
    },
    {
      id: '2',
      nombre: 'Laura Gómez',
      tipo: 'Paseador',
      foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      ubicacion: {
        lat: 6.2520,
        lng: -75.5640,
        direccion: 'Parque Lleras, El Poblado'
      },
      disponible: true,
      telefono: '+57 301 234 5678',
      especialidad: 'Perros grandes',
      calificacion: 4.9,
      distancia: 0.5
    },
    {
      id: '3',
      nombre: 'Dra. María Rodríguez',
      tipo: 'Veterinario',
      foto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
      ubicacion: {
        lat: 6.2380,
        lng: -75.5780,
        direccion: 'Centro Veterinario Provenza, Carrera 37 #8A-32'
      },
      disponible: false,
      telefono: '+57 302 345 6789',
      especialidad: 'Medicina Interna',
      calificacion: 4.7,
      distancia: 1.2
    },
    {
      id: '4',
      nombre: 'Miguel Castro',
      tipo: 'Emergencias',
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      ubicacion: {
        lat: 6.2560,
        lng: -75.5690,
        direccion: 'Base de Emergencias Norte, Calle 12 #40-15'
      },
      disponible: true,
      telefono: '+57 303 456 7890',
      especialidad: 'Urgencias 24/7',
      calificacion: 5.0,
      distancia: 1.0
    },
    {
      id: '5',
      nombre: 'Juan Pérez',
      tipo: 'Paseador',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      ubicacion: {
        lat: 6.2410,
        lng: -75.5620,
        direccion: 'Parque El Poblado, Carrera 43A #9-01'
      },
      disponible: true,
      telefono: '+57 304 567 8901',
      especialidad: 'Todas las razas',
      calificacion: 4.6,
      distancia: 0.6
    }
  ];

  const agentesFiltrados = filtroTipo === 'Todos' 
    ? agentes 
    : agentes.filter(a => a.tipo === filtroTipo);

  useEffect(() => {
    const initMap = () => {
      if (!window.L || !mapRef.current || mapInstanceRef.current) return;

      // Crear mapa centrado en la ubicación del usuario
      const map = window.L.map(mapRef.current).setView([userLocation.lat, userLocation.lng], 14);
      
      // Agregar tiles de OpenStreetMap
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Marcador del usuario (ubicación actual)
      const userIcon = window.L.divIcon({
        html: '<div style="background:#3B82F6;width:35px;height:35px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;border:4px solid white;box-shadow:0 4px 15px rgba(59,130,246,0.5);animation:pulse 2s infinite"><i class="fas fa-user"></i></div>',
        iconSize: [35, 35],
        className: ''
      });

      const userMarker = window.L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup('<div class="text-center font-semibold">📍 Tu ubicación</div>');

      markersRef.current.push(userMarker);

      // Agregar marcadores para cada agente
      agentesFiltrados.forEach((agente) => {
        const color = agente.tipo === 'Veterinario' ? '#10B981' : 
                      agente.tipo === 'Paseador' ? '#F59E0B' : 
                      '#EF4444';
        
        const icon = agente.tipo === 'Veterinario' ? 'fa-user-md' : 
                     agente.tipo === 'Paseador' ? 'fa-dog' : 
                     'fa-ambulance';

        const disponibleStyle = agente.disponible 
          ? `background:${color};` 
          : `background:#9CA3AF;opacity:0.7;`;

        const agenteIcon = window.L.divIcon({
          html: `<div style="${disponibleStyle}width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.3);cursor:pointer;transform:scale(1);transition:transform 0.2s"><i class="fas ${icon} text-lg"></i></div>`,
          iconSize: [40, 40],
          className: ''
        });

        const marker = window.L.marker([agente.ubicacion.lat, agente.ubicacion.lng], { icon: agenteIcon })
          .addTo(map)
          .on('click', () => {
            setSelectedAgent(agente);
            map.setView([agente.ubicacion.lat, agente.ubicacion.lng], 16);
          });

        // Popup con información básica
        marker.bindPopup(`
          <div class="text-center">
            <div class="font-bold text-gray-800 mb-1">${agente.nombre}</div>
            <div class="text-xs text-gray-600 mb-1">${agente.tipo}</div>
            <div class="text-xs ${agente.disponible ? 'text-green-600' : 'text-gray-500'} font-semibold">
              ${agente.disponible ? '✓ Disponible' : '✗ No disponible'}
            </div>
          </div>
        `);

        markersRef.current.push(marker);

        // Línea de distancia desde el usuario
        if (agente.disponible) {
          const line = window.L.polyline(
            [[userLocation.lat, userLocation.lng], [agente.ubicacion.lat, agente.ubicacion.lng]],
            { 
              color: color, 
              weight: 2, 
              opacity: 0.4, 
              dashArray: '5, 10' 
            }
          ).addTo(map);
          
          markersRef.current.push(line);
        }
      });

      mapInstanceRef.current = map;
    };

    // Esperar a que Leaflet cargue
    const checkLeaflet = () => {
      if (window.L) {
        initMap();
      } else {
        setTimeout(checkLeaflet, 100);
      }
    };
    checkLeaflet();

    return () => {
      markersRef.current.forEach(marker => {
        if (mapInstanceRef.current && marker) {
          mapInstanceRef.current.removeLayer(marker);
        }
      });
      markersRef.current = [];
      
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [filtroTipo]);

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Veterinario': return 'from-green-500 to-emerald-500';
      case 'Paseador': return 'from-orange-500 to-amber-500';
      case 'Emergencias': return 'from-red-500 to-rose-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Veterinario': return 'fa-user-md';
      case 'Paseador': return 'fa-dog';
      case 'Emergencias': return 'fa-ambulance';
      default: return 'fa-user';
    }
  };

  const centerOnAgent = (agente: Agente) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([agente.ubicacion.lat, agente.ubicacion.lng], 16);
      setSelectedAgent(agente);
    }
  };

  const resetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 14);
      setSelectedAgent(null);
    }
  };

  return (
    <MainLayout showBackgroundEffects={false}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-4 animate-pulse">
              <i className="fas fa-map-marked-alt text-5xl text-blue-600"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Agentes Cercanos
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra veterinarios, paseadores y equipos de emergencia cerca de ti en tiempo real
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {['Todos', 'Veterinario', 'Paseador', 'Emergencias'].map((filtro) => (
              <button
                key={filtro}
                onClick={() => setFiltroTipo(filtro)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  filtroTipo === filtro
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                }`}
              >
                {filtro}
              </button>
            ))}
          </div>

          {/* Contenedor Principal */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Mapa */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-5 flex justify-between items-center flex-wrap gap-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <i className="fas fa-map"></i>
                    Mapa en Tiempo Real
                  </h2>
                  
                  <button 
                    onClick={resetView}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-colors duration-300 flex items-center gap-2"
                  >
                    <i className="fas fa-crosshairs"></i> 
                    Centrar en mi ubicación
                  </button>
                </div>
                
                <div className="relative">
                  <div 
                    ref={mapRef}
                    className="h-[500px] w-full bg-gray-100"
                  />
                  
                  {/* Leyenda */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-2 text-sm">Leyenda</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">Tu ubicación</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">Veterinarios</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-700">Paseadores</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="text-gray-700">Emergencias</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                        <span className="text-gray-700">No disponible</span>
                      </div>
                    </div>
                  </div>

                  {/* Info flotante si hay agente seleccionado */}
                  {selectedAgent && (
                    <div className="absolute bottom-4 left-4 right-4 bg-white/98 backdrop-blur-sm p-4 rounded-xl shadow-lg border-2 border-blue-200 animate-slideUp">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-800 text-lg">{selectedAgent.nombre}</h3>
                        <button 
                          onClick={() => setSelectedAgent(null)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <i className={`fas ${getTipoIcon(selectedAgent.tipo)} text-blue-600`}></i>
                        <span>{selectedAgent.tipo} • {selectedAgent.especialidad}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <i className="fas fa-map-marker-alt text-red-500"></i>
                        <span>{selectedAgent.distancia} km de distancia</span>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={`tel:${selectedAgent.telefono}`}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-lg font-semibold text-center hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <i className="fas fa-phone"></i>
                          Llamar
                        </a>
                        <a
                          href="/cita"
                          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-semibold text-center hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <i className="fas fa-calendar"></i>
                          Agendar
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Lista de Agentes */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i className="fas fa-list"></i>
                  Agentes Disponibles ({agentesFiltrados.filter(a => a.disponible).length})
                </h2>

                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {agentesFiltrados
                    .sort((a, b) => a.distancia - b.distancia)
                    .map((agente) => (
                    <div
                      key={agente.id}
                      onClick={() => centerOnAgent(agente)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                        selectedAgent?.id === agente.id
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      } ${!agente.disponible && 'opacity-60'}`}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={agente.foto}
                          alt={agente.nombre}
                          className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/100';
                          }}
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-gray-800">{agente.nombre}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              agente.disponible 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {agente.disponible ? '● Disponible' : '● Ocupado'}
                            </span>
                          </div>
                          
                          <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getTipoColor(agente.tipo)} mb-2`}>
                            <i className={`fas ${getTipoIcon(agente.tipo)} mr-1`}></i>
                            {agente.tipo}
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-1">{agente.especialidad}</p>
                          
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1 text-yellow-500">
                              <i className="fas fa-star"></i>
                              <span className="font-semibold">{agente.calificacion}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <i className="fas fa-route"></i>
                              <span>{agente.distancia} km</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Estadísticas */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {agentesFiltrados.filter(a => a.tipo === 'Veterinario').length}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Veterinarios</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {agentesFiltrados.filter(a => a.tipo === 'Paseador').length}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Paseadores</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-rose-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        {agentesFiltrados.filter(a => a.tipo === 'Emergencias').length}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Emergencias</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-center text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">¿Necesitas atención inmediata?</h2>
            <p className="text-lg mb-6 opacity-90">
              Nuestro equipo de emergencias está disponible 24/7 para ayudarte
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="/emergencia"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <i className="fas fa-exclamation-triangle mr-2"></i>
                Activar Emergencia
              </a>
              <a
                href="/cita"
                className="inline-block bg-blue-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <i className="fas fa-calendar-alt mr-2"></i>
                Agendar Cita
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </MainLayout>
  );
}
