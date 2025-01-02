import BuyForm from "@/components/pages/BuyForm";
import { pageMetadata } from "@/utils/metadata";

export const metadata = pageMetadata.Buy;

const Buy = () => {
  return (
    <div className="mb-8 mt-24 flex max-w-[850px] flex-col items-center justify-center gap-8 md:mt-8 xl:my-32">
      <h1 className="sr-only">Rachat de votre matériel</h1>

      <section
        className="flex flex-col items-center gap-4 text-gray-700"
        role="region"
        aria-labelledby="buy-info-title"
      >
        <h2 id="buy-info-title" className="sr-only">
          Informations sur l'achat de matériel
        </h2>
        <p>
          Chez <strong>INDENUM</strong>, nous vous proposons de racheter votre
          matériel électronique, qu'il s'agisse de consoles de jeux, de
          téléphones, de tablettes, ou d'accessoires. Nous vous offrons un prix
          juste pour votre matériel, en fonction de son état et de sa valeur
          marchande.
        </p>
        <p>
          Le rachat de matériel est une solution simple et rapide pour vous
          débarrasser de vos appareils électroniques encombrants ou obsolètes.
          En <strong>revendant votre matériel</strong>, vous pouvez ainsi
          récupérer de l'argent pour financer l'achat de nouveaux appareils ou
          simplement pour vous faire plaisir.
        </p>
        <p>
          N'hésitez pas à remplir le Formulaire ci dessous ou vous pouvez nous
          contacter directement pour obtenir une estimation de rachat
        </p>
      </section>

      <section
        className="w-full"
        role="region"
        aria-labelledby="form-buy-title"
      >
        <BuyForm />
      </section>
    </div>
  );
};

export default Buy;
