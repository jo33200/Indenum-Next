"use client";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ContactMap = () => {
  const position = [44.868027578053166, -0.6080236082763149]; // Coordonnées de votre adresse

  // Icône personnalisée pour le marqueur
  const customIcon = L.divIcon({
    className: "custom-icon", // Classe CSS pour personnaliser l'icône
    html: `<span class="text-red-500 text-4xl" style="font-weight: bold;">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2C8.134 2 5 5.134 5 9c0 3.833 7 11 7 11s7-7.167 7-11c0-3.866-3.134-7-7-7zm0 15c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" fill="white" stroke="red" stroke-width="4"/>
             </svg>
           </span>`,
    iconSize: [40, 40], // Taille de l'icône
    iconAnchor: [20, 40], // Ancrage de l'icône
  });

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "200px", width: "100%" }}
      scrollWheelZoom={false}
      zoomSnap={1}
      className="z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        minZoom={1} // Niveau de zoom minimum
        maxZoom={19} // Niveau de zoom maximum
        noWrap={true} // Empêche la carte de se répéter sur elle-même
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          <a
            href="https://www.google.com/maps?q=44.868027578053166,-0.6080236082763149"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Voir sur Google Maps
          </a>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default ContactMap;
