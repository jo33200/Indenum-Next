import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  const { imageName } = req.query;

  if (req.method === "GET") {
    try {
      const { data: file, error } = await supabase.storage
        .from("home-images")
        .download(imageName);

      if (error || !file) {
        console.error(`Erreur pour '${imageName}':`, error?.message);
        return res.status(404).json({ error: "Image non trouvée." });
      }

      const buffer = await file.arrayBuffer();
      const mimeType = file.type || "application/octet-stream";

      res.setHeader("Content-Type", mimeType);
      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.status(200).send(Buffer.from(buffer));
    } catch (error) {
      console.error("Erreur lors de la récupération de l'image :", error.message);
      return res.status(500).json({ error: "Erreur interne du serveur." });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed.` });
}
