'use client';

import { useState, useEffect } from 'react';
import { fetchRates } from '@/services/api';
import Filters from '@/components/common/filters';
import ListRates from '@/components/pages/ListRates';

const RatesPage = () => {
  const [ratesData, setRatesData] = useState([]);
  const [filterData, setFilterData] = useState({ categories: [], subcategories: [], subsubcategories: [] });
  const [selectedFilters, setSelectedFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les filtres via l'API
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const res = await fetch('/api/rate/filters');
        if (!res.ok) throw new Error('Erreur lors du chargement des filtres');
        const data = await res.json();
        setFilterData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    loadFilters();
  }, []);

  // Charger les données des tarifs
  useEffect(() => {
    const loadRates = async () => {
      try {
        setLoading(true);
        const filteredRates = await fetchRates(selectedFilters); // Appel API avec les filtres
        setRatesData(filteredRates);
      } catch (err) {
        console.error("Erreur lors du chargement des tarifs :", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRates();
  }, [selectedFilters]); // Exécuter chaque fois que `selectedFilters` change

  // Gestion du chargement et des erreurs
  if (loading) return <div className="text-center">Chargement des tarifs...</div>;
  if (error) return <div className="text-center text-red-500">Erreur : {error}</div>;

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Composant de Filtres */}
      <Filters
        filterData={filterData}
        selectedFilters={selectedFilters}
        onFilterChange={(filters) => setSelectedFilters(filters)}
      />
      {/* Liste des Tarifs */}
      <ListRates ratesData={ratesData} selectedFilters={selectedFilters} />
    </div>
  );
};

export default RatesPage;
