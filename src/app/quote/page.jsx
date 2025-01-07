import FormQuote from "@/components/pages/QuoteForm";
import { pageMetadata } from "@/utils/metadata";

export const metadata = pageMetadata.quote;

const Quote = () => {
  return (
    <div className="mx-5 max-w-[850px] pt-24">
      <h1 className="sr-only">Demande de devis</h1>

      <section
        className="w-full"
        role="region"
        aria-labelledby="form-quote-title"
      >
        <FormQuote />
      </section>

      <section
        className="space-y-4 py-10 text-gray-700"
        role="region"
        aria-labelledby="quote-info-title"
      >
        <h2 id="quote-info-title" className="sr-only">
          Informations sur le devis gratuit
        </h2>
        <p>
          Chez <strong>INDENUM</strong>, nous savons &agrave; quel point il est
          essentiel d&rsquo;avoir une information claire avant de
          proc&eacute;der à une r&eacute;paration. C&rsquo;est pourquoi nous
          vous offrons la possibilit&eacute; de demander un devis gratuitement
          pour vos appareils &eacute;lectroniques, qu&rsquo;il s&rsquo;agisse de
          consoles de jeux, de t&eacute;l&eacute;phones, de tablettes, ou
          d&rsquo;accessoires.
        </p>
        <p>
          Un devis vous permet de conna&icirc;tre &agrave; l&rsquo;avance le
          co&ucirc;t des r&eacute;parations n&eacute;cessaires ainsi que les
          d&eacute;tails des services propos&eacute;s. En r&eacute;alisant un
          devis, vous pouvez d&eacute;cider en toute transparence des
          &eacute;tapes &agrave; suivre, sans surprise de co&ucirc;ts
          suppl&eacute;mentaires. De plus, ce devis est{" "}
          <strong>sans engagement</strong>. Vous &ecirc;tes totalement libre
          d&apos;accepter ou de refuser la r&eacute;paration une fois que vous
          avez tous les &eacute;l&eacute;ments en main.
        </p>
        <p className="font-medium">
          Notre objectif est de vous fournir une solution fiable et
          adapt&eacute;e &agrave; votre budget. En r&eacute;alisant un devis
          gratuit et sans obligation, vous avez ainsi la certitude de faire le
          meilleur choix pour vos appareils.
        </p>
        <p>
          Dans tous les cas, un diagnostic sera réalisé avant chaque réparation.
          Nous nous réservons le droit de ne pas intervenir sur un produit où il
          y aurait eu une tentative d'intervention.
        </p>
      </section>
    </div>
  );
};

export default Quote;
