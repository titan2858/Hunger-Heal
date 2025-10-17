import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getAddressFromLatLng } from '../services/geocodeService';

// ... (Leaflet icon fix code remains the same) ...
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


function LocationMarker({ position, setPosition, onLocationSelect }) {
  const map = useMapEvents({
    async click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const address = await getAddressFromLatLng(e.latlng.lat, e.latlng.lng);
      onLocationSelect(address); // Update parent directly
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

const MapInput = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  return (
    <div className="h-80 w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer center={[16.85, 74.58]} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
};

export default MapInput;