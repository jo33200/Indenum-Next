import PropTypes from "prop-types";
import CardAd from "./CardAd";

const ListAd = ({ adsData, selectedFilters }) => {
  const filterAds = (ads) => {
    console.log("Filtres sélectionnés :", selectedFilters); // Vérifie les filtres actifs
    console.log("Annonces avant filtrage :", ads); // Vérifie les données d'entrée

    const filtered = ads.filter((ad) => {
      let matchesPrice = true;
      let matchesCategory = true;

      // Filtrage sur le prix
      if (selectedFilters.includes("Moins de 10€")) {
        matchesPrice = ad.price < 10;
      } else if (selectedFilters.includes("10€ à 30€")) {
        matchesPrice = ad.price >= 10 && ad.price <= 30;
      } else if (selectedFilters.includes("Plus de 30€")) {
        matchesPrice = ad.price > 30;
      }

      // Vérifie le filtrage par prix
      console.log(
        `Prix de l'annonce "${ad.title}":`,
        ad.price,
        "Match prix:",
        matchesPrice,
      );

      // Filtrage sur la catégorie
      if (selectedFilters.includes("Sony")) {
        matchesCategory = ad.subcategories === "Sony";
      } else if (selectedFilters.includes("Nintendo")) {
        matchesCategory = ad.subcategories === "Nintendo";
      } else if (selectedFilters.includes("Apple")) {
        matchesCategory = ad.subcategories === "Apple";
      }

      // Vérifie le filtrage par catégorie
      console.log(
        `Catégorie de l'annonce "${ad.title}":`,
        ad.subcategories,
        "Match catégorie:",
        matchesCategory,
      );

      return matchesPrice && matchesCategory;
    });

    console.log("Annonces après filtrage :", filtered); // Vérifie les annonces filtrées
    return filtered;
  };

  const filteredAds = filterAds(adsData);

  console.log("Annonces affichées :", filteredAds); // Vérifie ce qui est rendu

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
      price: PropTypes.number.isRequired, // Corrigé pour correspondre aux données JSON
      image: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      subcategories: PropTypes.string.isRequired, // Ajouté pour validation stricte
    }),
  ).isRequired,
  selectedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ListAd;
