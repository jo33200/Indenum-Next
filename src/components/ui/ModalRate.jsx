"use client";

import Image from "next/image";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { HiChevronDoubleLeft } from "react-icons/hi";

const ModalRate = ({ rate, image, title, onClose }) => {
  if (!rate) return null;

  const modalRef = useRef();
  const closeButtonRef = useRef();

  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;

  // Gestion du scroll sur le body
  useEffect(() => {
    document.body.classList.add("no-scroll"); // Empêche le scroll

    return () => {
      document.body.classList.remove("no-scroll"); // Rétablit le scroll
    };
  }, []);

  // Gestion de la touche Escape et du focus piégé
  useEffect(() => {
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "Tab" && focusableElements) {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    if (modalRef.current) {
      closeButtonRef.current.focus();
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 mt-16 flex justify-center md:items-center md:bg-black md:bg-opacity-50"
      role="dialog"
      aria-labelledby="Informations sur la réparation"
      aria-describedby="toutes les informations qui concernent la réparation ainsi que les moyens de paiement acceptés"
      aria-modal="true"
      ref={modalRef}
      onClick={onClose} // Ferme la modal si clic à l'extérieur
    >
      <div
        className="gap-auto max-h-screen w-screen max-w-4xl overflow-hidden md:relative md:mx-6 md:mt-0 md:flex md:h-full md:max-h-[700px] md:justify-center md:p-7"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture au clic à l'intérieur
      >
        {/* Bouton de fermeture */}
        <div className="absolute right-4 top-4 z-50 hidden rounded-full border-4 border-white p-1 text-center hover:bg-red-600 hover:text-black md:right-0 md:top-0 md:flex">
          <button
            onClick={onClose}
            className="text-white"
            aria-label="Fermer la modale"
            ref={closeButtonRef}
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Contenu principal */}
        <div className="relative flex h-full w-full flex-col items-center justify-between overflow-auto bg-white p-4 sm:p-6 md:flex-row md:gap-5 md:rounded-md md:p-4">
          {/* Bouton retour (mobile) */}
          <div className="w-full sm:w-3/4 md:hidden">
            <button
              className="flex items-center justify-between gap-1 pb-4"
              onClick={onClose}
              aria-label="Revenir à la page précédente"
            >
              <HiChevronDoubleLeft size={20} className="block text-gray-500" />
              <p>Revenir en arrière</p>
            </button>
          </div>

          {/* Image */}
          <section className="flex justify-center md:flex-1">
            <Image
              src={image}
              alt={title}
              width={300}
              height={200}
              className="h-auto w-3/4 border object-cover px-3 py-6 md:w-full md:px-6 md:py-20"
            />
          </section>

          {/* Informations sur le tarif */}
          <section
            className="md:gap-auto flex flex-col items-start justify-between gap-3 px-6 py-1 sm:w-3/4 md:h-full md:w-1/2 md:px-2"
            id="modal-description"
          >
            <h3
              id="modal-title"
              className="w-full text-center text-2xl font-bold md:text-left lg:text-center"
            >
              {rate.title}
            </h3>
            <p className="text-base text-gray-700">{rate.description}</p>
            <p className="text-sm text-gray-500 md:text-base">
              Catégorie : {rate.category}
            </p>
            <p className="w-full rounded-3xl border-2 text-center text-2xl font-bold md:py-2 lg:w-20">
              {rate.price}€
            </p>
            <p className="text-gray-600 md:mt-4 md:text-lg">
              <strong>
                Garantie : Nous offrons une garantie de 6 mois sur tous nos
                produits.
              </strong>
            </p>
            <p className="text-sm">
              Tous nos prix comprennent la pièce et la main d’œuvre.
            </p>
            <div className="flex w-full flex-col gap-4">
              <h4 className="text-sm md:text-base">
                Moyens de paiement sur place :
              </h4>
              <div className="flex w-full items-center justify-between">
                <Image
                  src="/img/visa.webp"
                  alt="Visa"
                  width={48}
                  height={48}
                />
                <Image
                  src="/img/mastercard.webp"
                  alt="Mastercard"
                  width={48}
                  height={48}
                />
                <Image
                  src="/img/paylib.webp"
                  alt="Paylib"
                  width={48}
                  height={48}
                />
                <Image
                  src="/img/applePay.webp"
                  alt="ApplePay"
                  width={48}
                  height={48}
                />
                <Image
                  src="/img/paypal.webp"
                  alt="Paypal"
                  width={48}
                  height={48}
                />
                <Image
                  src="/img/googlePay.webp"
                  alt="GooglePay"
                  width={48}
                  height={48}
                />
              </div>
              <p className="text-sm font-semibold lg:text-base">
                Espèces acceptées.
              </p>
            </div>
          </section>
        </div>
      </div>
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
  onClose: PropTypes.func.isRequired,
};

export default ModalRate;
