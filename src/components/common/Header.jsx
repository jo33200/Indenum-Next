"use client";
import Modal from "@/components/ui/ModalPhone";
import {
  faBars,
  faEnvelope,
  faPhone,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const phoneNumber = "07 66 44 13 37";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePhoneClick = () => {
    if (window.innerWidth < 768) {
      // Mobile : passe directement l'appel
      window.location.href = `tel:${phoneNumber.replace(/\s+/g, "")}`;
    } else {
      // Ordinateur/Tablet : affiche la modale
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 h-auto w-full bg-white md:relative">
      <div className="header-border-gradient flex h-auto w-full flex-row items-center justify-between px-4 py-2 lg:px-10">
        <section className="flex h-full">
          <div className="flex items-center justify-center gap-2">
            <Link href="/">
              <Image
                src="/img/Indenum.webp"
                alt="Logo de l'entreprise Indenum"
                className="h-auto w-52"
                width={200}
                height={50}
                style={{ objectFit: "contain" }}
              />
            </Link>
          </div>
        </section>

        {/* Menu de navigation */}
        <section className="hidden md:flex">
          <nav aria-label="Navigation principale" className="mt-2 w-full">
            <ul className="flex w-full items-center justify-center text-sm md:w-auto md:gap-5 md:text-base lg:gap-10">
              <li>
                <Link
                  href="/"
                  className="font-semibold text-gray-500 hover:scale-110"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/rate"
                  className="font-semibold text-gray-500 hover:scale-110"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="/ad"
                  className="font-semibold text-gray-500 hover:scale-110"
                >
                  Annonces
                </Link>
              </li>
              <li>
                <Link
                  href="/buy"
                  className="font-semibold text-gray-500 hover:scale-110"
                >
                  Rachat
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="font-semibold text-gray-500 hover:scale-110"
                >
                  Devis
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-semibold text-gray-500 hover:scale-110"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="mailto:indenum@outlook.com"
                  className="text-gray-500 hover:cursor-pointer"
                  aria-label="Envoyer un e-mail à Indenum"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="" />
                </a>
              </li>
              <li>
                <button
                  onClick={handlePhoneClick}
                  className="text-gray-500 focus:outline-none"
                  aria-label="Appeler le service client Indenum"
                >
                  <FontAwesomeIcon icon={faPhone} />
                </button>
              </li>
            </ul>
          </nav>
        </section>

        {/* Icône de menu burger pour petits écrans */}
        <section className="flex md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-500 focus:outline-none"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
          </button>
        </section>
      </div>

      {/* Menu burger pour petits écrans */}
      {isMenuOpen && (
        <section className="h-screen bg-white md:hidden">
          <nav
            aria-label="Navigation principale"
            className="flex flex-col items-center bg-white pt-24 md:hidden"
          >
            <ul className="w-full text-center text-3xl">
              <li className="py-6">
                <Link href="/" onClick={toggleMenu}>
                  Accueil
                </Link>
              </li>
              <li className="py-6">
                <Link href="/rate" onClick={toggleMenu}>
                  Tarifs
                </Link>
              </li>
              <li className="py-6">
                <Link href="/ad" onClick={toggleMenu}>
                  Annonces
                </Link>
              </li>
              <li className="py-6">
                <Link href="/buy" onClick={toggleMenu}>
                  Rachat
                </Link>
              </li>
              <li className="py-6">
                <Link href="/quote" onClick={toggleMenu}>
                  Devis
                </Link>
              </li>
              <li className="py-6">
                <Link href="/contact" onClick={toggleMenu}>
                  Contact
                </Link>
              </li>
              <li className="py-6">
                <a
                  href="mailto:indenum@outlook.com"
                  className="text-gray-500 hover:cursor-pointer"
                  onClick={toggleMenu}
                  aria-label="Envoyer un e-mail à Indenum"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="" />
                </a>
              </li>
              <li className="py-6">
                <button
                  onClick={handlePhoneClick}
                  className="text-gray-500 focus:outline-none"
                  aria-label="Appeler le service client Indenum"
                  role="button"
                >
                  <FontAwesomeIcon icon={faPhone} />
                </button>
              </li>
            </ul>
          </nav>
        </section>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Contactez-nous">
        <p className="my-5 text-gray-700">
          Pour toutes demandes d’information, n’hésitez pas à nous contacter au
          numéro suivant :
        </p>
        <p className="text-gray-700">{phoneNumber}</p>
        <p className="mt-5 text-gray-700">
          Nous sommes joignables du lundi au samedi
        </p>
        <p className="mb-9 text-gray-700">de 9h à 19h.</p>
      </Modal>
    </header>
  );
};

export default Header;
