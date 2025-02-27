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
import { usePathname } from "next/navigation"; // Import pour détecter la route active
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const phoneNumber = "07 66 44 13 37";
  const pathname = usePathname(); // Récupère la route actuelle

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePhoneClick = () => {
    if (window.innerWidth < 768) {
      window.location.href = `tel:${phoneNumber.replace(/\s+/g, "")}`;
    } else {
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
              {[
                { href: "/", label: "Accueil" },
                { href: "/rate", label: "Tarifs" },
                { href: "/ad", label: "Annonces" },
                { href: "/buy", label: "Rachat" },
                { href: "/quote", label: "Devis" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-semibold text-gray-500 ${
                      pathname === link.href ? "text-name-orange" : ""
                    }`}
                  >
                    <span
                      className={`inline-block transition-transform ${
                        pathname === link.href ? "scale-125" : "hover:scale-110"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
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
            className="flex flex-col items-center bg-white pt-8 md:hidden"
          >
            <ul className="w-full text-center text-3xl">
              {[
                { href: "/", label: "Accueil" },
                { href: "/rate", label: "Tarifs" },
                { href: "/ad", label: "Annonces" },
                { href: "/buy", label: "Rachat" },
                { href: "/quote", label: "Devis" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li className="py-5" key={link.href}>
                  <Link
                    href={link.href}
                    onClick={toggleMenu}
                    className={`${
                      pathname === link.href ? "text-name-orange" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="py-5">
                <a
                  href="mailto:indenum@outlook.com"
                  className="text-gray-500 hover:cursor-pointer"
                  onClick={toggleMenu}
                  aria-label="Envoyer un e-mail à Indenum"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="" />
                </a>
              </li>
              <li className="py-5">
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
        <p className="mt-5 text-gray-700">Nous sommes joignables:</p>
        <p className="mb-9 text-gray-700">
          Lundi au Vendredi de 9h à 18h
          <br />
          Samedi de 9h à 16h
        </p>
      </Modal>
    </header>
  );
};

export default Header;
