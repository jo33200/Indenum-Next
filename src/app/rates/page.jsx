"use client";

import { useState, useEffect } from "react";
import Filters from "@/components/common/filters";
import ListRates from "@/components/pages/ListRates";

const Rates = () => {
  const [ratesData, setRatesData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Définition des filtres
  const filterData = [
    {
      category: "Telephone",
      options: ["Apple", "Samsung","Autres marques"],
    },
    {
      category: "Sous-catégorie",
      options: ["Nintendo", "Sony", "Xbox", "Apple", "Autres marques"],
    },
    {
      category: "Console",
      options: ["Switch Lite", "Switch", "PS4", "PS5", "Xbox Series", "Xbox One"],
    },
    {
      category: "Prix",
      options: ["<20€", "20€-50€", ">50€"],
    },
  ];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("/api/rates");
        if (!res.ok) throw new Error("Erreur lors du chargement des tarifs");
        const data = await res.json();
        setRatesData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const handleFilterChange = (filterCategory, filterValue) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterCategory]: filterValue,
    }));
  };

  if (loading) return <div>Chargement des tarifs...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/4">
        <Filters
          filterData={filterData}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className="w-full lg:w-3/4">
        <ListRates ratesData={ratesData} selectedFilters={selectedFilters} />
      </div>
    </div>
  );
};

export default Rates;
