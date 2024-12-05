import ratesData from "@/data/rate.json";

export async function GET(request) {
  try {
    return new Response(JSON.stringify(ratesData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Erreur lors de la récupération des données", {
      status: 500,
    });
  }
}