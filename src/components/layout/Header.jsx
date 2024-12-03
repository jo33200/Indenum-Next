'use client';  
import {
  faBars,
  faEnvelope,
  faPhone,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Modal from "@/components/ui/ModalPhone";
import Image from "next/image";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const phoneNumber = "07 66 44 13 37";
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    // Code utilisant router
  }, [router]);


  const getLinkClass = (path) => {
    return `${
      router.pathname === path ? "scale-125" : ""
    } transition-transform duration-200 hover:scale-110 font-semibold text-gray-500`;
  };

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
    
    <header className="fixed md:relative top-0 z-50 h-auto w-full bg-white">
      <div className="header-border-gradient flex h-auto w-full flex-row items-center justify-between px-4 py-2 lg:px-10">
        <section className="flex h-full">
          <div className="flex items-center justify-center gap-2">
            <Link href="/under-construction">
              <Image src="/img/Indenum.png" 
              alt="Indenum" 
              className="h-auto w-52"
              width={200}
              height={50}
              style={{ objectFit: 'contain' }}
              priority={true}
              />
            </Link>
          </div>
        </section>

        {/* Menu de navigation */}
        <section className="hidden md:flex">
          <nav className="mt-2 w-full">
            <ul className="flex w-full items-center justify-center text-sm md:w-auto md:gap-5 md:text-base lg:gap-10">
              <li className={getLinkClass("/")}>
                <Link href="/under-construction">Accueil</Link>
              </li>
              <li className={getLinkClass("/rates")}>
                <Link href="/under-construction">Tarifs</Link>
              </li>
              <li className={getLinkClass("/ad")}>
                <Link href="/under-construction">Annonces</Link>
              </li>
              <li className={getLinkClass("/quote")}>
                <Link href="/under-construction">Devis</Link>
              </li>
              <li className={getLinkClass("/contact")}>
                <Link href="/under-construction">Contact</Link>
              </li>
              <li>
                <a
                  href="mailto:indenum@outlook.com"
                  className="text-gray-500 hover:cursor-pointer"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="" />
                </a>
              </li>
              <li>
                <button
                  onClick={handlePhoneClick}
                  className="text-gray-500 focus:outline-none"
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
        <nav className="flex flex-col items-center bg-white py-4 md:hidden">
          <ul className="w-full text-center">
            <li className="py-2">
              <Link href="/under-construction" 
              onClick={toggleMenu} 
              className={getLinkClass("/")}
              >
                Accueil
              </Link>
            </li>
            <li className="py-2">
              <Link
                href="/under-construction"
                onClick={toggleMenu}
                className={getLinkClass("/rates")}
              >
                Tarifs
              </Link>
            </li>
            <li className="py-2">
              <Link
                href="/under-construction"
                onClick={toggleMenu}
                className={getLinkClass("/ad")}
              >
                Annonces
              </Link>
            </li>
            <li className="py-2">
              <Link
                href="/under-construction"
                onClick={toggleMenu}
                className={getLinkClass("/quote")}
              >
                Devis
              </Link>
            </li>
            <li className="py-2">
              <Link
                href="/under-construction"
                onClick={toggleMenu}
                className={getLinkClass("/contact")}
              >
                Contact
              </Link>
            </li>
            <li className="py-2">
              <a
                href="mailto:indenum@outlook.com"
                className="text-gray-500 hover:cursor-pointer"
                onClick={toggleMenu}
              >
                <FontAwesomeIcon icon={faEnvelope} className="" />
              </a>
            </li>
            <li className="py-2">
              <button
                onClick={handlePhoneClick}
                className="text-gray-500 focus:outline-none"
              >
                <FontAwesomeIcon icon={faPhone} />
              </button>
            </li>
          </ul>
        </nav>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Contactez-nous">
        <p className="my-5 text-gray-700">
          Pour toutes demande d’information, N’hésitez pas à nous contacter au
          numéro suivant :
        </p>
        <p className="text-gray-700">{phoneNumber}</p>
        <p className="mt-5 text-gray-700">
          Nous sommes joignable du lundi au Samedi
        </p>
        <p className="mb-9 text-gray-700">de 9h à 19h.</p>
      </Modal>
    </header>
  );
};

export default Header;
