"use client";
import { useState, useEffect, Suspense } from "react";

// Liste des slogans
const slogans = [
  {
    before: "Nos réparations sont",
    strong: "garanties 6 mois",
    after: "",
    alt: "Slogan 1",
  },
  {
    before: "Ne jetez pas vos consoles et vos manettes usagées.",
    strong: "Revendez les",
    after: "!",
    alt: "Slogan 2",
  },
  {
    before: "Votre devis",
    strong: "gratuit",
    after: "en quelques clics",
    alt: "Slogan 3",
  },
  {
    before: "Nos produits",
    strong: "reconditionnés",
    after: "en vente",
    alt: "Slogan 4",
  },
  {
    before: "Possibilité de",
    strong: "matériel de prêt",
    after: "pendant le temps de réparation",
    alt: "Slogan 5",
  },
];

// Composant Carousel
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonction pour passer au slogan suivant
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slogans.length);
  };

  // Défilement automatique
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000); // Change le slogan toutes les 6 secondes
    return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage
  }, []);

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      {/* Texte avec transition */}
      <div
        className="min-h-20 w-full py-5 text-center font-openSans text-2xl text-gray-600 sm:text-3xl"
        aria-live="polite"
        role="status"
        aria-label="Carousel d'informations"
      >
        {slogans.map((slogan, index) => (
          <p
            key={index}
            className={`absolute h-auto min-h-4 w-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== currentIndex}
          >
            {slogan.before}{" "}
            <strong className="font-bold text-name-orange">
              {slogan.strong}
            </strong>{" "}
            {slogan.after}
          </p>
        ))}
      </div>
    </Suspense>
  );
};

export default Carousel;
