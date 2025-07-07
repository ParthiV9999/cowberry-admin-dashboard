// components/LiveLocationMap.tsx

import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L, { LatLngExpression, Marker as LeafletMarker } from 'leaflet';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationUpdater: React.FC<{
  position: LatLngExpression;
  markerRef: React.RefObject<LeafletMarker>;
}> = ({ position, markerRef }) => {
  const map = useMap();

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(position);
      map.setView(position, map.getZoom());
    }
  }, [position, map, markerRef]);

  return null;
};

const LiveLocationMap: React.FC = () => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const markerRef = useRef<LeafletMarker>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      (err) => {
        console.error('Geolocation error:', err);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!position) return <p>Locating...</p>;

  return (
    <MapContainer center={position} zoom={15} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={icon} ref={markerRef} />
      <LocationUpdater position={position} markerRef={markerRef} />
    </MapContainer>
  );
};

export default LiveLocationMap;
