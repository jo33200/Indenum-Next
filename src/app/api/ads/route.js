import adsData from "@/data/ad.json";

export async function GET() {
  try {
    return new Response(JSON.stringify(adsData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erreur API ads :", error);
    return new Response("Erreur serveur", { status: 500 });
  }
}
