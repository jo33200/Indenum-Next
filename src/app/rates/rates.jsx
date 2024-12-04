'use client;'

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ListRates from "@/components/pages/ListRates";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import Filters from "@/components/common/filters";
import RatesData from "@/data/rate.json";
import Link from "next/navigation";

const Rate = () => {
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [openCategory, setOpenCategory] = useState("");
  const [ratesData, setRatesData] = useState([]);
  const [loading, setLoading] = useState(true); // Pour gérer l'état de chargement
  const [error] = useState(null); // Pour gérer les erreurs

  // Gestion des filtres via URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get("filter");
    window.scrollTo(0, 0); // Remonter en haut de la page
    if (filter) {
      setOpenCategory(filter); // Ouvre la catégorie correspondant au filtre récupéré
    } else {
      setOpenCategory(""); // Si aucun filtre, n'ouvre aucune catégorie par défaut
    }
  }, [router]);

  // Charger les données depuis le fichier JSON
  useEffect(() => {
    setRatesData(RatesData); // Charger les données des cartes depuis le fichier JSON
    setLoading(false); // Arrêter le chargement une fois les données récupérées
  }, []);

  // Données de filtrage
  const filterData = [
    {
      category: "Téléphone",
      subcategories: ["Apple", "Samsung", "Xiaomi", "Huawei", "Oppo"],
    },
    {
      category: "Tablette",
      subcategories: ["Apple", "Samsung", "Huawei", "Lenovo", "Microsoft"],
    },
    {
      category: "Console",
      subcategories: ["Microsoft", "Sony", "Nintendo"],
      subsubcategories: [
        "PS4",
        "PS5",
        "Xbox One",
        "Xbox Series X",
        "Switch",
        "Switch Lite",
      ],
    },
  ];

  // Gérer l'ajout/suppression des filtres sélectionnés
  const handleFilterChange = (subcategory) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(subcategory)
        ? prevFilters.filter((item) => item !== subcategory)
        : [...prevFilters, subcategory],
    );
  };

  const handleCategoryChange = (category) => {
    setOpenCategory(category);
  };

  // Filtrer les données en fonction des filtres sélectionnés
  const filteredRates = ratesData.filter((rate) => {
    // Si aucun filtre sélectionné, on affiche tout
    if (selectedFilters.length === 0) {
      return true;
    }
    // Sinon, on vérifie si l'annonce correspond à l'un des filtres sélectionnés
    return (
      selectedFilters.includes(rate.category) ||
      selectedFilters.includes(rate.subcategory)
    );
  });

  // Affichage pendant le chargement
  if (loading) {
    return <div>Chargement des données...</div>;
  }

  // Affichage en cas d'erreur
  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="mt-24 md:mt-8 mb-8 flex h-auto w-full flex-col items-start gap-8 px-2 sm:w-full md:flex-row md:items-start md:justify-around xl:my-32">
      {/* Filtres */}
      <div className="flex w-full md:w-80 md:flex-col">
        <Filters
          filterData={filterData}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          openCategory={openCategory} // Passer la catégorie ouverte
          onCategoryChange={handleCategoryChange} // Gérer l'ouverture de la catégorie
        />
        <div className="hidden max-h-24 w-full rounded-lg border-[0.5px] border-zinc-200 p-1 md:mt-5 md:block md:max-h-full md:p-4">
          <p className="text-sm text-gray-700 md:mb-2 md:text-base">
            Si la réparation qui vous intéresse ne figure pas dans notre liste,
            vous pouvez demander un
          </p>
          <Link
            to="/quote"
            className="inline-block font-semibold text-blue-500 transition-colors duration-200 hover:cursor-pointer hover:text-blue-700 md:mt-6"
          >
            devis personnalisé
          </Link>
        </div>
      </div>
      <ListRates ratesData={filteredRates} selectedFilters={selectedFilters} />{" "}
      {/* Passer les annonces ici */}
      <div className="mt-5 max-h-full w-full rounded-lg border-[0.5px] border-zinc-200 p-4 md:hidden">
        <p className="mb-2 text-base font-semibold text-gray-700">
          Si la réparation qui vous intéresse ne figure pas dans notre liste,
          vous pouvez demander un
        </p>
        <Link
          to="/quote"
          className="mt-6 inline-block font-semibold text-blue-500 transition-colors duration-200 hover:cursor-pointer hover:text-blue-700"
        >
          devis personnalisé
        </Link>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default Rate;
