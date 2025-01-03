"use client";
import { useState, useEffect, Suspense } from "react";

// Liste des slogans
const slogans = [
  { text: "Nos réparations sont garanties 6 mois", alt: "Slogan 1" },
  {
    text: "Ne jetez pas vos consoles et vos manettes usagées. Revendez les!",
    alt: "Slogan 2",
  },
  { text: "Votre devis gratuit en quelques clics", alt: "Slogan 3" },
  { text: "Nos produits reconditionnés, d'occasion", alt: "Slogan 4" },
  {
    text: "Possibilité de matériel de prêt pendant le temps de réparation",
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
            {slogan.text}
          </p>
        ))}
      </div>
    </Suspense>
  );
};

export default Carousel;
