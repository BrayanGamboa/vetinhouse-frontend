import { useEffect, useRef, useState } from 'react';

interface MapPosition {
  lat: number;
  lng: number;
}

interface UseGoogleMapsProps {
  center: MapPosition;
  zoom?: number;
}

export const useGoogleMaps = ({ center, zoom = 15 }: UseGoogleMapsProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps && mapRef.current) {
        const mapInstance = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            }
          ]
        });
        
        setMap(mapInstance);
        setIsLoaded(true);
      } else {
        setTimeout(checkGoogleMaps, 100);
      }
    };

    checkGoogleMaps();
  }, [center, zoom]);

  const addMarker = (position: MapPosition, title: string, icon?: string) => {
    if (!map) return null;

    const marker = new google.maps.Marker({
      position,
      map,
      title,
      icon: icon || undefined
    });

    return marker;
  };

  const addPolyline = (path: MapPosition[], color = '#4CAF50') => {
    if (!map) return null;

    const polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 3
    });

    polyline.setMap(map);
    return polyline;
  };

  return {
    mapRef,
    map,
    isLoaded,
    addMarker,
    addPolyline
  };
};