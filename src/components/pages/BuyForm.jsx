"use client";

import ImageUploader from "@/components/ui/ImageUploader";
import { useState } from "react";
import ButtonValid from "@/components/common/ButtonValid";

const BuyForm = () => {
  const [formData, setFormData] = useState({
    civility: "",
    name: "",
    firstname: "",
    email: "",
    phone: "",
    deviceType: "",
    brand: "",
    model: "",
    aestheticCondition: "",
    functionalCondition: "",
    issueDescription: "",
    previousIntervention: "",
    technicianDetails: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Réinitialisation des champs conditionnels
    if (name === "functionalCondition" && value === "Fonctionne très bien") {
      setFormData((prev) => ({ ...prev, issueDescription: "" }));
    }
    if (name === "previousIntervention" && value === "oui") {
      setFormData((prev) => ({ ...prev, technicianDetails: "" }));
    }
  };

  const handleImagesChange = (images) => {
    setFormData((prev) => ({ ...prev, images }));
  };

  const sendEmail = () => {
    console.log("Formulaire envoyé :", formData);
    // Ajoutez ici votre logique pour envoyer les données via EmailJS ou autre
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <form className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
        {/* Civilité */}
        <div className="mb-4">
          <label className="mb-2 block font-semibold text-gray-700">
            Civilité
          </label>
          <select
            name="civility"
            value={formData.civility}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Sélectionnez</option>
            <option value="Monsieur">Monsieur</option>
            <option value="Madame">Madame</option>
          </select>
        </div>

        {/* Informations personnelles */}
        <div className="mb-4">
          <label className="mb-2 block font-semibold text-gray-700">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre nom"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-gray-700">
            Prénom
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre prénom"
            required
          />
        </div>

        {/* Catégorie */}
        <div className="mb-4">
          <label className="mb-2 block font-semibold text-gray-700">
            Catégorie
          </label>
          <select
            name="deviceType"
            value={formData.deviceType}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Sélectionnez</option>
            <option value="téléphone">Téléphone</option>
            <option value="tablette">Tablette</option>
            <option value="console">Console de Jeu</option>
            <option value="accessoire">Accessoires</option>
          </select>
        </div>

        {/* Marque et Modèle */}
        {formData.deviceType && (
          <>
            <div className="mb-4">
              <label className="mb-2 block font-semibold text-gray-700">Marque</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez la marque"
                required
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-semibold text-gray-700">Modèle</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez le modèle"
                required
              />
            </div>
          </>
        )}

        {/* État esthétique */}
        <div className="mb-4">
          <label className="mb-2 block font-semibold text-gray-700">
            État Esthétique
          </label>
          <div className="flex flex-wrap gap-4">
            {["Très bon état", "Bon état", "État moyen", "Mauvais état"].map(
              (condition) => (
                <label key={condition} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="aestheticCondition"
                    value={condition}
                    checked={formData.aestheticCondition === condition}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-400"
                  />
                  <span>{condition}</span>
                </label>
              ),
            )}
          </div>
        </div>

        {/* Fonctionnalité */}
        <div className="mb-4">
          <label className="mb-2 block font-semibold text-gray-700">
            Fonctionnalité
          </label>
          <div className="flex flex-wrap gap-4">
            {[
              "Fonctionne très bien",
              "Fonctionne mal",
              "Ne fonctionne plus",
            ].map((condition) => (
              <label key={condition} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="functionalCondition"
                  value={condition}
                  checked={formData.functionalCondition === condition}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400"
                />
                <span>{condition}</span>
              </label>
            ))}
          </div>
          {["Fonctionne mal", "Ne fonctionne plus"].includes(
            formData.functionalCondition,
          ) && (
            <div className="mt-2">
              <textarea
                name="issueDescription"
                value={formData.issueDescription}
                onChange={handleInputChange}
                placeholder="Expliquez le problème ou la panne"
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
          )}
        </div>

        {/* Intervention technique */}
        <div className="mb-4">
          <label className="mb-2 block font-semibold text-gray-700">
            Intervention technique déjà réalisée?
          </label>
          <div className="flex gap-4">
            {["oui", "non"].map((choice) => (
              <label key={choice} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="previousIntervention"
                  value={choice}
                  checked={formData.previousIntervention === choice}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400"
                />
                <span>{choice === "oui" ? "Oui" : "Non"}</span>
              </label>
            ))}
          </div>
          {formData.previousIntervention === "non" && (
            <div className="mt-2">
              <input
                type="text"
                name="technicianDetails"
                value={formData.technicianDetails}
                onChange={handleInputChange}
                placeholder="Par qui ?"
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
        </div>

        {/* Images */}
        <div className="mb-4">
          <label className="mb-2 block w-full pt-4 text-center font-semibold text-gray-700">
            Joindre des images
          </label>
          <ImageUploader maxImages={3} onImagesChange={handleImagesChange} />
        </div>

        <ButtonValid onClick={sendEmail} />
      </form>
    </div>
  );
};

export default BuyForm;
