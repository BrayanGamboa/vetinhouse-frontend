import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    L: any;
  }
}

interface Position {
  lat: number;
  lng: number;
}

export const useLeafletMap = (center: Position, zoom = 15) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initMap = () => {
      if (window.L && mapRef.current && !map) {
        const mapInstance = window.L.map(mapRef.current).setView([center.lat, center.lng], zoom);

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstance);

        setMap(mapInstance);
        setIsLoaded(true);
      }
    };

    if (window.L) {
      initMap();
    } else {
      const checkLeaflet = setInterval(() => {
        if (window.L) {
          clearInterval(checkLeaflet);
          initMap();
        }
      }, 100);
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [center, zoom]);

  const addMarker = (position: Position, icon: any) => {
    if (!map || !window.L) return null;
    return window.L.marker([position.lat, position.lng], { icon }).addTo(map);
  };

  const addPolyline = (path: Position[], options: any) => {
    if (!map || !window.L) return null;
    const latLngs = path.map(p => [p.lat, p.lng]);
    return window.L.polyline(latLngs, options).addTo(map);
  };

  const createDivIcon = (html: string, className = '', iconSize = [30, 30]) => {
    if (!window.L) return null;
    return window.L.divIcon({
      className,
      html,
      iconSize,
      iconAnchor: [iconSize[0] / 2, iconSize[1] / 2]
    });
  };

  return {
    mapRef,
    map,
    isLoaded,
    addMarker,
    addPolyline,
    createDivIcon
  };
};