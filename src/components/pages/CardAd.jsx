import PropTypes from "prop-types";
import Image from "next/image";

const CardAD = ({ title, description, price, image, url }) => {
  return (
    <div
      className="flex h-80 w-full flex-col items-start justify-between rounded border-solid bg-white shadow-lg xl:h-auto xl:max-w-64 xl:gap-5 xl:pb-3"
      role="article"
      aria-labelledby={`card-title-${title}`}
      aria-describedby={`card-description-${title}`}
    >
      <div className="h-40 w-full xl:h-52">
        <Image
          className="h-full w-full rounded-t-lg object-contain"
          src={image}
          alt={`Image de l'annonce : ${title}`}
          width={300}
          height={200}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
          priority={true}
        />
      </div>
      <div className="flex flex-col items-start justify-start px-2 xl:gap-2">
        <h3
          className="line-clamp-1 text-left text-base font-bold lg:text-xl"
          id={`card-title-${title}`}
        >
          {title}
        </h3>
        <p
          className="line-clamp-2 text-left text-xs text-gray-700 lg:text-base"
          id={`card-description-${title}`}
        >
          {description}
        </p>
        <p className="text-sm font-semibold md:text-base lg:text-lg">
          {price}€
        </p>
      </div>
      <div className="px-2 pb-3">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-name-orange px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
          aria-label={`Voir l'annonce : ${title}`}
        >
          Voir annonce
        </a>
      </div>
    </div>
  );
};

CardAD.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default CardAD;
