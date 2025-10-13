import { useEffect, useRef, useState } from 'react';

interface MapSectionProps {
  isEmergencyActive: boolean;
}

export default function MapSection({ isEmergencyActive }: MapSectionProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState('Parque El Poblado, Medellín');
  const [distance, setDistance] = useState('0.8');
  const [walkerPos, setWalkerPos] = useState({ lat: 6.2088, lng: -75.5648 });
  const [petPos, setPetPos] = useState({ lat: 6.2089, lng: -75.5649 });
  const [walkPath, setWalkPath] = useState<Array<{lat: number, lng: number}>>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  
  // Ruta realista siguiendo calles y parques de El Poblado, Medellín
  const plannedRoute = [
    // Inicio en Parque El Poblado
    { lat: 6.2088, lng: -75.5648 },
    // Caminar por Carrera 43A hacia el norte
    { lat: 6.2092, lng: -75.5648 },
    { lat: 6.2096, lng: -75.5648 },
    { lat: 6.2100, lng: -75.5648 },
    // Girar este por Calle 10
    { lat: 6.2100, lng: -75.5644 },
    { lat: 6.2100, lng: -75.5640 },
    { lat: 6.2100, lng: -75.5636 },
    // Girar norte por Carrera 42
    { lat: 6.2104, lng: -75.5636 },
    { lat: 6.2108, lng: -75.5636 },
    { lat: 6.2112, lng: -75.5636 },
    // Entrar al Parque Lleras
    { lat: 6.2115, lng: -75.5638 },
    { lat: 6.2117, lng: -75.5640 },
    { lat: 6.2118, lng: -75.5642 },
    // Dar vuelta en el parque
    { lat: 6.2118, lng: -75.5644 },
    { lat: 6.2117, lng: -75.5646 },
    { lat: 6.2115, lng: -75.5648 },
    { lat: 6.2113, lng: -75.5648 },
    // Regresar por Carrera 43
    { lat: 6.2110, lng: -75.5650 },
    { lat: 6.2106, lng: -75.5650 },
    { lat: 6.2102, lng: -75.5650 },
    // Girar oeste por Calle 9
    { lat: 6.2098, lng: -75.5650 },
    { lat: 6.2098, lng: -75.5652 },
    { lat: 6.2098, lng: -75.5654 },
    // Regresar al punto inicial
    { lat: 6.2094, lng: -75.5654 },
    { lat: 6.2090, lng: -75.5652 },
    { lat: 6.2088, lng: -75.5650 },
    { lat: 6.2088, lng: -75.5648 }
  ];

  useEffect(() => {
    const initMap = () => {
      if (!window.L || !mapRef.current) return;

      // Crear mapa
      const map = window.L.map(mapRef.current).setView([6.2088, -75.5648], 16);
      
      // Agregar tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(map);

      // Marcador paseador
      const walkerIcon = window.L.divIcon({
        html: '<div style="background:#4CAF50;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;border:3px solid white;box-shadow:0 2px 10px rgba(0,0,0,0.3)"><i class="fas fa-walking"></i></div>',
        iconSize: [30, 30],
        className: ''
      });

      // Marcador mascota
      const petIcon = window.L.divIcon({
        html: '<div style="background:#FF9800;width:25px;height:25px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"><i class="fas fa-paw"></i></div>',
        iconSize: [25, 25],
        className: ''
      });

      const walkerMarker = window.L.marker([walkerPos.lat, walkerPos.lng], { icon: walkerIcon }).addTo(map);
      const petMarker = window.L.marker([petPos.lat, petPos.lng], { icon: petIcon }).addTo(map);

      // Ruta planificada
      const plannedRoutePolyline = window.L.polyline(
        plannedRoute.map(p => [p.lat, p.lng]),
        { color: '#2196F3', weight: 3, opacity: 0.7, dashArray: '10, 10' }
      ).addTo(map);

      mapInstanceRef.current = map;
      markersRef.current = [walkerMarker, petMarker, plannedRoutePolyline];
      setWalkPath([walkerPos]);
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
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    intervalRef.current = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 0.01; // Incremento mucho más pequeño
        
        if (newProgress >= 1) {
          // Avanzar al siguiente punto de la ruta
          setRouteIndex(prevIndex => {
            const nextIndex = prevIndex + 1;
            return nextIndex >= plannedRoute.length - 1 ? 0 : nextIndex;
          });
          return 0;
        }
        
        return newProgress;
      });
    }, 200); // Actualización cada 200ms

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current as any);
    };
  }, []);

  // Actualizar posiciones basado en progreso
  useEffect(() => {
    if (!mapInstanceRef.current || routeIndex >= plannedRoute.length - 1) return;
    
    const currentPos = plannedRoute[routeIndex];
    const nextPos = plannedRoute[routeIndex + 1];
    
    // Interpolación suave entre puntos
    const newWalkerPos = {
      lat: currentPos.lat + (nextPos.lat - currentPos.lat) * progress,
      lng: currentPos.lng + (nextPos.lng - currentPos.lng) * progress
    };
    
    setWalkerPos(newWalkerPos);
    
    // Actualizar marcador del paseador con animación CSS
    if (markersRef.current[0]) {
      const marker = markersRef.current[0];
      marker.setLatLng([newWalkerPos.lat, newWalkerPos.lng]);
      
      // Agregar clase CSS para transición suave
      const markerElement = marker.getElement();
      if (markerElement) {
        markerElement.style.transition = 'all 0.1s ease-out';
      }
    }
    
    // La mascota sigue con ligero retraso
    const petOffset = progress * 0.7; // La mascota va un poco atrás
    const newPetPos = {
      lat: currentPos.lat + (nextPos.lat - currentPos.lat) * petOffset + (Math.random() - 0.5) * 0.00005,
      lng: currentPos.lng + (nextPos.lng - currentPos.lng) * petOffset + (Math.random() - 0.5) * 0.00005
    };
    
    setPetPos(newPetPos);
    
    if (markersRef.current[1]) {
      const petMarker = markersRef.current[1];
      petMarker.setLatLng([newPetPos.lat, newPetPos.lng]);
      
      // Agregar transición suave a la mascota también
      const petMarkerElement = petMarker.getElement();
      if (petMarkerElement) {
        petMarkerElement.style.transition = 'all 0.15s ease-out';
      }
    }
    
    // Actualizar ruta caminada menos frecuentemente
    if (progress > 0.5) {
      setWalkPath(path => {
        const lastPoint = path[path.length - 1];
        if (!lastPoint || 
            Math.abs(lastPoint.lat - newWalkerPos.lat) > 0.0001 || 
            Math.abs(lastPoint.lng - newWalkerPos.lng) > 0.0001) {
          return [...path, newWalkerPos];
        }
        return path;
      });
    }
    
    // Actualizar distancia más lentamente
    if (progress === 0) {
      setDistance(prev => (parseFloat(prev) + 0.008).toFixed(2));
    }
  }, [progress, routeIndex]);
  
  // Actualizar polyline
  useEffect(() => {
    if (!mapInstanceRef.current || walkPath.length < 2) return;
    
    if (markersRef.current[3]) {
      mapInstanceRef.current.removeLayer(markersRef.current[3]);
    }
    
    const pathPolyline = window.L.polyline(walkPath.map(p => [p.lat, p.lng]), {
      color: '#4CAF50',
      weight: 4,
      opacity: 0.7
    }).addTo(mapInstanceRef.current);
    
    markersRef.current[3] = pathPolyline;
  }, [walkPath]);

  const centerMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([walkerPos.lat, walkerPos.lng], 17);
    }
  };

  const refreshLocation = () => {
    const locations = [
      'Parque El Poblado, Medellín',
      'Parque Lleras, El Poblado', 
      'Jardín Botánico, Medellín'
    ];
    setCurrentLocation(locations[Math.floor(Math.random() * locations.length)]);
  };

  return (
    <div className="bg-white mx-auto max-w-6xl rounded-2xl shadow-lg overflow-hidden my-5">
      <div className="bg-green-500 text-white p-5 flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <i className="fas fa-map-marker-alt"></i>
          Ubicación en Tiempo Real
        </h2>
        
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={centerMap}
            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-colors duration-300 flex items-center gap-1"
          >
            <i className="fas fa-crosshairs"></i> Centrar
          </button>
          <button 
            onClick={refreshLocation}
            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm transition-colors duration-300 flex items-center gap-1"
          >
            <i className="fas fa-sync-alt"></i> Actualizar
          </button>
        </div>
      </div>
      
      <div className="relative">
        <div 
          ref={mapRef}
          className="h-96 w-full bg-gray-100"
          style={{ minHeight: '400px' }}
        />
        
        <div className="absolute bottom-5 left-5 right-5 bg-white/98 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <i className="fas fa-location-dot text-green-500"></i>
            <span className="font-medium">{currentLocation}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-700">
            <i className="fas fa-route text-green-500"></i>
            <span>{distance} km recorridos</span>
          </div>
          
          {isEmergencyActive && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
              <i className="fas fa-exclamation-triangle"></i>
              <span className="font-medium">Desviación detectada</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}