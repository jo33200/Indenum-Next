"use client";

import CarouselAd from "@/components/features/CarouselAd";
import Carousel from "@/components/features/CarouselHome";
import CardHome from "@/components/pages/CardHome";
import CityModal from "@/components/ui/ModalCity";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
            priority={false}
          />
          <p
            className="px-2 text-left text-lg sm:w-1/2"
            id="atelier-description"
          >
            Bienvenue dans votre <strong>atelier de confiance</strong> pour la
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
            className="w-full rounded-3xl sm:w-1/2"
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

      {/* Equipment loan section */}

      <section
        id="loan"
        className="flex w-full flex-col items-center gap-10 bg-gray-100 px-2 py-20"
        aria-labelledby="loan-title"
      >
        <h2 id="atelier-title" className="text-xl font-bold">
          Un prêt le temps de la réparation?
        </h2>
        <article
          className="flex max-w-[850px] flex-col items-center gap-10 text-left sm:flex-row"
          aria-labelledby="loan-description"
        >
          <Image
            src={getSupabaseImageUrl("ManetteDePret.webp")}
            alt="image d'une manette de prêt"
            width={400}
            height={300}
            className="w-full rounded-3xl sm:w-1/2"
            style={{ objectFit: "cover" }}
            priority={false}
          />
          <div className="flex flex-col gap-10 px-2 text-lg sm:w-1/2">
            <p id="loan-description">
              Chez Indenum, nous comprenons à quel point l'absence de votre
              appareil peut être contraignante.
            </p>
            <p>
              C’est pourquoi, <strong>sous réserve de disponibilité</strong>,
              nous mettons à votre disposition un article similaire en prêt
              pendant la durée de la réparation.
              <br /> Cette <strong>solution</strong> vise à vous offrir une{" "}
              <strong>continuité d’usage</strong> et à rendre cette période
              aussi <strong>simple et pratique</strong> que possible, tout en
              témoignant de notre engagement à vous offrir un{" "}
              <strong>service de qualité</strong>.
            </p>

            <p>
              Pour connaitre les disponibilitées,{" "}
              <strong>n'hésitez pas à nous contacter</strong>!
            </p>
          </div>
        </article>
      </section>

      {/* Engagements Section */}
      <section
        className="flex w-full flex-col items-center gap-10 py-20"
        aria-labelledby="engagements-title"
      >
        <h2 id="engagements-title" className="text-xl font-bold">
          Nos engagements
        </h2>
        <article className="flex max-w-[850px] flex-col items-center gap-6 px-4 text-center text-lg">
          <p>
            En tant que <strong>professionnels</strong> dans la réparation de
            matériel électronique, nous nous engageons à vous fournir un{" "}
            <strong>service de qualité, rapide et transparent</strong>. Nos
            techniciens sont formés pour intervenir sur tous les modèles de
            smartphones, tablettes et consoles de jeux, et utilisent des pièces
            détachées de qualité pour{" "}
            <strong>garantir des réparations durables</strong>.
          </p>
          <div className="my-4 h-[1px] w-4/5 bg-gradient-to-r from-orange-100 via-orange-600 to-orange-100"></div>
          <p>
            Nous garantissons également des{" "}
            <strong>tarifs compétitifs et transparents</strong>, sans frais
            cachés. Vous pouvez consulter nos tarifs en ligne ou obtenir en
            quelques clics un
            <br />
            <Link
              href="/quote"
              alt="obtenir un devis"
              aria-label="demander un devis personnalisé"
              className="text-blue-500 underline"
            >
              devis personnalisé
            </Link>
          </p>
          <div className="my-4 h-[1px] w-4/5 bg-gradient-to-r from-orange-100 via-orange-600 to-orange-100"></div>
          <p>
            Enfin, nous mettons un point d’honneur à vous offrir un{" "}
            <strong>service de proximité</strong> : notre équipe{" "}
            <strong>se déplace</strong> directement à
            <strong>votre domicile</strong> pour récupérer et livrer votre
            appareil, afin de vous simplifier la vie. Nous couvrons un large
            périmètre pour vous offrir un service{" "}
            <strong>simple et rapide</strong>.
          </p>
        </article>
      </section>
    </div>
  );
};

export default HomePage;
