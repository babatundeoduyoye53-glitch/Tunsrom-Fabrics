import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const position = [6.8195, 3.9173];

function LocationMap() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl shadow-black/20">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f8d98a]">Visit us</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-white">Olisa, Ijebu Ode, Ogun State</h3>
        <p className="mt-2 text-sm leading-6 text-white/65">
          Map marker centered on Ijebu Ode with Olisa listed as the store location.
        </p>
      </div>
      <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-[320px] w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Tunsrom Fabrics<br />Olisa, Ijebu Ode, Ogun State.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LocationMap;
