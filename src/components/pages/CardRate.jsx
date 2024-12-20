import PropTypes from "prop-types";
import Image from "next/image";

const CardRate = ({
  title,
  description,
  category,
  price,
  image,
  onCardClick,
}) => {
  return (
    <div
      onClick={onCardClick}
      className="flex h-auto w-full cursor-pointer flex-col items-start justify-between rounded border border-gray-300 bg-white shadow-lg xl:max-w-64 xl:gap-5 xl:pb-3"
    >
      <div className="flex h-32 w-full items-center justify-center">
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="h-3/4 w-2/4 max-w-28 object-fill lg:h-full lg:w-2/4 lg:max-w-full"
        />
      </div>
      <div className="flex flex-col items-start justify-start px-2 xl:gap-2">
        <h3 className="line-clamp-1 text-left text-base font-bold lg:text-xl">
          {title}
        </h3>
        <p className="line-clamp-1 text-left text-xs text-gray-700 lg:text-base">
          {description}
        </p>
        <span className="text-sm text-gray-500">{category}</span>
        <p className="text-sm font-semibold md:text-base lg:text-lg">
          {price}€
        </p>
      </div>
    </div>
  );
};

CardRate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CardRate;
