"use client";

import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import PropTypes from "prop-types";

const ContactInfo = ({ isFooter = false }) => {
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
          <li>
            <Link
              href="https://www.facebook.com/profile.php?id=100092448746131"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitez notre page Facebook"
              className="inline-block w-auto text-left text-blue-700 transition-colors duration-200 hover:cursor-pointer hover:text-blue-500 md:mt-1"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="rounded-full bg-white text-2xl"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

ContactInfo.propTypes = {
  isFooter: PropTypes.bool,
};

export default ContactInfo;
