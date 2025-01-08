import BuyForm from "@/components/pages/BuyForm";
import { pageMetadata } from "@/utils/metadata";

export const metadata = pageMetadata.Buy;

const Buy = () => {
  return (
    <div className="mb-8 mt-24 flex max-w-[850px] flex-col items-center justify-center gap-8 md:mt-8 xl:my-32">
      <h1 className="sr-only">Rachat de votre matériel</h1>

      <section
        className="mx-5 flex flex-col items-center gap-4 text-gray-700"
        aria-labelledby="buy-info-title"
      >
        <h2 id="buy-info-title" className="sr-only">
          Informations sur l'achat de matériel
        </h2>
        <p>
          Chez <strong>INDENUM</strong>, nous vous proposons de{" "}
          <strong>racheter</strong> votre matériel électronique, qu'il s'agisse
          de consoles de jeux, de téléphones, de tablettes, ou d'accessoires.
          Nous vous offrons <strong>un prix juste</strong> pour votre matériel,
          en fonction de <strong>son état et de sa valeur marchande</strong>.
        </p>
        <p>
          Le rachat de matériel est{" "}
          <strong>une solution simple et rapide</strong> pour vous débarrasser
          de vos appareils électroniques encombrants ou obsolètes. En{" "}
          <strong>revendant votre matériel</strong>, vous pouvez ainsi
          <strong> récupérer de l'argent</strong> pour financer l'achat de
          nouveaux appareils ou simplement pour vous faire plaisir.
        </p>
        <p>
          N'hésitez pas à <strong>remplir le Formulaire</strong> ci dessous ou
          vous pouvez nous contacter directement pour obtenir une{" "}
          <strong>estimation de rachat</strong>.
        </p>
      </section>

      <section className="w-full" aria-labelledby="form-buy-title">
        <h2 id="form-buy-title" className="sr-only">
          Formulaire de rachat
        </h2>
        <BuyForm />
      </section>
    </div>
  );
};

export default Buy;
