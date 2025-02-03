"use client";

import ButtonValid from "@/components/common/ButtonValid";
import emailjs from "@emailjs/browser";
import { useState } from "react";

const RequestQuote = () => {
  const [contactData, setContactData] = useState({
    civility: "",
    name: "",
    firstname: "",
    email: "",
    phone: "",
    deviceType: "",
    brand: "",
    model: "",
    description: "",
    previousIntervention: "",
    technicianDetails: "",
  });

  const [errors, setErrors] = useState({});

  const brandsByDeviceType = {
    smartphone: ["Apple", "Samsung", "Huawei", "Google", "Autres"],
    tablet: ["Apple", "Samsung", "Microsoft", "Lenovo", "Autres"],
    console: ["Sony", "Microsoft", "Nintendo", "Autres"],
    laptop: ["Apple", "Dell", "HP", "Asus", "Autres"],
    accessory: ["JBL", "Beats", "Anker", "Autres"],
    smartwatch: ["Apple", "Samsung", "Fitbit", "Garmin", "Autres"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });

    if (name === "deviceType") {
      setContactData((prev) => ({ ...prev, brand: "", model: "" }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
    if (name === "previousIntervention" && value === "oui") {
      setContactData((prev) => ({ ...prev, technicianDetails: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "civility",
      "name",
      "firstname",
      "email",
      "phone",
      "deviceType",
      "description",
    ];

    requiredFields.forEach((field) => {
      if (!contactData[field].trim()) {
        newErrors[field] = "Ce champ est requis.";
      }
    });

    if (contactData.deviceType && contactData.deviceType !== "autres") {
      if (!contactData.brand.trim()) {
        newErrors.brand = "La marque est requise.";
      }
      if (contactData.brand !== "Autres" && !contactData.model.trim()) {
        newErrors.model = "Le modèle est requis.";
      }
    }

    if (!contactData.previousIntervention) {
      newErrors.previousIntervention = "Veuillez sélectionner une option.";
    }

    if (
      contactData.previousIntervention === "oui" &&
      !contactData.technicianDetails.trim()
    ) {
      newErrors.technicianDetails = "Veuillez indiquer par qui";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendContactEmail = (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
  
    const serviceID = "service_8u3on86";
    const templateID = "template_service_form"; // Même template que pour BuyForm
    const userID = "jsje2aK89ggqzD2hl";
  
    // Ajout du formType pour identifier la demande
    const emailData = {
      ...formData,
      formType: "Devis",
    };
  
    emailjs.send(serviceID, templateID, emailData, userID)
      .then(() => {
        alert("Votre message a bien été envoyé ! Nous vous contacterons rapidement.");
        
        // Réinitialisation des champs
        setFormData({
          civility: "",
          name: "",
          firstname: "",
          email: "",
          phone: "",
          deviceType: "",
          brand: "",
          model: "",
          description: "",
          previousIntervention: "",
          technicianDetails: "",
        });
        setErrors({});
      })
      .catch((err) => console.error("Erreur d'envoi du message : ", err));
  };
  

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="mb-4 text-center text-3xl font-bold">Demandez un Devis</h1>
      <p className="mb-8 text-center text-gray-600">
        Remplissez le formulaire ci-dessous pour obtenir un devis rapide.
      </p>
      <form
        className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md"
        onSubmit={sendContactEmail}
      >
        {/* Civilité */}
        <div className="mb-4">
          <label
            className="mb-2 block font-semibold text-gray-700"
            htmlFor="civility"
          >
            Civilité
          </label>
          <select
            id="civility"
            name="civility"
            value={contactData.civility}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="honorific-prefix"
            required
          >
            <option value=""></option>
            <option value="Monsieur">Monsieur</option>
            <option value="Madame">Madame</option>
            <option value="Autres">Autres</option>
          </select>
          {errors.civility && (
            <p className="text-sm text-red-500">{errors.civility}</p>
          )}
        </div>

        {/* Nom */}
        <div className="mb-4">
          <label
            className="mb-2 block font-semibold text-gray-700"
            htmlFor="name"
          >
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={contactData.name}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre nom"
            required
            autoComplete="family-name"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-2 block font-semibold text-gray-700"
          >
            Votre prénom
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={contactData.firstname}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre prénom"
            required
            autoComplete="given-name"
          />
          {errors.firstname && (
            <p className="text-sm text-red-500">{errors.firstname}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            className="mb-2 block font-semibold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactData.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre adresse email"
            required
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Téléphone */}
        <div className="mb-4">
          <label
            className="mb-2 block font-semibold text-gray-700"
            htmlFor="phone"
          >
            Numéro de Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={contactData.phone}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre numéro de téléphone"
            required
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Catégorie de Service */}
        <div className="mb-4">
          <label
            className="mb-2 block font-semibold text-gray-700"
            htmlFor="deviceType"
          >
            Catégorie de Service
          </label>
          <select
            id="deviceType"
            name="deviceType"
            value={contactData.deviceType}
            onChange={handleChange}
            className={`w-full rounded-md border ${
              errors.deviceType ? "border-red-500" : "border-gray-300"
            } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Sélectionnez une catégorie de service</option>
            {Object.keys(brandsByDeviceType).map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
            <option value="autres">Autres</option>
          </select>
          {errors.deviceType && (
            <p className="text-sm text-red-500">{errors.deviceType}</p>
          )}
        </div>

        {/* Marque */}
        {contactData.deviceType && contactData.deviceType !== "autres" && (
          <div className="mb-4">
            <label className="mb-2 block text-gray-700" htmlFor="brand">
              Marque
            </label>
            <select
              id="brand"
              name="brand"
              value={contactData.brand}
              onChange={handleChange}
              className={`w-full rounded-md border ${
                errors.brand ? "border-red-500" : "border-gray-300"
              } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Sélectionnez une marque</option>
              {brandsByDeviceType[contactData.deviceType].map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
              <option value="autres">Autres</option>
            </select>
            {errors.brand && (
              <p className="text-sm text-red-500">{errors.brand}</p>
            )}
          </div>
        )}

        {/* Modèle */}
        {contactData.brand &&
          contactData.brand !== "Autres" &&
          contactData.deviceType !== "autres" && (
            <div className="mb-4">
              <label className="mb-2 block text-gray-700" htmlFor="model">
                Modèle
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={contactData.model}
                onChange={handleChange}
                className={`w-full rounded-md border ${
                  errors.model ? "border-red-500" : "border-gray-300"
                } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Entrez le modèle de votre appareil"
              />
              {errors.model && (
                <p className="text-sm text-red-500">{errors.model}</p>
              )}
            </div>
          )}

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
                  checked={contactData.previousIntervention === choice}
                  onChange={(e) =>
                    setContactData((prev) => ({
                      ...prev,
                      previousIntervention: e.target.value,
                      technicianDetails:
                        e.target.value === "non" ? "" : prev.technicianDetails, // Réinitialise si "non"
                    }))
                  }
                  className={`h-4 w-4 text-blue-500 focus:ring-blue-400 ${
                    errors.previousIntervention ? "border-red-500" : ""
                  }`}
                />
                <span>{choice === "oui" ? "Oui" : "Non"}</span>
              </label>
            ))}
          </div>
          {errors.previousIntervention && (
            <p className="text-sm text-red-500">
              {errors.previousIntervention}
            </p>
          )}

          {contactData.previousIntervention === "oui" && (
            <div className="mt-2">
              <input
                type="text"
                name="technicianDetails"
                value={contactData.technicianDetails}
                onChange={(e) =>
                  setContactData((prev) => ({
                    ...prev,
                    technicianDetails: e.target.value,
                  }))
                }
                placeholder="Par qui ?"
                className={`w-full rounded-md border ${
                  errors.technicianDetails
                    ? "border-red-500"
                    : "border-gray-300"
                } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.technicianDetails && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.technicianDetails}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Description du Problème */}
        <div className="mb-4">
          <label
            className="mb-2 block font-semibold text-gray-700"
            htmlFor="description"
          >
            Description du Problème
          </label>
          <textarea
            id="description"
            name="description"
            value={contactData.description}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="décrivez votre problème ici"
            required
          ></textarea>
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        <ButtonValid onClick={sendContactEmail} />
      </form>
    </div>
  );
};

export default RequestQuote;
