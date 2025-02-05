import nodemailer from "nodemailer";
import { google } from "googleapis";

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const convertImagesToBase64 = (images) => {
  if (!Array.isArray(images)) {
    return []; // Retourne un tableau vide si `images` n'existe pas
  }

  return images
    .filter((image) => image !== null && image.data) // Filtrer les images valides
    .map((image) => ({
      filename: image.filename || "image.jpg",
      content: image.data.split(",")[1], // Supprimer le préfixe "data:image/png;base64,"
      encoding: "base64",
    }));
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }
  console.log("📩 Données reçues :", req.body);

  const { formType, formData } = req.body;

  try {
    const OAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI,
    );
    OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    console.log("🔄 Obtention de l'Access Token...");
    const accessToken = await OAuth2Client.getAccessToken();

    if (!accessToken.token) {
      throw new Error("❌ Impossible d'obtenir un Access Token.");
    }
    console.log("✅ Access Token obtenu !");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // Génération du sujet et du contenu en fonction du formulaire
    let subject = "";
    let html = "";

    if (formType === "BuyForm") {
      subject = `Nouvelle demande d'achat - ${formData.deviceType}`;
      html = `
        <h1>Nouvelle demande d'achat</h1>
        <p><strong>Civilité :</strong> ${formData.civility}</p>
        <p><strong>Nom :</strong> ${formData.name}</p>
        <p><strong>Prénom :</strong> ${formData.firstname}</p>
        <p><strong>Email :</strong> ${formData.email}</p>
        <p><strong>Téléphone :</strong> ${formData.phone}</p>
        <p><strong>Catégorie :</strong> ${formData.deviceType}</p>
        <p><strong>Marque :</strong> ${formData.brand || "Non spécifié"}</p>
        <p><strong>Modèle :</strong> ${formData.model || "Non spécifié"}</p>
        <p><strong>Etat esthétique :</strong> ${formData.aesteticCondition || "Non spécifié"}</p>
        <p><strong>Etat fonctionnel :</strong> ${formData.functionalCondition || "Non spécifié"}</p>
        <p><strong>Intervention :</strong> ${formData.previousIntervention || "Non spécifié"}</p>
        <p><strong>Par qui :</strong> ${formData.technicianDetails || "Non spécifié"}</p>
      `;
    } else if (formType === "ContactForm") {
      subject = `Nouveau message de contact - ${formData.name}`;
      html = `
        <h1>Nouveau message de contact</h1>
        <p><strong>Civilité :</strong> ${formData.civility}</p>
        <p><strong>Nom :</strong> ${formData.name}</p>
        <p><strong>Prénom :</strong> ${formData.firstname}</p>
        <p><strong>Email :</strong> ${formData.email}</p>
        <p><strong>Téléphone :</strong> ${formData.phone}</p>
        <p><strong>Message :</strong> ${formData.message}</p>
      `;
    } else if (formType === "QuoteForm") {
      subject = `Demande de devis - ${formData.deviceType}`;
      html = `
        <h1>Demande de devis</h1>
        <p><strong>Civilité :</strong> ${formData.civility}</p>
        <p><strong>Nom :</strong> ${formData.name}</p>
        <p><strong>Prénom :</strong> ${formData.firstname}</p>
        <p><strong>Email :</strong> ${formData.email}</p>
        <p><strong>Téléphone :</strong> ${formData.phone}</p>
        <p><strong>Catégorie :</strong> ${formData.deviceType}</p>
        <p><strong>Marque :</strong> ${formData.brand || "Non spécifié"}</p>
        <p><strong>Modèle :</strong> ${formData.model || "Non spécifié"}</p>
        <p><strong>Intervention :</strong> ${formData.previousIntervention || "Non spécifié"}</p>
        <p><strong>Par qui :</strong> ${formData.technicianDetails || "Non spécifié"}</p>
        <p><strong>Description :</strong> ${formData.description}</p>
      `;
    } else {
      return res.status(400).json({ message: "Type de formulaire invalide" });
    }

    // Configuration de l'email
    const attachments = convertImagesToBase64(formData.images);

    const mailOptions = {
      from: `Formulaire <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject,
      html,
      attachments, // Ajout des pièces jointes
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);
    console.log("📨 Email envoyé avec succès !");

    res.status(200).json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur d'envoi d'email:", error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email" });
  }
}
