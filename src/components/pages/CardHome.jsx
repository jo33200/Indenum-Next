import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/utils/supabaseClient";

const CardHome = () => {
  // Fonction pour générer une URL publique depuis Supabase
  const getSupabaseImageUrl = (fileName) => {
    const { data } = supabase.storage
      .from("home-images")
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  const cardData = [
    {
      title: "Notre Atelier",
      image: getSupabaseImageUrl("atelier.webp"), // URL générée pour Supabase
      subtitle: "Découvrir",
      link: "#atelier", // Lien interne
    },
    {
      title: "Faites réparer",
      image: getSupabaseImageUrl("reparation.webp"),
      subtitle: "Voir nos tarifs",
      link: "/rate",
    },
    {
      title: "Ne jetez pas, Vendez !",
      image: getSupabaseImageUrl("rachat.webp"),
      subtitle: "proposer votre article",
      link: "/buy",
    },
    {
      title: "Devis personnalisé",
      image: getSupabaseImageUrl("casse.webp"),
      subtitle: "En savoir plus",
      link: "/quote",
    },
    {
      title: "Service de proximité",
      image: getSupabaseImageUrl("proximite.webp"),
      subtitle: "En savoir plus",
      link: "#proximite",
    },
    {
      title: "Nos Annonces en ligne",
      image: getSupabaseImageUrl("manette.webp"),
      subtitle: "Voir catalogue",
      link: "/ad",
    },
    {
      title: "Service pièces détachées",
      image: getSupabaseImageUrl("pieces.webp"),
      subtitle: "Voir catalogue",
      link: "/spareParts",
    },
    {
      title: "Besoin d'un prêt ?",
      image: getSupabaseImageUrl("ManetteDePret.webp"),
      subtitle: "En savoir plus",
      link: "#loan",
    },
  ];

  // Composant Card
  const Card = ({ title, image, subtitle, link, filter }) => {
    const handleAnchorClick = (event) => {
      if (link.startsWith("#")) {
        event.preventDefault();
        const targetElement = document.querySelector(link);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    return (
      <div className="max-w-[280px] border bg-white shadow-lg sm:w-[280px]">
        <div className="flex flex-col items-start gap-4 p-3">
          <h2 className="text-xl font-bold">{title}</h2>
          {link ? (
            <Link href={link} className="w-full">
              <div className="relative h-48 w-full">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="rounded-lg object-cover"
                />
              </div>
            </Link>
          ) : (
            <span className="w-full text-gray-500">
              Lien indisponible pour le moment
            </span>
          )}
          <h3 className="text-sm font-semibold text-gray-600">
            {filter ? (
              <Link href={`${link}?filter=${encodeURIComponent(filter)}`}>
                {subtitle}
              </Link>
            ) : link.startsWith("#") ? (
              <a href={link} onClick={handleAnchorClick}>
                {subtitle}
              </a>
            ) : (
              <Link href={link}>{subtitle}</Link>
            )}
          </h3>
        </div>
      </div>
    );
  };

  Card.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    filter: PropTypes.string,
  };

  // Retourne la liste des cartes
  return (
    <div className="flex justify-center">
      <div className="grid w-full max-w-screen-lg grid-cols-1 gap-6 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-10 xl:grid xl:max-w-screen-xl xl:grid-cols-4 xl:gap-6">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            image={card.image}
            subtitle={card.subtitle}
            link={card.link}
            filter={card.filter}
          />
        ))}
      </div>
    </div>
  );
};

export default CardHome;
