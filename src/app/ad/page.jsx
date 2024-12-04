"use client";

import Filters from "@/components/common/filters";
import ScrollToTopButton from "@/components/common/ScrollToTopButton.jsx";
import ListAd from "@/components/pages/ListAd.jsx";
import adsDataJson from "@/data/ad.json";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Ad = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [openCategory, setOpenCategory] = useState("");
  const [adsData, setAdsData] = useState([]); // État pour stocker les annonces
  const [loading, setLoading] = useState(true); // Pour gérer l'état de chargement
  const [error, setError] = useState(null); // Pour gérer les erreurs

  // Récupération des paramètres de l'URL et filtrage
  useEffect(() => {
    const filter = searchParams.get("filter"); // Récupère le paramètre `filter` de l'URL
    if (filter) {
      console.log("Current URL filter:", filter); // Vérification du filtre récupéré dans l'URL
      window.scrollTo(0, 0); // Remonter en haut de la page
      setOpenCategory(filter); // Ouvre la catégorie correspondant au filtre récupéré
    } else {
      setOpenCategory(""); // Si aucun filtre, n'ouvre aucune catégorie par défaut
    }
  }, [searchParams]);

  // Chargement des données des annonces
  useEffect(() => {
    try {
      console.log(adsDataJson); // Vérification des données chargées
      setAdsData(adsDataJson); // Charge les annonces depuis le fichier JSON
      setLoading(false); // Arrête le chargement une fois les données récupérées
    } catch (err) {
      setError("Une erreur est survenue lors du chargement des annonces.");
      setLoading(false);
    }
  }, []);

  // Gestion des filtres
  const handleFilterChange = (subcategory) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(subcategory)
        ? prevFilters.filter((item) => item !== subcategory)
        : [...prevFilters, subcategory]
    );
  };

  const handleCategoryChange = (category) => {
    setOpenCategory(category);

    const currentParams = new URLSearchParams(searchParams.toString());
    if (category) {
      currentParams.set("filter", category); // Ajoute ou modifie le paramètre `filter`
    } else {
      currentParams.delete("filter"); // Supprime le paramètre `filter` si vide
    }
    router.push(`?${currentParams.toString()}`); // Met à jour l'URL avec les nouveaux paramètres
  };

  // Filtrage des annonces
  const filteredAds = adsData.filter((ad) => {
    if (selectedFilters.length === 0) {
      return true; // Si aucun filtre sélectionné, afficher toutes les annonces
    }

    // Vérifier si une des sous-catégories de l'annonce correspond à un filtre sélectionné
    const matchesCategoryFilter = selectedFilters.includes(ad.category);
    const matchesSubcategoryFilter =
      Array.isArray(ad.subcategories) &&
      ad.subcategories.some((subcategory) =>
        selectedFilters.includes(subcategory)
      );

    return matchesCategoryFilter || matchesSubcategoryFilter;
  });

  // Affichage pendant le chargement
  if (loading) {
    return <div>Chargement des annonces...</div>;
  }

  // Affichage en cas d'erreur
  if (error) {
    return <div>Erreur : {error}</div>;
  }

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
    },
  ];

  return (
    <div className="my-24 flex h-auto w-full flex-col items-start gap-5 px-2 sm:w-full md:my-5 md:flex-row md:items-start md:justify-around xl:my-32">
      <div className="w-full md:w-80">
        <Filters
          filterData={filterData}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          openCategory={openCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <ListAd adsData={filteredAds} selectedFilters={selectedFilters} />
      <ScrollToTopButton />
    </div>
  );
};

export default Ad;