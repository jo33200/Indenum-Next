const ReturnPolicy = () => {
  return (
    <section className="mx-5 max-w-[850px] pt-24">
      <header>
        <h1 className="mb-4 text-2xl font-bold">LIVRAISON & RETOURS</h1>
      </header>

      <article className="mb-8">
        <header>
          <h2 className="mb-2 text-xl font-semibold">DÉLAIS DE LIVRAISON</h2>
        </header>
        <p className="mb-2">
          Les délais de livraison peuvent varier en fonction des articles
          choisis ou de la période de l'année. Lors des périodes de forte
          demande, il peut être difficile de gérer un grand flux de commandes.
          En raison du grand nombre de produits proposés, il est impossible de
          stocker toutes les références, ce qui entraîne des difficultés
          logistiques. Nous faisons de notre mieux pour vous livrer dans les
          meilleurs délais.
        </p>
        <p className="mb-2">
          Si l’article se trouve en stock, celui-ci sera expédié le jour suivant
          la commande. Dans le cas contraire, le délai de livraison sera
          rallongé en raison du temps de traitement, de fabrication ou
          d'expédition. Les délais de livraison sont mis à jour pour offrir une
          bonne visibilité de la date de livraison estimée. Lors du passage de
          la commande, ces délais sont clairement indiqués au moment du choix du
          moyen d'expédition.
        </p>
        <p>
          <strong>DÉLAI DE LIVRAISON ESTIMÉ EN CE MOMENT :</strong>
        </p>
        <ul className="ml-5 list-disc">
          <li>✔ Livraison en France métropolitaine : 11 à 18 jours.</li>
          <li>✔ Livraison en Europe et DOM-TOM : 14 à 28 jours.</li>
          <li>✔ Livraison pour le reste du monde : 21 à 45 jours.</li>
        </ul>
      </article>

      <article className="mb-8">
        <header>
          <h2 className="mb-2 text-xl font-semibold">MOYENS DE LIVRAISON</h2>
        </header>
        <p>
          Tous les envois se font en lettre suivie, ce qui permet d’avoir la
          confirmation que la commande a bien été livrée. Un logiciel de suivi
          est utilisé pour vous permettre de suivre simplement l'acheminement de
          votre commande. Ni votre présence ni votre signature ne sont requises
          : le colis est directement déposé dans votre boîte aux lettres par
          votre facteur habituel.
        </p>
      </article>

      <article className="mb-8">
        <header>
          <h2 className="mb-2 text-xl font-semibold">SÉPARATION DES PAQUETS</h2>
        </header>
        <p>
          Pour vous livrer dans les meilleurs délais, une commande peut parfois
          être expédiée en plusieurs paquets, notamment lorsqu’un des articles
          commandés n’est plus en stock. Dans ce cas, l’article manquant sera
          expédié quelques jours plus tard.
        </p>
      </article>

      <article className="mb-8">
        <header>
          <h2 className="mb-2 text-xl font-semibold">POLITIQUE DE RETOUR</h2>
        </header>
        <p className="mb-2">
          Si vous vous êtes trompé d’article ou que pour une quelconque raison
          vous n’êtes pas satisfait de votre achat, vous pouvez le retourner
          dans les 30 jours suivant la réception de la commande. Passé ce délai,
          aucun remboursement ne pourra être effectué.
        </p>
        <p>
          <strong>Conditions à remplir pour bénéficier d’un retour :</strong>
        </p>
        <ul className="ml-5 list-disc">
          <li>
            ✔ L’article doit être inutilisé et dans le même état que vous
            l’avez reçu.
          </li>
          <li>
            ✔ Il doit être retourné dans les 30 jours suivant la commande.
          </li>
          <li>✔ Il doit être accompagné d'une preuve d’achat.</li>
        </ul>
        <p>
          Pour effectuer un retour, contactez-nous à{" "}
          <a href="mailto:indenum@outlook.com" className="text-blue-500">
            indenum@outlook.com
          </a>
          . Nous vous expliquerons la procédure à suivre.
        </p>
      </article>

      <article className="mb-8">
        <header>
          <h2 className="mb-2 text-xl font-semibold">
            POLITIQUE DE REMBOURSEMENT
          </h2>
        </header>
        <p className="mb-2">
          Une fois votre article réceptionné, nous vous en informerons par
          e-mail. Après vérification des conditions, nous procéderons au
          remboursement ou au renvoi de l'article, selon votre choix.
        </p>
        <p className="mb-2">
          ✘ En cas de remboursement, vous recevrez un e-mail de confirmation et
          le remboursement sera automatiquement appliqué à votre méthode de
          paiement initiale. Le délai d’apparition des fonds sur votre compte
          bancaire dépend de votre établissement bancaire.
        </p>
        <p className="mb-2">
          ✘ En cas d’échange, un nouvel article vous sera envoyé dans les plus
          brefs délais.
        </p>
        <p className="mb-2">
          Les frais de retour sont à votre charge. Nous vous recommandons
          d'utiliser un envoi suivi ou de souscrire à une assurance pour les
          articles de grande valeur. Nous déclinons toute responsabilité si
          votre colis ne nous parvient pas.
        </p>
        <p>
          Les articles soldés ne sont pas remboursables. Nous nous réservons
          également le droit de refuser un échange ou un remboursement si les
          conditions ne sont pas remplies.
        </p>
      </article>

      <article className="mb-8">
        <header>
          <h2 className="mb-2 text-xl font-semibold">ARTICLES DÉFECTUEUX</h2>
        </header>
        <p>
          Si un article défectueux ou endommagé vous est livré, envoyez une
          photo du problème à{" "}
          <a href="mailto:indenum@outlook.com" className="text-blue-500">
            indenum@outlook.com
          </a>
          . Nous procéderons au remboursement ou au renvoi de l'article.
        </p>
      </article>

      <article className="mb-8">
        <header>
          <h2 className="mb-2 text-xl font-semibold">
            RETARDS & PERTES DE COMMANDE
          </h2>
        </header>
        <p className="mb-2">
          Une fois expédiée, la commande est confiée à des sociétés de transport
          indépendantes (ex : La Poste, DPD, DHL, FedEx, etc.). Nous ne pouvons
          être tenus responsables des retards ou des pertes de colis.
        </p>
        <p>
          Si votre commande n’est pas livrée sous 61 jours ou est perdue,
          contactez-nous à{" "}
          <a href="mailto:indenum@outlook.com" className="text-blue-500">
            indenum@outlook.com
          </a>
          . Nous procéderons au remboursement ou au renvoi de votre commande.
        </p>
      </article>

      <article className="mb-8">
        <header>
          <h2 className="mb-2 text-xl font-semibold">ANNULATION DE COMMANDE</h2>
        </header>
        <p>
          Pour annuler votre commande, envoyez-nous un e-mail à{" "}
          <a href="mailto:indenum@outlook.com" className="text-blue-500">
            indenum@outlook.com
          </a>{" "}
          dans les 24 heures suivant l’achat. Une commande expédiée ne peut pas
          être annulée.
        </p>
      </article>

      <article className="mb-8">
        <header>
          <h3 className="text-lg font-semibold">AUTRES QUESTIONS</h3>
        </header>
        <p>
          Pour toute autre question, n’hésitez pas à nous contacter à{" "}
          <a href="mailto:indenum@outlook.com" className="text-blue-500">
            indenum@outlook.com
          </a>
          .
        </p>
      </article>
    </section>
  );
};

export default ReturnPolicy;
