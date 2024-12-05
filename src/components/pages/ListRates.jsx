import PropTypes from "prop-types";

const formatPrice = (price) => {
  if (!isNaN(price)) {
    return `${price}€`;
  }
  return price; // retourne "devis" ou "gratuit"
};

const ListRates = ({ ratesData, selectedFilters }) => {
  const filterRates = (rates) => {
    return rates.filter((rate) => {
      let matchesCategory = true;
      let matchesSubcategory = true;
      let matchesSubsubcategory = true;
      let matchesPrice = true;

      // Filtre par catégorie
      if (selectedFilters.category) {
        matchesCategory = rate.category === selectedFilters.category;
      }

      // Filtre par sous-catégorie
      if (selectedFilters.subcategory) {
        matchesSubcategory = rate.subcategory === selectedFilters.subcategory;
      }

      // Filtre par sous-sous-catégorie
      if (selectedFilters.subsubcategory) {
        matchesSubsubcategory =
          rate.subsubcategory === selectedFilters.subsubcategory;
      }

      // Filtre par prix
      if (selectedFilters.price) {
        const ratePrice = !isNaN(rate.price)
          ? parseFloat(rate.price)
          : rate.price;
        if (selectedFilters.price === "<20€") {
          matchesPrice = !isNaN(ratePrice) && ratePrice < 20;
        } else if (selectedFilters.price === "20€-50€") {
          matchesPrice =
            !isNaN(ratePrice) && ratePrice >= 20 && ratePrice <= 50;
        } else if (selectedFilters.price === ">50€") {
          matchesPrice = !isNaN(ratePrice) && ratePrice > 50;
        } else {
          matchesPrice = rate.price === selectedFilters.price;
        }
      }

      return (
        matchesCategory &&
        matchesSubcategory &&
        matchesSubsubcategory &&
        matchesPrice
      );
    });
  };

  const filteredRates = filterRates(ratesData);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {filteredRates.length > 0 ? (
        filteredRates.map((rate, index) => (
          <div key={rate.title + index} className="p-4 border rounded shadow">
            <img
              src={`/img/${rate.image}.jpg`}
              alt={rate.title}
              className="mb-2 w-full"
            />
            <h3 className="text-lg font-bold">{rate.title}</h3>
            <p>{rate.description}</p>
            <p className="font-semibold">{formatPrice(rate.price)}</p>
          </div>
        ))
      ) : (
        <p>Aucun résultat trouvé pour les filtres appliqués.</p>
      )}
    </div>
  );
};

ListRates.propTypes = {
  ratesData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      subcategory: PropTypes.string.isRequired,
      subsubcategory: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedFilters: PropTypes.shape({
    category: PropTypes.string,
    subcategory: PropTypes.string,
    subsubcategory: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
};

export default ListRates;
