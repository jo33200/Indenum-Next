"use client";
import ButtonValid from "@/components/common/ButtonValid";
import { useState } from "react";

const ContactForm = () => {
  const [contactData, setContactData] = useState({
    civility: "",
    name: "",
    firstname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    const requiredFields = [
      "civility",
      "name",
      "firstname",
      "email",
      "phone",
      "message",
    ];
    requiredFields.forEach((field) => {
      if (!contactData[field]?.trim()) {
        newErrors[field] = "Ce champ est requis.";
      }
    });

    // ✅ Validation de l'email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(contactData.email)) {
      newErrors.email = "Veuillez entrer une adresse email valide.";
    }

    // ✅ Validation du téléphone (10 chiffres)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(contactData.phone)) {
      newErrors.phone =
        "Veuillez entrer un numéro de téléphone valide à 10 chiffres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendContactEmail = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Veuillez corriger les erreurs.");
      return;
    }

    const emailData = {
      formType: "ContactForm",
      formData: contactData,
    };

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        alert("Votre message a bien été envoyé !");
        setContactData({
          civility: "",
          name: "",
          firstname: "",
          email: "",
          phone: "",
          message: "",
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
    <div className="mx-auto max-w-lg p-8" aria-labelledby="contact-form-title">
      <h2
        id="contact-form-title"
        className="mb-2 text-center text-2xl font-bold"
      >
        Service Client
      </h2>
      <p className="mb-6 text-center text-gray-600">
        Pour toute demande, vous pouvez nous envoyer un message
      </p>
      <form onSubmit={sendContactEmail} aria-describedby="form-description">
        <p id="form-description" className="sr-only">
          Formulaire pour nous envoyer un message avec votre nom, prénom, email,
          numéro de téléphone et message.
        </p>

        {/* Civilité */}
        <div className="mb-4">
          <label
            className="mb-1 block font-semibold text-gray-700"
            htmlFor="civility"
          >
            Civilité
          </label>
          <select
            id="civility"
            name="civility"
            value={contactData.civility}
            onChange={handleChange}
            className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
            className="mb-1 block font-semibold text-gray-700"
          >
            Votre nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={contactData.name}
            onChange={handleChange}
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre nom"
            required
            autoComplete="family-name"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-1 block font-semibold text-gray-700"
          >
            Votre prénom
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={contactData.firstname}
            onChange={handleChange}
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            htmlFor="email"
            className="mb-1 block font-semibold text-gray-700"
          >
            Votre adresse email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactData.email}
            onChange={handleChange}
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            htmlFor="phone"
            className="mb-1 block font-semibold text-gray-700"
          >
            Votre numéro de téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={contactData.phone}
            onChange={handleChange}
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre numéro de téléphone"
            required
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Message */}
        <div className="mb-4">
          <label
            htmlFor="message"
            className="mb-1 block font-semibold text-gray-700"
          >
            Votre message
          </label>
          <textarea
            id="message"
            name="message"
            value={contactData.message}
            onChange={handleChange}
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Écrivez votre message ici"
            maxLength="120"
            rows="4"
            required
            aria-describedby="message-helper"
          />
          <p id="message-helper" className="mt-1 text-sm text-gray-500">
            Maximum 120 caractères.
          </p>
          {errors.message && (
            <p className="text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        <ButtonValid
          onClick={sendContactEmail}
          aria-label="Envoyer votre message"
        />
      </form>
    </div>
  );
};

export default ContactForm;
