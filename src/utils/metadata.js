const siteUrl = "http://localhost:3000"; // Base URL pour local ou production (à remplacer pour la production)

export const globalMetadata = {
  metadataBase: new URL(siteUrl),
  title: "Indenum - Réparations électroniques à Bordeaux",
  description:
    "Indenum : Réparations de téléphones, tablettes, consoles, le rachat de matériel électronique et la vente de pièces détachées à Le Bouscat, près de Bordeaux.",
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: "index, follow", // Autorise l’indexation
  geo: {
    region: "FR-Aquitaine",
    placename: "Le Bouscat",
    position: "44.8679729,-0.609065",
  },
  openGraph: {
    title: "Indenum | Réparations & Rachat Électronique à Le Bouscat",
    description:
      "Indenum propose des réparations professionnelles pour téléphones, tablettes, consoles, ainsi que le rachat et la vente de matériel électronique à Le Bouscat.",
    url: siteUrl,
    siteName: "Indenum",
    images: [
      {
        url: `${siteUrl}/Indenum.png`,
        width: 1200,
        height: 630,
        alt: "Indenum - Réparations électroniques",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indenum",
    description:
      "Réparation, Vente et Rachat de votre matériel électronique à Bordeaux.",
    images: [`${siteUrl}/Indenum.png`],
  },
};

export const pageMetadata = {
  ad: {
    title: "Annonces - Indenum",
    description:
      "Découvrez nos annonces en ligne de vente de matériel électronique à Bordeaux.",
    alternates: {
      canonical: `${siteUrl}/ad`,
    },
    openGraph: {
      title: "Annonces - Indenum",
      description:
        "Découvrez nos annonces en ligne de vente de matériel électronique à Bordeaux.",
      url: `${siteUrl}/ad`,
      images: [
        {
          url: `${siteUrl}/img/manette.jpg`,
          width: 1200,
          height: 630,
          alt: "Annonces - Indenum",
        },
      ],
    },
  },
  rate: {
    title: "Tarifs - Indenum",
    description:
      "Découvrez nos tarifs compétitifs pour la réparation de smartphones, tablettes, et consoles. Services de qualité à Bordeaux et Le Bouscat.",
    alternates: {
      canonical: `${siteUrl}/rate`,
    },
    openGraph: {
      title: "Tarifs - Indenum",
      description: "Découvrez les tarifs de nos services à Bordeaux.",
      url: `${siteUrl}/rate`,
      images: [
        {
          url: `${siteUrl}/contact.jpg`,
          width: 1200,
          height: 630,
          alt: "Tarifs - Indenum",
        },
      ],
    },
  },
  quote: {
    title: "Devis - Indenum",
    description:
      "Obtenez un devis rapide pour la réparation de vos appareils électroniques à Bordeaux et Le Bouscat. Répondez à vos besoins en quelques clics.",
    alternates: {
      canonical: `${siteUrl}/quote`,
    },
    openGraph: {
      title: "Devis - Indenum",
      description:
        "Obtenez un devis rapide pour la réparation de vos appareils électroniques à Bordeaux et Le Bouscat. Répondez à vos besoins en quelques clics.",
      url: `${siteUrl}/quote`,
      images: [
        {
          url: `${siteUrl}/contact.jpg`,
          width: 1200,
          height: 630,
          alt: "Devis - Indenum",
        },
      ],
    },
  },
  contact: {
    title: "Contactez Indenum à Bordeaux et Le Bouscat",
    description:
      "Prenez contact avec Indenum pour vos réparations électroniques. Situé à Le Bouscat, près de Bordeaux, nous sommes disponibles du lundi au samedi pour répondre à vos besoins.",
    alternates: {
      canonical: `${siteUrl}/contact`,
    },
    openGraph: {
      title: "Contactez Indenum - Réparations électroniques à Bordeaux",
      description:
        "Contactez-nous pour vos réparations électroniques. Proximité, disponibilité et expertise à Bordeaux et Le Bouscat.",
      url: `${siteUrl}/contact`,
      images: [
        {
          url: `${siteUrl}/contact.jpg`,
          width: 1200,
          height: 630,
          alt: "Contactez Indenum pour réparations électroniques",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Contactez-nous - Indenum",
      description:
        "Contactez notre équipe pour vos réparations électroniques à Bordeaux.",
      images: [`${siteUrl}/contact.jpg`],
    },
  },
};
