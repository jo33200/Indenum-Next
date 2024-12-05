import adsData from "@/data/ad.json";

export async function GET() {
  return new Response(JSON.stringify(adsData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
