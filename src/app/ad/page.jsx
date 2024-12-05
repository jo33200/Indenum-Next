"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Filters from "@/components/common/filters";
import ListAd from "@/components/pages/ListAd";

const Ad = () => {
  const searchParams = useSearchParams();
  const [adsData, setAdsData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les données depuis l'API
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch("/api/ads");
        if (!res.ok) throw new Error("Erreur lors du chargement des annonces");
        const data = await res.json();
        setAdsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Gestion des filtres
  const handleFilterChange = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };

  // Filtrage des annonces
  const filteredAds = adsData.filter((ad) => {
    if (selectedFilters.length === 0) return true;

    const matchesCategory = selectedFilters.includes(ad.category);
    const matchesSubcategory = selectedFilters.includes(ad.subcategories);

    return matchesCategory || matchesSubcategory;
  });

  // Affichage pendant le chargement ou en cas d'erreur
  if (loading) return <div>Chargement des annonces...</div>;
  if (error) return <div>Erreur : {error}</div>;

  // Données des filtres spécifiques pour les annonces
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
        />
      </div>
      <ListAd adsData={filteredAds} />
    </div>
  );
};

export default Ad;

