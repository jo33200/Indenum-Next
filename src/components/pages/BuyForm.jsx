"use client";

import ButtonValid from "@/components/common/ButtonValid";
import ImageUploader from "@/components/ui/ImageUploader";
import { useState } from "react";

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

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Réinitialisation des champs conditionnels
    if (name === "functionalCondition" && value === "Fonctionne très bien") {
      setFormData((prev) => ({ ...prev, issueDescription: "" }));
    }
    if (name === "previousIntervention" && value === "non") {
      setFormData((prev) => ({ ...prev, technicianDetails: "" }));
    }
  };

  const handleImagesChange = (files) => {
    const imageFiles = Array.from(files).filter((file) => file instanceof Blob); // Filtrer les fichiers valides

    if (imageFiles.length === 0) {
      console.error("❌ Aucun fichier valide sélectionné.");
      return;
    }

    Promise.all(
      imageFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () =>
            resolve({ filename: file.name, data: reader.result });
          reader.onerror = reject;
        });
      }),
    )
      .then((images) => {
        setFormData((prev) => ({ ...prev, images }));
      })
      .catch((error) => console.error("❌ Erreur conversion Base64:", error));
  };

  const validateForm = () => {
    const newErrors = {};

    // Champs obligatoires
    const requiredFields = [
      "civility",
      "name",
      "firstname",
      "email",
      "phone",
      "deviceType",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = "Ce champ est requis.";
      }
    });

    // ✅ Validation de l'email (Format correct)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Veuillez entrer une adresse email valide.";
    }

    // ✅ Validation du numéro de téléphone (Doit contenir exactement 10 chiffres)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phone)) {
      newErrors.phone =
        "Veuillez entrer un numéro de téléphone valide à 10 chiffres.";
    }

    // Validation de "fonctionnalité"
    if (!formData.functionalCondition) {
      newErrors.functionalCondition =
        "Veuillez sélectionner une fonctionnalité.";
    }

    // Validation de "intervention technique"
    if (!formData.previousIntervention) {
      newErrors.previousIntervention = "Veuillez sélectionner une option.";
    }

    // Validation conditionnelle : Marque et Modèle
    if (formData.deviceType && formData.deviceType !== "autres") {
      if (!formData.brand.trim()) {
        newErrors.brand = "La marque est requise.";
      }
      if (formData.brand !== "Autres" && !formData.model.trim()) {
        newErrors.model = "Le modèle est requis.";
      }
    }

    // Validation conditionnelle : Intervention technique
    if (
      formData.previousIntervention === "oui" &&
      !formData.technicianDetails.trim()
    ) {
      newErrors.technicianDetails = "Veuillez indiquer par qui.";
    }

    // Validation conditionnelle : Fonctionnalité
    if (
      ["Fonctionne mal", "Ne fonctionne plus"].includes(
        formData.functionalCondition,
      ) &&
      !formData.issueDescription.trim()
    ) {
      newErrors.issueDescription = "Veuillez décrire le problème.";
    }

    // ✅ Vérification que AU MOINS UNE IMAGE est présente
    if (formData.images.length === 0) {
      newErrors.images = "Veuillez ajouter au moins une image.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const emailData = {
      formType: "BuyForm",
      formData, // Toutes les données du formulaire
    };

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        alert("Votre message a bien été envoyé !");
        // Réinitialisation du formulaire
        setFormData({
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
          images: [],
        });
        setErrors({});
      } else {
        alert("Erreur lors de l'envoi du message.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur lors de l'envoi du message.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <form
        className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md"
        onSubmit={sendEmail}
      >
        {/* Civilité */}
        <div className="mb-4">
          <label
            htmlFor="civility"
            className="mb-2 block font-semibold text-gray-700"
          >
            Civilité
          </label>
          <select
            id="civility"
            name="civility"
            value={formData.civility}
            onChange={handleInputChange}
            className={`w-full rounded-md border ${
              errors.civility ? "border-red-500" : "border-gray-300"
            } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            autoComplete="honorific-prefix"
          >
            <option value="">Sélectionnez</option>
            <option value="Monsieur">Monsieur</option>
            <option value="Madame">Madame</option>
            <option value="Autre">Autre</option>
          </select>
          {errors.civility && (
            <p className="text-sm text-red-500">{errors.civility}</p>
          )}
        </div>

        {/* Nom */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-2 block font-semibold text-gray-700"
          >
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full rounded-md border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Entrez votre nom"
            autoComplete="family-name"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Prénom */}
        <div className="mb-4">
          <label
            htmlFor="firstname"
            className="mb-2 block font-semibold text-gray-700"
          >
            Prénom
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            className={`w-full rounded-md border ${
              errors.firstname ? "border-red-500" : "border-gray-300"
            } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Entrez votre prénom"
            autoComplete="given-name"
          />
          {errors.firstname && (
            <p className="text-sm text-red-500">{errors.firstname}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full rounded-md border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Entrez votre email"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Téléphone */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="mb-2 block font-semibold text-gray-700"
          >
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full rounded-md border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Entrez votre téléphone"
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Catégorie */}
        <div className="mb-4">
          <label
            htmlFor="deviceType"
            className="mb-2 block font-semibold text-gray-700"
          >
            Catégorie
          </label>
          <select
            id="deviceType"
            name="deviceType"
            value={formData.deviceType}
            onChange={handleInputChange}
            className={`w-full rounded-md border ${
              errors.deviceType ? "border-red-500" : "border-gray-300"
            } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Sélectionnez</option>
            <option value="téléphone">Téléphone</option>
            <option value="tablette">Tablette</option>
            <option value="console">Console de Jeu</option>
            <option value="accessoire">Accessoires</option>
          </select>
          {errors.deviceType && (
            <p className="text-sm text-red-500">{errors.deviceType}</p>
          )}
        </div>

        {/* Marque et Modèle */}
        {formData.deviceType && (
          <>
            <div className="mb-4">
              <label
                htmlFor="brand"
                className="mb-2 block font-semibold text-gray-700"
              >
                Marque
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className={`w-full rounded-md border ${
                  errors.brand ? "border-red-500" : "border-gray-300"
                } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Entrez la marque"
              />
              {errors.brand && (
                <p className="text-sm text-red-500">{errors.brand}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="model"
                className="mb-2 block font-semibold text-gray-700"
              >
                Modèle
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className={`w-full rounded-md border ${
                  errors.model ? "border-red-500" : "border-gray-300"
                } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Entrez le modèle"
              />
              {errors.model && (
                <p className="text-sm text-red-500">{errors.model}</p>
              )}
            </div>
          </>
        )}

        {/* État esthétique */}
        <div
          className="mb-4"
          role="group"
          aria-labelledby="aestheticCondition-label"
        >
          <label
            id="aestheticCondition-label"
            className="mb-2 block font-semibold text-gray-700"
          >
            État esthétique
          </label>
          <div className="flex gap-4">
            {["Bon", "moyen", "Mauvais"].map((condition, index) => {
              const conditionId = `aestheticCondition-${index}`;
              return (
                <div key={conditionId} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={conditionId}
                    name="aestheticCondition"
                    value={condition}
                    checked={formData.aestheticCondition === condition}
                    onChange={handleInputChange}
                    className={`${
                      errors.aestheticCondition ? "border-red-500" : ""
                    }`}
                  />
                  <label htmlFor={conditionId}>{condition}</label>
                </div>
              );
            })}
          </div>
          {errors.aestheticCondition && (
            <p className="text-sm text-red-500">{errors.aestheticCondition}</p>
          )}
        </div>

        {/* Fonctionnalité */}
        <div className="mb-4">
          <label className="mb-2 block font-semibold text-gray-700">
            Fonctionnalité
          </label>
          <div className="flex gap-4">
            {["Bien", "Moyen", "Hs"].map((condition) => (
              <label key={condition} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`functionalCondition-${condition}`}
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
          {errors.functionalCondition && (
            <p className="text-sm text-red-500">{errors.functionalCondition}</p>
          )}
          {["Fonctionne mal", "Ne fonctionne plus"].includes(
            formData.functionalCondition,
          ) && (
            <div className="mt-2">
              <textarea
                id="issueDescription"
                name="issueDescription"
                value={formData.issueDescription}
                onChange={handleInputChange}
                placeholder="Décrivez le problème ou la panne"
                className={`w-full rounded-md border ${
                  errors.issueDescription ? "border-red-500" : "border-gray-300"
                } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              ></textarea>
              {errors.issueDescription && (
                <p className="text-sm text-red-500">
                  {errors.issueDescription}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Intervention technique */}
        <div
          className="mb-4"
          role="group"
          aria-labelledby="previousIntervention-label"
        >
          <label
            id="previousIntervention-label"
            className="mb-2 block font-semibold text-gray-700"
          >
            Intervention technique déjà réalisée ?
          </label>
          <div className="flex gap-4">
            {["oui", "non"].map((choice, index) => {
              const choiceId = `previousIntervention-${index}`;
              return (
                <div key={choiceId} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={choiceId}
                    name="previousIntervention"
                    value={choice}
                    checked={formData.previousIntervention === choice}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={choiceId}>
                    {choice === "oui" ? "Oui" : "Non"}
                  </label>
                </div>
              );
            })}
          </div>
          {errors.previousIntervention && (
            <p className="text-sm text-red-500">
              {errors.previousIntervention}
            </p>
          )}
          {formData.previousIntervention === "oui" && (
            <div className="mt-2">
              <label htmlFor="technicianDetails" className="text-gray-700">
                Par qui ?
              </label>
              <input
                type="text"
                id="technicianDetails"
                name="technicianDetails"
                value={formData.technicianDetails}
                onChange={handleInputChange}
                placeholder="Par qui ?"
                className={`w-full rounded-md border ${
                  errors.technicianDetails
                    ? "border-red-500"
                    : "border-gray-300"
                } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.technicianDetails && (
                <p className="text-sm text-red-500">
                  {errors.technicianDetails}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Joindre des images */}
        <div className="mb-4">
          <ImageUploader
            id="imageUploader"
            maxImages={3}
            onImagesChange={handleImagesChange}
          />
          {errors.images && (
            <p className="text-sm text-red-500">{errors.images}</p>
          )}
        </div>

        {/* Bouton d'envoi */}
        <ButtonValid onClick={sendEmail} />
      </form>
    </div>
  );
};

export default BuyForm;
