"use client";
import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import CardAd from "@/components/pages/CardAd";
import { supabase } from "@/utils/supabaseClient";

const CarouselAd = () => {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  const updateCardsToShow = useCallback(() => {
    if (window.innerWidth >= 1024) {
      setCardsToShow(3); // Desktop
    } else if (window.innerWidth >= 768) {
      setCardsToShow(3); // Tablet
    } else if (window.innerWidth >= 450) {
      setCardsToShow(2); // Big mobile
    } else {
      setCardsToShow(1); // Mobile
    }
  }, []);

  const fetchAds = async () => {
    try {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .order("created_at", { ascending: false }) // Trier par les plus récentes
        .limit(10); // Limiter à 10 annonces
      if (error) throw error;
      setAds(data);
    } catch (error) {
      console.error("Error fetching ads:", error.message);
    }
  };
  

  useEffect(() => {
    fetchAds();
  }, []);

  useEffect(() => {
    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, [updateCardsToShow]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ads.length - 1 : prevIndex - 1,
    );
  };

  const visibleAds = ads.slice(currentIndex, currentIndex + cardsToShow);

  return (
    <div className="mx-auto flex w-full max-w-[850px] flex-col items-center space-y-4">
      <div className="flex w-full items-center justify-between">
        <button
          className="rounded-full p-3 shadow-md hover:bg-gray-300 focus:outline-none"
          onClick={prevSlide}
        >
          <HiOutlineChevronLeft className="text-2xl" />
        </button>
        <div className="flex flex-1 space-x-4 overflow-hidden p-6">
          {visibleAds.map((ad, index) => (
            <div
              key={index}
              className={`w-full flex-1 transition-all ease-in-out`}
            >
              <CardAd
                title={ad.title || "Titre indisponible"}
                description={ad.description || "Description non disponible"}
                price={ad.price || "Prix non disponible"}
                image={ad.image || "/img/default.jpg"}
                url={ad.url || "#"}
              />
            </div>
          ))}
        </div>
        <button
          className="rounded-full p-3 shadow-md hover:bg-gray-300 focus:outline-none"
          onClick={nextSlide}
        >
          <HiOutlineChevronRight className="text-2xl" />
        </button>
      </div>
      <div className="flex space-x-2">
        {ads.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

CarouselAd.propTypes = {
  ads: PropTypes.array.isRequired,
};

export default CarouselAd;
