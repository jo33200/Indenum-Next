import React, { useEffect, useState } from "react";
import CardAd from "./CardAd";
import Link from "next/link";

const ListAd = () => {
  const [ads, setAds] = useState([]);
  const [filters, setFilters] = useState({
    subcategory: [],
    subsubcategory: [],
  });
  const [filteredAds, setFilteredAds] = useState([]);
  const [openCategories, setOpenCategories] = useState({});
  const [showAllFilters, setShowAllFilters] = useState(false);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("/api/ads");
        if (!response.ok) {
          throw new Error("Failed to fetch ads");
        }
        const data = await response.json();
        setAds(data);
        setFilteredAds(data); // Initialement, toutes les annonces sont affichées
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, []);

  // Mettre à jour les annonces filtrées en fonction des filtres
  useEffect(() => {
    let updatedAds = ads;

    if (filters.subcategory.length > 0) {
      updatedAds = updatedAds.filter((ad) =>
        filters.subcategory.includes(ad.subcategories),
      );
    }
    if (filters.subsubcategory.length > 0) {
      updatedAds = updatedAds.filter((ad) =>
        filters.subsubcategory.includes(ad.subsubcategory),
      );
    }

    setFilteredAds(updatedAds);
  }, [filters, ads]);

  const toggleFilter = (filterType, value) => {
    setFilters((prevFilters) => {
      const isActive = prevFilters[filterType].includes(value);
      const updatedFilters = isActive
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value];

      return { ...prevFilters, [filterType]: updatedFilters };
    });
  };

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="mb-8 mt-24 flex h-auto w-full flex-col items-start gap-8 px-2 sm:w-full md:mt-8 md:flex-row md:items-start md:justify-around xl:my-32">
      {/* Filtres pour les petits écrans */}
      <div className="flex w-full md:w-80 md:flex-col">
        <div className="flex w-full md:flex-col md:justify-between md:rounded-md md:border-[0.5px] md:border-solid md:border-zinc-200 md:p-4">
          <div className="sm:2/5 w-48 sm:w-[250px] md:hidden">
            <div
              className="flex cursor-pointer items-center justify-between rounded-t border-[1px] border-solid border-zinc-200 p-2"
              onClick={() => setShowAllFilters(!showAllFilters)}
            >
              <h3 className="text-lg font-bold">Filtres</h3>
              <span className="text-2xl font-bold text-gray-700">
                {showAllFilters ? "-" : "+"}
              </span>
            </div>

            {showAllFilters && (
              <div className="border-[0.5px] border-solid border-zinc-100">
                {[...new Set(ads.map((ad) => ad.category))].map((category) => (
                  <div key={category}>
                    {/* Catégorie */}
                    <div
                      className="flex cursor-pointer items-center justify-between border-[0.5px] border-solid border-zinc-200 p-2"
                      onClick={() => toggleCategory(category)}
                    >
                      <h3 className="text-sm font-bold">{category}</h3>
                      <span className="text-xl text-gray-500">
                        {openCategories[category] ? "-" : "+"}
                      </span>
                    </div>

                    {/* Sous-catégories */}
                    {openCategories[category] && (
                      <div className="ml-4 mt-2">
                        {[
                          ...new Set(
                            ads
                              .filter((ad) => ad.category === category)
                              .map((ad) => ad.subcategories)
                              .filter(Boolean),
                          ),
                        ].map((subcategory) => (
                          <div key={subcategory}>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={filters.subcategory.includes(
                                  subcategory,
                                )}
                                onChange={() =>
                                  toggleFilter("subcategory", subcategory)
                                }
                              />
                              <span>{subcategory}</span>
                            </label>

                            {/* Sous-sous-catégories */}
                            {filters.subcategory.includes(subcategory) && (
                              <div className="ml-4 mt-2">
                                {[
                                  ...new Set(
                                    ads
                                      .filter(
                                        (ad) =>
                                          ad.subcategories === subcategory,
                                      )
                                      .map((ad) => ad.subsubcategory)
                                      .filter(Boolean),
                                  ),
                                ].map((subsubcategory) => (
                                  <div key={subsubcategory} className="mb-2">
                                    <label className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        checked={filters.subsubcategory.includes(
                                          subsubcategory,
                                        )}
                                        onChange={() =>
                                          toggleFilter(
                                            "subsubcategory",
                                            subsubcategory,
                                          )
                                        }
                                      />
                                      <span>{subsubcategory}</span>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filtres pour les grands écrans */}
          <div className="hidden md:block">
            {[...new Set(ads.map((ad) => ad.category))].map((category) => (
              <div key={category} className="mb-2">
                <div
                  className="flex cursor-pointer items-center justify-between gap-1 rounded bg-white p-2 text-gray-600 hover:bg-zinc-200 hover:text-black md:border-[0.5px] md:border-solid md:border-zinc-200"
                  onClick={() => toggleCategory(category)}
                >
                  <h3 className="text-base font-bold">{category}</h3>
                  <span className="text-base font-semibold">
                    {openCategories[category] ? "-" : "+"}
                  </span>
                </div>

                {/* Sous-catégories */}
                {openCategories[category] && (
                  <div className="ml-4 mt-2">
                    {[
                      ...new Set(
                        ads
                          .filter((ad) => ad.category === category)
                          .map((ad) => ad.subcategories)
                          .filter(Boolean),
                      ),
                    ].map((subcategory) => (
                      <div key={subcategory}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={filters.subcategory.includes(subcategory)}
                            onChange={() =>
                              toggleFilter("subcategory", subcategory)
                            }
                          />
                          <span className="ml-2 font-semibold">
                            {subcategory}
                          </span>
                        </label>

                        {/* Sous-sous-catégories */}
                        {filters.subcategory.includes(subcategory) && (
                          <div className="ml-4 mt-1">
                            {[
                              ...new Set(
                                ads
                                  .filter(
                                    (ad) => ad.subcategories === subcategory,
                                  )
                                  .map((ad) => ad.subsubcategory)
                                  .filter(Boolean),
                              ),
                            ].map((subsubcategory) => (
                              <div key={subsubcategory} className="mb-2">
                                <label className="inline-flex items-center">
                                  <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={filters.subsubcategory.includes(
                                      subsubcategory,
                                    )}
                                    onChange={() =>
                                      toggleFilter(
                                        "subsubcategory",
                                        subsubcategory,
                                      )
                                    }
                                  />
                                  <span className="ml-2">{subsubcategory}</span>
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex max-h-12 max-w-32 flex-row items-center p-1 md:mt-5 md:block md:max-h-full md:max-w-full md:flex-col md:items-center md:rounded-lg md:border-[0.5px] md:border-zinc-200 md:p-4">
          <p className="hidden text-center text-sm text-gray-700 md:mb-2 md:block md:text-base">
            Nos annonces sont régulièrement mise à jour, n&apos;hésitez pas à
            nous suivre sur nos réseaux sociaux pour être informé des dernières
            annonces.
          </p>
          <Link
            href="/quote"
            className="inline-block text-center text-xs font-semibold text-blue-500 transition-colors duration-200 hover:cursor-pointer hover:text-blue-700 sm:text-sm md:mt-1 md:w-full md:text-base"
          >
            Facebook
          </Link>
        </div>
      </div>

      {/* Annonces */}
      <div className="item-between grid w-full grid-cols-2 justify-between gap-2 sm:grid-cols-3 sm:justify-between sm:gap-3 lg:grid-cols-4 lg:gap-3 xl:w-auto">
        {filteredAds.map((ad, index) => (
          <CardAd
            key={index}
            title={ad.title}
            description={ad.description}
            category={ad.category}
            price={ad.price}
            image={ad.image}
            url={ad.url}
          />
        ))}
      </div>
    </div>
  );
};

export default ListAd;
