import PropTypes from "prop-types";
import CardAd from "./CardAd";

const ListAd = ({ adsData }) => {
  return (
    <div className="grid w-full max-w-[1144px] grid-cols-2 justify-between gap-5 sm:grid-cols-3 sm:gap-3 lg:w-7/12 lg:gap-3 xl:w-auto xl:grid-cols-4 xl:gap-10">
      {adsData.length > 0 ? (
        adsData.map((ad, index) => (
          <CardAd
            key={`${ad.title}-${index}`}
            title={ad.title}
            description={ad.description}
            price={ad.price}
            image={ad.image}
            url={ad.url}
          />
        ))
      ) : (
        <p className="w-[256px]">Aucune annonce disponible.</p>
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
    })
  ).isRequired,
};

export default ListAd;
