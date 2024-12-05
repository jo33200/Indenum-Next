import adsData from "@/data/ad.json";

export async function GET(request, { params }) {
  const { id } = params; // Récupérer l'ID depuis l'URL
  const ad = adsData.find((ad) => ad.title.replace(/ /g, "-") === id);

  if (ad) {
    return new Response(JSON.stringify(ad), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ error: "Annonce non trouvée" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
