import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa"; // Importation de l'icône croix
import { HiChevronDoubleLeft } from "react-icons/hi";
import images from "../../assets/images";
import FakeScrollBar from "../ui/FakeScrollBar";

import ApplePay from "../../assets/img/applePay.svg";
import GooglePay from "../../assets/img/googlePay.svg";
import Mastercard from "../../assets/img/mastercard.svg";
import Paylib from "../../assets/img/paylib.svg";
import Paypal from "../../assets/img/paypal.svg";
import Visa from "../../assets/img/visa.svg";

const ModalRate = ({ rate, image, title, onClose }) => {
  if (!rate) return null;
  const isDesktop = window.innerWidth >= 1024;

  return (
    <div
      className="fixed inset-0 mt-16 flex justify-center md:items-center md:bg-black md:bg-opacity-50"
      onClick={onClose} // Ferme la modal lorsque l'utilisateur clique à l'extérieur
    >
      <div className="max-h-screen w-screen max-w-4xl overflow-hidden md:relative md:mx-6 md:mt-0 md:flex md:h-full md:max-h-[700px] md:justify-center md:p-7">
        <div className="absolute right-4 top-4 z-50 hidden rounded-full border-4 border-white p-1 text-center hover:bg-red-600 hover:text-black md:right-0 md:top-0 md:flex">
          <button
            onClick={onClose} // Ferme la modal lorsqu'on clique sur la croix
            className="text-white"
            aria-label="Fermer"
          >
            <FaTimes size={18} />
          </button>
        </div>
        <div
          className="relative flex h-full w-full flex-col items-center justify-between overflow-auto bg-white p-4 sm:p-6 md:flex-row md:gap-5 md:rounded-md md:p-4"
          onClick={(e) => e.stopPropagation()} // Empêche la fermeture lorsque l'on clique à l'intérieur de la modal
        >
          <div className="w-full sm:w-3/4 md:hidden">
            <button className="justify-beetwen flex items-center gap-1 pb-4">
              <HiChevronDoubleLeft
                size={20}
                onClick={onClose} // Ferme la modal lorsqu'on clique sur la croix
                className="block text-gray-500"
              />
              <p onClick={onClose}>Revenir en arrière</p>
            </button>
          </div>

          <section className="flex justify-center md:flex-1">
            <img
              src={images[image]}
              alt={title}
              className="h-auto w-3/4 border object-cover px-3 py-6 md:w-full md:px-6 md:py-20"
            />
          </section>
          <section className="flex flex-col items-start justify-between gap-6 px-6 py-1 sm:w-3/4 md:w-1/2 md:px-2 md:gap-auto md:h-full">
            <h3 className="w-full text-center text-2xl font-bold md:text-left lg:text-center">
              {rate.title}
            </h3>
            <p className="text-base text-gray-700">{rate.description}</p>
            <p className="text-sm text-gray-500 md:text-base">
              catégorie: {rate.category}
            </p>
            <p className="w-full rounded-3xl border-2 text-2xl font-bold md:py-2">
              {rate.price}€
            </p>
            <p className="text-gray-600 md:mt-4 md:text-lg">
              <strong>
                Garantie : Nous offrons une garantie de 6 mois sur tous nos
                produits.
              </strong>
            </p>
            <p className="text-sm">
              Tous nos prix comprennent la pièce et la main d’oeuvre
            </p>
            <div className="flex w-full flex-col gap-4">
              <h4 className="text-sm md:text-base">
                Moyens de paiement sur place :
              </h4>
              <div className="flex w-full items-center justify-between">
                <img src={Visa} alt="Visa" className="w-12" />
                <img src={Mastercard} alt="Mastercard" className="w-12" />
                <img src={Paylib} alt="Paylib" className="w-12" />
                <img src={ApplePay} alt="ApplePay" className="w-12" />
                <img src={Paypal} alt="Paypal" className="w-12" />
                <img src={GooglePay} alt="GooglePay" className="w-12" />
              </div>
              <p className="text-sm font-semibold lg:text-base">
                Espèces acceptées
              </p>
            </div>
          </section>
        </div>
      </div>
      <FakeScrollBar visible={isDesktop} />
    </div>
  );
};

ModalRate.propTypes = {
  rate: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired, // Fonction de fermeture de la modal
};

export default ModalRate;
