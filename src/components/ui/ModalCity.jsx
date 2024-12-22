"use client";
import { useState, useEffect, useRef } from "react";
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

  // Références pour le focus piégé
  const modalRef = useRef();
  const closeButtonRef = useRef();

  // Piéger le focus et gérer la touche Escape
  useEffect(() => {
    if (isOpen) {
      // Focus sur le bouton de fermeture
      closeButtonRef.current.focus();

      // Piéger le focus
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      const handleEscapeKey = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleTabKey);
      document.addEventListener("keydown", handleEscapeKey);

      return () => {
        document.removeEventListener("keydown", handleTabKey);
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-labelledby="Liste des villes"
      aria-describedby="La liste des villes disponibles pour un service de proximité"
      aria-modal="true"
      ref={modalRef}
    >
      <div className="relative w-full max-w-md rounded-lg bg-white p-5 shadow-lg">
        {/* Icône de fermeture */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Fermer la modale"
          ref={closeButtonRef}
        >
          <FaTimes size={24} />
        </button>

        {/* Titre de la modale */}
        <h2 id="modal-title" className="text-1xl mb-4 font-semibold">
          Liste des villes
        </h2>

        {/* Description masquée pour les lecteurs d'écran */}
        <p id="modal-description" className="sr-only">
          Recherchez une ville dans la liste en saisissant son nom dans le champ
          de recherche. Cliquez sur une ville pour la sélectionner.
        </p>

        {/* Champ de recherche */}
        <input
          type="text"
          placeholder="Rechercher une ville..."
          className="mb-4 w-full rounded border border-gray-300 p-2 text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Liste des villes */}
        <ul className="max-h-60 overflow-y-auto">
          {filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <li
                key={index}
                className="cursor-pointer p-2 text-base hover:bg-gray-100"
              >
                {city}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">Aucune ville trouvée</li>
          )}
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
