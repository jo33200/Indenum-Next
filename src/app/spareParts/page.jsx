import Image from "next/image";
import { supabase } from "@/utils/supabaseClient";

const spareParts = () => {
  // Fonction pour générer une URL publique depuis Supabase
  const getSupabaseImageUrl = (fileName) => {
    const { data } = supabase.storage
      .from("home-images")
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  return (
    <div className="flex flex-col items-center gap-10">
      {/* Hero Section */}
      <section
        id="hero"
        className="flex w-full flex-col items-center gap-10 px-2 py-20"
      >
        <h2 className="text-center text-xl font-bold sm:text-left">
          Vente de pièces détachées pour appareils électroménagers
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
              Vous avez besoin de pièces détachées pour réparer votre appareil
              électroménager ?<br /> Nous vous proposons un large choix de
              pièces détachées pour réparer vos appareils électroniques.
            </p>
            <p>
              Pour trouver la pièce détachée dont vous avez besoin, vous pouvez
              consulter notre catalogue en ligne. Vous y trouverez des pièces
              détachées pour de nombreuses marques d’appareils électroniques.
            </p>
            <p>
              Si vous ne trouvez pas la pièce détachée que vous recherchez,
              n’hésitez pas à nous contacter. Nous ferons notre possible pour
              vous aider à trouver la pièce détachée dont vous avez besoin.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default spareParts;
