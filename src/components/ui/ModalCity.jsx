"use client";
import { useState } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

const CityModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Liste des villes
  const cities = [
    "Paris",
    "Lyon",
    "Marseille",
    "Toulouse",
    "Nice",
    "Nantes",
    "Bordeaux",
    "Strasbourg",
    "Lille",
    "Montpellier",
    "Rennes",
    "Le Havre",
    "Reims",
    "Saint-Étienne",
    "Le Mans",
    "Aix-en-Provence",
    "Clermont-Ferrand",
    "Antibes",
  ];

  // Filtrer la liste des villes en fonction du terme de recherche
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-5 shadow-lg">
        {/* Icône de fermeture avec FontAwesome */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={24} /> {/* Affiche l'icône de fermeture */}
        </button>
        <h2 className="mb-4 text-2xl font-semibold">Liste des villes</h2>
        <input
          type="text"
          placeholder="Rechercher une ville..."
          className="mb-4 w-full rounded border border-gray-300 p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="max-h-60 overflow-y-auto">
          {filteredCities.map((city, index) => (
            <li key={index} className="cursor-pointer p-2 hover:bg-gray-100">
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
