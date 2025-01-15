import { createClient } from "@supabase/supabase-js";

// Initialisation du client Supabase côté serveur
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // Clé privée uniquement côté serveur
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Récupérer les annonces depuis la base de données
      const { data, error } = await supabase.from("ads").select("*");
      if (error) {
        console.error("Erreur lors de la récupération des annonces :", error.message);
        return res.status(500).json({ error: "Erreur lors de la récupération des annonces." });
      }

      // Retourner les données
      return res.status(200).json(data);
    } catch (error) {
      console.error("Erreur interne :", error.message);
      return res.status(500).json({ error: "Erreur interne du serveur." });
    }
  }

  // Méthode non autorisée
  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed.` });
}
