import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // Clé privée
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Récupérer les données de la table "rates"
      const { data: ratesData, error: ratesError } = await supabase
        .from("rates")
        .select("*");
      if (ratesError) {
        console.error(
          "Erreur lors de la récupération des données de rates:",
          ratesError.message
        );
        return res.status(500).json({ error: "Erreur lors de la récupération des données." });
      }

      // Fusionner les données avec des URLs simplifiées
      const combinedData = ratesData.map((rate) => ({
        ...rate,
        image: rate.image
          ? `/api/image-proxy/${rate.image}` // URL simplifiée pour accéder à l'image
          : null,
      }));

      return res.status(200).json(combinedData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error.message);
      return res.status(500).json({ error: "Erreur lors de la récupération des données." });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed.` });
}
