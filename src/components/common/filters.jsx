"use client";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Filters = ({
  filterData,
  selectedFilters,
  onFilterChange,
  openCategory,
  onCategoryChange,
}) => {
  const [openCategories, setOpenCategories] = useState({});
  const [showAllFilters, setShowAllFilters] = useState(false);

  useEffect(() => {
    if (openCategory) {
      console.log("Open category in useEffect:", openCategory);
      setOpenCategories((prev) => ({
        ...prev,
        [openCategory]: true, // Ouvre la catégorie passée en prop
      }));
    }
  }, [openCategory]);

  const toggleCategory = (category) => {
    setOpenCategories((prev) => {
      const newOpenState = !prev[category];
  
      // Vérifie si onCategoryChange est défini avant de l'appeler
      if (onCategoryChange) {
        setTimeout(() => {
          onCategoryChange(newOpenState ? category : "");
        }, 0);
      }
  
      return {
        ...prev,
        [category]: newOpenState,
      };
    });
  };

  if (!filterData || !Array.isArray(filterData)) {
    return <div>Pas de filtres disponibles</div>;
  }

  return (
    <div className="flex w-full md:flex-col md:justify-between md:rounded-md md:border-[0.5px] md:border-solid md:border-zinc-200 md:p-4">
      {/* Affichage du bouton "Filtres" pour les petits écrans */}
      <div className="sm:1/5 w-[250px] md:hidden">
        <div
          className="flex cursor-pointer items-center justify-between rounded-t border-[1px] border-solid border-zinc-200 p-2"
          onClick={() => setShowAllFilters(!showAllFilters)} // Ouvrir/fermer tous les filtres
        >
          <h3 className="text-lg font-bold">Filtres</h3>
          <span className="text-2xl font-bold text-gray-700">
            {showAllFilters ? "-" : "+"} {/* Icône pour ouvrir/fermer */}
          </span>
        </div>

        {/* Afficher toutes les catégories lorsque "Filtres" est ouvert */}
        {showAllFilters && (
          <div className="border-[0.5px] border-solid border-zinc-100">
            {filterData.map((filter) => (
              <div key={filter.category}>
                <div
                  className="flex cursor-pointer items-center justify-between border-[0.5px] border-solid border-zinc-200 p-2"
                  onClick={() => toggleCategory(filter.category)}
                >
                  <h3 className="text-sm font-bold">{filter.category}</h3>
                  <span className="text-xl text-gray-500">
                    {openCategories[filter.category] ? "-" : "+"}
                  </span>
                </div>
                {openCategories[filter.category] && (
                  <div className="text-left">
                    {filter.subcategories.map((subcategory) => {
                      if (typeof subcategory === "string") {
                        const subcategoryId = `filter-${filter.category}-${subcategory}-${Date.now()}`;
                        return (
                          <div key={subcategory} className="ml-4 mt-2">
                            <label
                              htmlFor={subcategoryId}
                              className="inline-flex items-start"
                            >
                              <input
                                type="checkbox"
                                id={subcategoryId}
                                name={subcategory}
                                value={subcategory}
                                checked={selectedFilters.includes(subcategory)}
                                onChange={(e) => onFilterChange(e.target.value)}
                                className="form-checkbox"
                              />
                              <span className="ml-2">{subcategory}</span>
                            </label>
                          </div>
                        );
                      } else if (
                        typeof subcategory === "object" &&
                        subcategory.subcategory
                      ) {
                        return (
                          <div key={subcategory.subcategory} className="mb-2">
                            <div
                              className="flex cursor-pointer items-center justify-between font-semibold text-gray-700"
                              onClick={() =>
                                toggleCategory(subcategory.subcategory)
                              }
                            >
                              {subcategory.subcategory}
                              <span className="text-lg">
                                {openCategories[subcategory.subcategory]
                                  ? "−"
                                  : "+"}
                              </span>
                            </div>
                            {openCategories[subcategory.subcategory] && (
                              <div className="ml-4 mt-1">
                                {subcategory.subSubcategories.map(
                                  (subSubcat) => {
                                    const subSubcatId = `filter-${subcategory.subcategory}-${subSubcat}-${Date.now()}`;
                                    return (
                                      <div
                                        key={subSubcat}
                                        className="mt-1 flex items-center"
                                      >
                                        <label
                                          htmlFor={subSubcatId}
                                          className="inline-flex items-center"
                                        >
                                          <input
                                            type="checkbox"
                                            id={subSubcatId}
                                            name={subSubcat}
                                            value={subSubcat}
                                            checked={selectedFilters.includes(
                                              subSubcat,
                                            )}
                                            onChange={(e) =>
                                              onFilterChange(e.target.value)
                                            }
                                            className="form-checkbox"
                                          />
                                          <span className="ml-2">
                                            {subSubcat}
                                          </span>
                                        </label>
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Affichage des catégories pour les écrans plus grands */}
      <div className="hidden md:block">
        {filterData.map((filter) => (
          <div key={filter.category} className="mb-2">
            <div
              className="flex cursor-pointer items-center justify-between gap-1 rounded bg-white p-2 text-gray-600 hover:bg-zinc-200 hover:text-black md:border-[0.5px] md:border-solid md:border-zinc-200"
              onClick={() => toggleCategory(filter.category)}
            >
              <h3 className="text-base font-bold">{filter.category}</h3>
              <span className="text-base font-semibold">
                {openCategories[filter.category] ? "−" : "+"}
              </span>
            </div>
            {openCategories[filter.category] && (
              <div className="ml-4 mt-2">
                {filter.subcategories.map((subcategory) => {
                  if (typeof subcategory === "string") {
                    const subcategoryId = `filter-${filter.category}-${subcategory}`;
                    return (
                      <div key={subcategory} className="text-left">
                        <label
                          htmlFor={subcategoryId}
                          className="inline-flex items-center"
                        >
                          <input
                            type="checkbox"
                            id={subcategoryId}
                            name={subcategory}
                            value={subcategory}
                            checked={selectedFilters.includes(subcategory)}
                            onChange={(e) => onFilterChange(e.target.value)}
                            className="form-checkbox"
                          />
                          <span className="ml-2">{subcategory}</span>
                        </label>
                      </div>
                    );
                  } else if (
                    typeof subcategory === "object" &&
                    subcategory.subcategory
                  ) {
                    return (
                      <div key={subcategory.subcategory} className="mb-2">
                        <div
                          className="flex cursor-pointer items-center justify-between font-semibold text-gray-700"
                          onClick={() =>
                            toggleCategory(subcategory.subcategory)
                          }
                        >
                          {subcategory.subcategory}
                          <span className="text-lg">
                            {openCategories[subcategory.subcategory]
                              ? "−"
                              : "+"}
                          </span>
                        </div>
                        {openCategories[subcategory.subcategory] && (
                          <div className="ml-4 mt-1">
                            {subcategory.subSubcategories.map((subSubcat) => {
                              const subSubcatId = `filter-${subcategory.subcategory}-${subSubcat}`;
                              return (
                                <div key={subSubcat} className="text-left">
                                  <label
                                    htmlFor={subSubcatId}
                                    className="inline-flex items-center"
                                  >
                                    <input
                                      type="checkbox"
                                      id={subSubcatId}
                                      name={subSubcat}
                                      value={subSubcat}
                                      checked={selectedFilters.includes(
                                        subSubcat,
                                      )}
                                      onChange={(e) =>
                                        onFilterChange(e.target.value)
                                      }
                                      className="form-checkbox"
                                    />
                                    <span className="ml-2">{subSubcat}</span>
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Filters.propTypes = {
  filterData: PropTypes.arrayOf(PropTypes.object),
  selectedFilters: PropTypes.arrayOf(PropTypes.string),
  onFilterChange: PropTypes.func,
  openCategory: PropTypes.string,
  onCategoryChange: PropTypes.func,
};

export default Filters;
