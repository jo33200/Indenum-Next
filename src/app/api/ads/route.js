import adsData from "@/data/ad.json";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const priceRange = searchParams.get('price');

    let filteredAds = adsData;

    if (category) {
      filteredAds = filteredAds.filter(ad => ad.category === category);
    }

    if (subcategory) {
      filteredAds = filteredAds.filter(ad => ad.subcategories && ad.subcategories.includes(subcategory));
    }

    if (priceRange) {
      filteredAds = filteredAds.filter(ad => {
        const price = parseFloat(ad.price);
        switch(priceRange) {
          case '<20€':
            return price < 20;
          case '20€-50€':
            return price >= 20 && price <= 50;
          case '>50€':
            return price > 50;
          default:
            return true;
        }
      });
    }

    return new Response(JSON.stringify(filteredAds), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erreur API ads :", error);
    return new Response("Erreur serveur", { status: 500 });
  }
}

