"use client";

import PropTypes from "prop-types";
import { usePathname } from "next/navigation";
import ContactMap from "@/components/features/ContactMap";

const ContactInfo = ({ isFooter = false }) => {
  const pathname = usePathname();

  // Vérifier si nous sommes sur la page contact
  const isContactPage = pathname === "/contact";

  return (
    <div
      className={
        isFooter ? "" : "mx-auto flex max-w-lg flex-col gap-10 p-8 lg:gap-24"
      }
    >
      {!isFooter && <h2 className="text-center text-2xl font-bold">Contact</h2>}

      <nav className="h-auto w-auto">
        <ul
          className={`flex flex-col ${
            isFooter
              ? "items-start justify-start gap-1 text-left"
              : "items-center justify-center gap-2 text-center"
          } `}
        >
          {isFooter && <li className="font-bold">Contact</li>}
          <li>
            350 avenue de la libération,
            <br /> 33110, Le Bouscat
          </li>
          <li>07 66 44 13 37</li>
          <li>indenum@outlook.com</li>
        </ul>
      </nav>

      {/* Afficher la carte uniquement si ce n'est pas le footer dans la page contact */}
      {(!isFooter || !isContactPage) && (
        <div
          role="region"
          aria-label="Carte interactive indiquant l'emplacement de l'entreprise"
          className={`${isFooter ? "" : "flex justify-center"}`}
        >
          <ContactMap className="md:w-100% max-w-40" />
        </div>
      )}
    </div>
  );
};

ContactInfo.propTypes = {
  isFooter: PropTypes.bool,
};

export default ContactInfo;
