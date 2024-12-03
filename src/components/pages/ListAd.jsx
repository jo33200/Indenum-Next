import PropTypes from "prop-types";
import CardAd from "./CardAd";

// Fonction pour extraire et convertir le prix depuis une chaîne comme "30€"
const extractPrice = (priceStr) => parseFloat(priceStr.replace("€", ""));

const ListAd = ({ adsData, selectedFilters }) => {
  const filterAds = (ads) => {
    return ads.filter((ad) => {
      let matchesPrice = true;
      let matchesCategory = true;

      // Filtrage sur le prix
      if (selectedFilters.includes("Moins de 10€")) {
        matchesPrice = extractPrice(ad.price) < 10;
      } else if (selectedFilters.includes("10€ à 30€")) {
        matchesPrice =
          extractPrice(ad.price) >= 10 && extractPrice(ad.price) <= 30;
      } else if (selectedFilters.includes("Plus de 30€")) {
        matchesPrice = extractPrice(ad.price) > 30;
      }

      // Vous pouvez ajouter d'autres conditions de filtrage, comme les catégories
      if (selectedFilters.includes("Manette")) {
        matchesCategory = ad.categories.some((category) =>
          category.subcategories.includes("Manette"),
        );
      }

      return matchesPrice && matchesCategory;
    });
  };

  const filteredAds = filterAds(adsData);

  return (
    <div className="grid w-full max-w-[1144px] grid-cols-2 justify-between gap-5 sm:grid-cols-3 sm:gap-3 lg:w-7/12 lg:gap-3 xl:w-auto xl:grid-cols-4 xl:gap-10">
      {filteredAds.length > 0 ? (
        filteredAds.map((ad) => (
          <CardAd
            key={ad.title}
            title={ad.title}
            description={ad.description}
            price={ad.price}
            image={ad.image}
            url={ad.url}
          />
        ))
      ) : (
        <p className="w-[256px]">Aucun résultat dans la recherche.</p>
      )}
    </div>
  );
};

ListAd.propTypes = {
  adsData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ListAd;
