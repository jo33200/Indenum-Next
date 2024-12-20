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
    const { data } = supabase.storage.from("home-images").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-auto w-full flex-col items-center">
      {/* Carousel Section */}
      <section className="flex h-auto w-full items-center justify-center pt-28 pb-20 sm:pt-36 md:pt-20">
        <Carousel />
      </section>

      {/* CardHome Section */}
      <section className="flex w-full items-center justify-center pb-20">
        <CardHome />
      </section>

      {/* Atelier Section */}
      <section
        id="atelier"
        className="flex w-full flex-col items-center gap-10 bg-gray-100 px-2 py-20"
      >
        <h2 className="text-xl font-bold">Notre Atelier</h2>
        <article className="flex max-w-[850px] flex-col-reverse items-center gap-10 sm:flex-row">
          <Image
            src= {getSupabaseImageUrl("atelier.webp")}
            alt="Atelier"
            width={400}
            height={300}
            className="w-full rounded-3xl sm:w-1/2"
            style={{ objectFit: "cover" }}
            priority={false}
          />
          <p className="px-2 text-left text-lg">
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
              href="/under-construction"
              className="text-blue-500 underline"
            >
              nos tarifs
            </Link>{" "}
            transparents et obtenez un{" "}
            <Link
              href="/under-construction"
              className="text-blue-500 underline"
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
      >
        <h2 className="text-center text-xl font-bold sm:text-left">
          Service de proximité : Prise en charge et livraison à domicile
        </h2>
        <article className="flex max-w-[850px] flex-col items-center gap-10 text-left sm:flex-row">
          <div className="flex flex-col gap-10 px-2 text-lg">
            <p>
              Pour faciliter la réparation de vos appareils, nous proposons{" "}
              <strong>un service de proximité</strong> :<br />
              notre équipe vient directement à <strong>
                votre domicile
              </strong>{" "}
              pour récupérer votre matériel endommagé, puis vous le{" "}
              <strong>ramène</strong> une fois la réparation effectuée.
              <br /> <strong>Plus besoin de vous déplacer</strong> !<br /> Nous
              couvrons un large périmètre pour vous offrir un service simple et
              rapide.
            </p>
            <div>
              <p>Cliquez ici pour consulter la liste des communes desservies</p>
              <div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-blue-500 underline"
                >
                  Voir la liste des communes
                </button>
                <CityModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              </div>
            </div>
            <p>prendre rendez-vous dès aujourd’hui.</p>
          </div>
          <Image
            src={getSupabaseImageUrl("proximite.webp")}
            alt="image d'un coursier à vélo"
            width={400}
            height={300}
            className="w-full rounded-t-full sm:w-1/2"
            style={{ objectFit: "cover" }}
            priority={false}
          />
        </article>
      </section>

      {/* Blockquote Section */}
      <section className="flex w-full flex-col items-center gap-10 bg-gray-100 py-20">
        <blockquote className="max-w-[850px] text-center text-2xl font-bold">
          <p className="px-4">
            Faites le choix de la qualité, de la fiabilité et de la réactivité :
            laissez-nous vous accompagner pour retrouver des appareils comme
            neufs.
          </p>
        </blockquote>
      </section>

      {/* CarouselAnnonces Section */}
      <section className="flex w-full flex-col items-center gap-10 py-20">
        <h2 className="text-xl font-bold">Nos dernières annonces</h2>
        <article className="w-full max-w-[850px] items-center gap-10 px-2 text-lg">
          <p>
            Vous recherchez des appareils et accessoires d’occasion?
            <br /> Parcourez nos annonces mises à jour sur Le Bon Coin,
            directement accessibles depuis notre site pour dénicher des produits
            au meilleur rapport qualité-prix.
          </p>
        </article>
        <article className="flex w-full flex-col items-center gap-10">
          <CarouselAd  />
          <Link
            href="/under-construction"
            className="rounded-lg bg-name-orange px-5 py-4 text-lg font-bold text-white hover:bg-blue-700"
          >
            Voir toutes nos annonces
          </Link>
        </article>
      </section>

      {/* Engagements Section */}
      <section className="flex w-full flex-col items-center gap-10 bg-gray-100 py-20">
        <h2 className="text-xl font-bold">Nos engagements</h2>
        <article className="flex max-w-[850px] flex-col items-center gap-10 px-4 text-left sm:flex-row">
          <p>
            En tant que professionnels de la réparation, nous nous engageons à
            vous fournir un service de qualité, rapide et transparent. Nos
            techniciens sont formés pour intervenir sur tous les modèles de
            smartphones, tablettes et consoles de jeux, et utilisent des pièces
            détachées de qualité pour garantir des réparations durables.
            <br />
            Nous vous garantissons également des tarifs compétitifs et
            transparents, sans frais cachés. Vous pouvez consulter nos tarifs en
            ligne et obtenir un devis personnalisé en quelques clics.
            <br />
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
