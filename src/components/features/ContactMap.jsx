"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Charger les composants React-Leaflet dynamiquement
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const ContactMap = () => {
  const position = [44.868027578053166, -0.6080236082763149];
  const [customIcon, setCustomIcon] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Charger Leaflet uniquement côté client
      const L = require("leaflet");

      // Définir une icône personnalisée avec Leaflet
      const icon = L.divIcon({
        className: "custom-icon",
        html: `<span class="text-red-500 text-4xl" style="font-weight: bold;">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2C8.134 2 5 5.134 5 9c0 3.833 7 11 7 11s7-7.167 7-11c0-3.866-3.134-7-7-7zm0 15c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" fill="white" stroke="red" stroke-width="4"/>
                 </svg>
               </span>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });
      setCustomIcon(icon);
      // Ajouter des attributs ARIA pour l'accessibilité
      L.Marker.prototype.on("add", function () {
        const element = this.getElement();
        if (element) {
          element.setAttribute("role", "button");
          element.setAttribute(
            "aria-label",
            "Marqueur indiquant l'emplacement au 350 avenue de la libération, Le Bouscat",
          );
          element.setAttribute("tabindex", "0");
        }
      });
    }
  }, []);

  if (!customIcon) {
    return null; // Attendre que l'icône soit prête
  }

  return (
    <MapContainer
      key={JSON.stringify(position)} // Clé unique basée sur la position
      center={position}
      zoom={15}
      style={{ height: "200px", width: "200px", zIndex: 0 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
