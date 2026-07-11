import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon path issues
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export function IndiaMap() {
  const position: [number, number] = [20.2961, 85.8245]; // Bhubaneswar coordinates
  
  return (
    <div className="h-[250px] w-full rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 relative z-0">
      <MapContainer 
        center={[22.0, 79.0]} // Center of India
        zoom={4} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Bhubaneswar, Odisha<br />India
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
