'use client;'

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ListRates from "@/components/pages/ListRates";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import Filters from "@/components/common/Filters";
import RatesData from "@/data/rate.json";
import Link from "next/link";

const Rate = () => {
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [openCategory, setOpenCategory] = useState("");
  const [ratesData, setRatesData] = useState([]);
  const [loading, setLoading] = useState(true); // Pour gérer l'état de chargement
  const [error, setError] = useState(null); // Pour gérer les erreurs

  // Gestion des filtres via URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get("filter");
    window.scrollTo(0, 0); // Remonter en haut de la page
    if (filter) {
      setOpenCategory(filter); // Ouvre la catégorie correspondant au filtre récupéré
    } else {
      setOpenCategory(""); // Si aucun filtre, n'ouvre aucune catégorie par défaut
    }
  }, [router.query]);

  // Charger les données depuis le fichier JSON
  useEffect(() => {
    try {
      setRatesData(RatesData); // Charger les données des cartes depuis le fichier JSON
      setLoading(false); // Arrêter le chargement une fois les données chargées
    } catch (err) {
      setError(err); // Gérer les erreurs de chargement
      setLoading(false); // Arrêter le chargement en cas d'erreur
    }
  }, []);

  const handleFilterChange = (newSelectedFilters) => {
    setSelectedFilters(newSelectedFilters);
  };

  const handleCategoryChange = (category) => {
    setOpenCategory(category);
  };

  if (loading) {
    return <div>Loading...</div>; // Afficher un message de chargement
  }

  if (error) {
    return <div>Error loading data</div>; // Afficher un message d'erreur
  }

  return (
    <div className="my-24 flex h-auto w-full flex-col items-start gap-5 px-2 sm:w-full md:my-5 md:flex-row md:items-start md:justify-around xl:my-32">
      <div className="w-full md:w-80">
        <Filters
          filterData={ratesData}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          openCategory={openCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <div className="w-full md:flex-1">
        <ListRates ratesData={ratesData} selectedFilters={selectedFilters} />
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default Rate;
