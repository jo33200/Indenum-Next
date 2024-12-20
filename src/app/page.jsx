"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/utils/supabaseClient";
import CardHome from "@/components/pages/CardHome";
import Carousel from "@/components/features/CarouselHome";
import CarouselAd from "@/components/features/CarouselAd";
import CityModal from "@/components/ui/ModalCity";

const HomePage = () => {
  // Fonction pour générer une URL publique depuis Supabase
  const getSupabaseImageUrl = (fileName) => {
    const { data } = supabase.storage
      .from("home-images")
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-auto w-full flex-col items-center">
      {/* Titre principal invisible pour l'accessibilité */}
      <h1 className="sr-only">Accueil - Indenum, Réparations et Services</h1>

      {/* Carousel Section */}
      <section
        className="flex h-auto w-full items-center justify-center pb-20 pt-28 sm:pt-36 md:pt-20"
        aria-labelledby="carousel-title"
      >
        <h2 id="carousel-title" className="sr-only">
          Découvrez nos services
        </h2>
        <Carousel />
      </section>

      {/* CardHome Section */}
      <section
        className="flex w-full items-center justify-center pb-20"
        aria-labelledby="services-title"
      >
        <h2 id="services-title" className="sr-only">
          Services proposés
        </h2>
        <CardHome />
      </section>

      {/* Atelier Section */}
      <section
        id="atelier"
        className="flex w-full flex-col items-center gap-10 bg-gray-100 px-2 py-20"
        aria-labelledby="atelier-title"
      >
        <h2 id="atelier-title" className="text-xl font-bold">
          Notre Atelier
        </h2>
        <article
          className="flex max-w-[850px] flex-col-reverse items-center gap-10 sm:flex-row"
          aria-labelledby="atelier-description"
        >
          <Image
            src={getSupabaseImageUrl("atelier.webp")}
            alt="image de notre Atelier"
            width={400}
            height={300}
            className="w-full rounded-3xl sm:w-1/2"
            style={{ objectFit: "cover" }}
            priority={true}
          />
          <p
            className="px-2 text-left text-lg sm:w-1/2"
            id="atelier-description"
          >
            Bienvenue sur votre <strong>espace de confiance</strong> pour la
            réparation de <strong>smartphones</strong>,{" "}
            <strong>tablettes</strong>, <strong>consoles de jeux</strong> et{" "}
            <strong>accessoires</strong> !
            <br /> Avec notre expertise, redonnez vie à vos appareils préférés{" "}
            <strong>sans compromis</strong> sur la qualité ni le prix.
            <br /> Nous savons à quel point votre technologie est essentielle au
            quotidien, c’est pourquoi nous proposons des{" "}
            <strong>réparations rapides</strong> et <strong>soignées</strong>,
            réalisées par des experts passionnés, quel que soit le{" "}
            <strong>modèle</strong> ou la <strong>marque</strong>.
            <br />
            En quelques clics, consultez{" "}
            <Link
              href="/rate"
              className="text-blue-500 underline"
              aria-label="all-rates"
            >
              nos tarifs
            </Link>{" "}
            transparents et obtenez un{" "}
            <Link
              href="/quote"
              className="text-blue-500 underline"
              aria-label="make-quote"
            >
              devis personnalisé
            </Link>
            , adapté à vos besoins spécifiques.
          </p>
        </article>
      </section>

      {/* Service de proximité Section */}
      <section
        id="proximite"
        className="flex w-full flex-col items-center gap-10 px-2 py-20"
        aria-labelledby="proximite-title"
      >
        <h2
          id="proximite-title"
          className="text-center text-xl font-bold sm:text-left"
        >
          Service de proximité : Prise en charge et livraison à domicile
        </h2>
        <article
          className="flex max-w-[850px] flex-col items-center gap-10 text-left sm:flex-row"
          aria-labelledby="proximite-description"
        >
          <div className="flex flex-col gap-10 px-2 text-lg">
            <p id="proximite-description">
              Pour faciliter la réparation de vos appareils, nous proposons{" "}
              <strong>un service de proximité</strong>. Notre équipe vient
              directement à <strong>votre domicile</strong> pour récupérer votre
              matériel endommagé et vous le ramène une fois la réparation
              effectuée.
            </p>
            <div>
              <p>
                Cliquez ici pour consulter la liste des communes desservies :
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-blue-500 underline"
                aria-label="Voir la liste des communes desservies"
              >
                Voir la liste des communes
              </button>
              <CityModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
            <p>Prenez rendez-vous dès aujourd’hui.</p>
          </div>
          <Image
            src={getSupabaseImageUrl("proximite.webp")}
            alt="Coursier à vélo livrant des appareils réparés"
            width={400}
            height={300}
            className="w-full rounded-t-full sm:w-1/2"
            style={{ objectFit: "cover" }}
          />
        </article>
      </section>

      {/* Blockquote Section */}
      <section
        className="flex w-full flex-col items-center gap-10 bg-gray-100 py-20"
        aria-labelledby="Slogan"
      >
        <h2 id="Slogan" className="sr-only">
          Engagement envers la qualité
        </h2>
        <blockquote className="max-w-[850px] text-center text-2xl font-bold">
          <p className="px-4">
            Faites le choix de la qualité, de la fiabilité et de la réactivité :
            laissez-nous vous accompagner pour retrouver des appareils comme
            neufs.
          </p>
        </blockquote>
      </section>

      {/* CarouselAnnonces Section */}
      <section
        className="flex w-full flex-col items-center gap-10 py-20"
        aria-labelledby="ads-title"
      >
        <h2 id="ads-title" className="text-xl font-bold">
          Nos dernières annonces
        </h2>
        <article className="w-full max-w-[850px] gap-10 px-2 text-center text-lg">
          <p>
            Vous recherchez des appareils et accessoires d’occasion ? <br />
            Parcourez nos annonces mises à jour sur Le Bon Coin.
          </p>
        </article>
        <article className="flex w-full flex-col items-center gap-10">
          <CarouselAd />
          <Link
            href="/ad"
            className="rounded-lg bg-name-orange px-5 py-4 text-lg font-bold text-white hover:bg-blue-700"
            aria-label="Voir toutes nos annonces"
          >
            Voir toutes nos annonces
          </Link>
        </article>
      </section>

      {/* Engagements Section */}
      <section
        className="flex w-full flex-col items-center gap-10 bg-gray-100 py-20"
        aria-labelledby="engagements-title"
      >
        <h2 id="engagements-title" className="text-xl font-bold">
          Nos engagements
        </h2>
        <article className="flex max-w-[850px] flex-col items-center gap-6 px-4 text-left sm:flex-row">
          <p>
            En tant que professionnels de la réparation, nous nous engageons à
            vous fournir un service de qualité, rapide et transparent. Nos
            techniciens sont formés pour intervenir sur tous les modèles de
            smartphones, tablettes et consoles de jeux, et utilisent des pièces
            détachées de qualité pour garantir des réparations durables.
          </p>
          <div className="my-4 h-[0.7px] w-3/4 bg-gradient-to-r from-gray-300 via-gray-600 to-gray-300 sm:h-[220px] sm:w-1 sm:bg-gradient-to-b sm:from-gray-300 sm:via-gray-600 sm:to-gray-300"></div>
          <p>
            Nous vous garantissons également des tarifs compétitifs et
            transparents, sans frais cachés. Vous pouvez consulter nos tarifs en
            ligne et obtenir un devis personnalisé en quelques clics.
          </p>
          <div className="my-4 h-[0.7px] w-3/4 bg-gradient-to-r from-gray-300 via-gray-600 to-gray-300 sm:h-[220px] sm:w-1 sm:bg-gradient-to-b sm:from-gray-300 sm:via-gray-600 sm:to-gray-300"></div>
          <p>
            Enfin, nous mettons un point d’honneur à vous offrir un service de
            proximité : notre équipe se déplace directement à votre domicile
            pour récupérer et livrer votre appareil, afin de vous simplifier la
            vie. Nous couvrons un large périmètre pour vous offrir un service
            simple et rapide.
          </p>
        </article>
      </section>
    </div>
  );
};

export default HomePage;
