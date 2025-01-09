"use client";
import Modal from "@/components/ui/ModalPhone";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";
import { useState } from "react";

const spareParts = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const phoneNumber = "07 66 44 13 37";

  // Fonction pour générer une URL publique depuis Supabase
  const getSupabaseImageUrl = (fileName) => {
    const { data } = supabase.storage
      .from("home-images")
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handlePhoneClick = () => {
    if (window.innerWidth < 768) {
      // Mobile : passe directement l'appel
      window.location.href = `tel:${phoneNumber.replace(/\s+/g, "")}`;
    } else {
      // Ordinateur/Tablet : affiche la modale
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center gap-10">
      {/* Hero Section */}
      <section
        id="hero"
        className="flex w-full flex-col items-center gap-10 px-2 py-20"
      >
        <h2 className="text-center text-2xl font-bold sm:text-left">
          Vente de pièces détachées pour votre appareil électronique
        </h2>
        <article className="flex max-w-[850px] flex-col items-center gap-10 text-left lg:flex-row">
          <Image
            src={getSupabaseImageUrl("pieces.webp")}
            alt="Service pièces détachées"
            width={400}
            height={400}
            layout="intrinsic"
          />

          <div className="flex flex-col gap-10 px-2 text-lg">
            <p>
              Vous avez besoin de pièces détachées pour réparer votre appareil ?
              <br /> Nous vous proposons un large choix de pièces détachées pour
              effectuer vous même votre réparation.
            </p>
            <p>
              Pour trouver la pièce détachée dont vous avez besoin, vous pouvez
              consulter notre catalogue en ligne. Vous y trouverez des pièces
              détachées pour de nombreuses marques d’appareils électroniques.
            </p>
            <p>
              Si vous ne trouvez pas la pièce détachée que vous recherchez,
              n’hésitez pas à nous contacter directement via notre adresse
              email:{" "}
              <a
                href="mailto:indenum@outlook.com"
                className="text-blue-600 underline"
              >
                indenum@outlook.com
              </a>
              <br />
              soit en nous appelant directement au:
              <br />
              <a
                onClick={handlePhoneClick}
                className="text-blue-600 focus:outline-none"
                aria-label="Appeler le service client Indenum"
                role="button"
              >
                07 66 44 13 37
              </a>
              <br /> Notre catalogue évolue constamment et nous ferons tout
              notre possible pour vous aider à trouver la pièce détachée dont
              vous avez besoin.
            </p>
          </div>
        </article>
      </section>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Contactez-nous">
        <p className="my-5 text-gray-700">
          Pour toutes demandes d’information, n’hésitez pas à nous contacter au
          numéro suivant :
        </p>
        <p className="text-gray-700">{phoneNumber}</p>
        <p className="mt-5 text-gray-700">
          Nous sommes joignables du lundi au samedi
        </p>
        <p className="mb-9 text-gray-700">de 9h à 19h.</p>
      </Modal>
    </div>
  );
};

export default spareParts;
