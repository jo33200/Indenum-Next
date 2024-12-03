'use client';
import { useState } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa"; 

const CityModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Liste des villes
  const cities = [
    "Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Bordeaux",
    "Strasbourg", "Lille", "Montpellier", "Rennes", "Le Havre", "Reims",
    "Saint-Étienne", "Le Mans", "Aix-en-Provence", "Clermont-Ferrand", "Antibes"
  ];

  // Filtrer la liste des villes en fonction du terme de recherche
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-5 relative">
        {/* Icône de fermeture avec FontAwesome */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={24} /> {/* Affiche l'icône de fermeture */}
        </button>
        <h2 className="text-2xl font-semibold mb-4">Liste des villes</h2>
        <input
          type="text"
          placeholder="Rechercher une ville..."
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="max-h-60 overflow-y-auto">
          {filteredCities.map((city, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
              {city}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CityModal;


CityModal.propTypes = { 
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};