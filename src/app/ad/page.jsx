"use client";

import Filters from "@/components/common/filters";
import ScrollToTopButton from "@/components/common/ScrollToTopButton.jsx";
import ListAd from "@/components/pages/ListAd.jsx";
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

  // Récupérer les données des annonces depuis l'API
  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/ads"); // Appelle l'API des annonces
        if (!response.ok)
          throw new Error("Erreur lors de la récupération des annonces");
        const data = await response.json();
        setAdsData(data);
      } catch (err) {
        console.error("Erreur :", err);
        setError("Impossible de charger les annonces.");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []); // Ne se déclenche qu'au montage du composant

  // Gestion des filtres depuis les paramètres de l'URL
  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter) {
      setOpenCategory(filter);
    } else {
      setOpenCategory("");
    }
  }, [searchParams]);

  // Gestion des filtres au clic
  const handleFilterChange = (subcategory) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(subcategory)
        ? prevFilters.filter((item) => item !== subcategory)
        : [...prevFilters, subcategory],
    );
  };

  const handleCategoryChange = (category) => {
    setOpenCategory(category);
    const currentParams = new URLSearchParams(searchParams.toString());
    if (category) {
      currentParams.set("filter", category);
    } else {
      currentParams.delete("filter");
    }
    router.push(`?${currentParams.toString()}`);
  };

  // Filtrage des annonces
  const filteredAds = adsData.filter((ad) => {
    if (selectedFilters.length === 0) {
      return true;
    }
    const matchesCategoryFilter = selectedFilters.includes(ad.category);
    const matchesSubcategoryFilter =
      Array.isArray(ad.subcategories) &&
      ad.subcategories.some((subcategory) =>
        selectedFilters.includes(subcategory),
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
