import FormQuote from "@/components/pages/QuoteForm";

const Quote = () => {
  return (
    <div className="mx-5 max-w-[850px] pt-24">
      <div className="w-full">
        <FormQuote />
      </div>

      <div className="space-y-4 py-10 text-gray-700">
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
      </div>
    </div>
  );
};

export default Quote;
