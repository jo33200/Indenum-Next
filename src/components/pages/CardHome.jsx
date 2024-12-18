import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";

const CardHome = () => {
  const cardData = [
    {
      title: "Notre Atelier",
      image: "/img/atelier.webp", // Chemin dans le dossier public
      subtitle: "Découvrir",
      link: "#atelier", // Lien interne
    },
    {
      title: "Besoin d'un devis rapide",
      image: "/img/casse.webp",
      subtitle: "En savoir plus",
      link: "/quote",
    },
    {
      title: "Service de proximité",
      image: "/img/proximite.webp",
      subtitle: "En savoir plus",
      link: "#proximite", // Lien interne
    },
    {
      title: "Nos Annonces en ligne",
      image: "/img/manette.webp",
      subtitle: "Voir catalogue",
      link: "/ad",
    },
    {
      title: "Service pièces détachées",
      image: "/img/pièces.webp",
      subtitle: "Voir catalogue",
      link: "/ad",
      filter: "pièces détachées",
    },
    {
      title: "Nous contacter",
      image: "/img/contact.webp",
      subtitle: "En savoir plus",
      link: "/contact",
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
      <div className="max-w-[280px] border bg-white shadow-lg">
        <div className="flex flex-col items-start gap-4 p-3">
          <h2 className="text-xl font-bold">{title}</h2>
          {link ? (
            <Link href={link} className="w-full">
              <div className="relative h-48 w-full">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="rounded-lg object-cover"
                  priority={true}
                />
              </div>
            </Link>
          ) : (
            <span className="w-full text-gray-500">
              Lien indisponible pour le moment
            </span>
          )}
          <h3 className="text-sm font-bold text-gray-400">
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
      <div className="grid max-w-screen-lg grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
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
