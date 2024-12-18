import "@/app/globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/footer";
import Script from 'next/script';
import { globalMetadata } from "@/utils/metadata";

export const metadata = {
  ...globalMetadata,
  title: "Indenum",
  description:
    "Indénum : Réparations de smartphones, tablettes et consoles, rachat et vente de matériel électronique. Service de proximité avec prêt de matériel pendant la réparation à Bordeaux et La CUB.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <Script
          type="application/ld+json"
          id="local-business-schema"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Indenum",
              description:
                "Indenum propose la réparation de téléphones, tablettes, consoles, le rachat de matériel électronique et la vente de pièces détachées à Le Bouscat, Bordeaux.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "350 Avenue de la Libération",
                addressLocality: "Le Bouscat",
                postalCode: "33110",
                addressCountry: "FR",
              },
              telephone: "+33766441337",
              email: "indenum@outlook.com",
              geo: {
                "@type": "GeoCoordinates",
                latitude: 44.8679729,
                longitude: -0.609065,
              },
              openingHours: "Mo-Sa 09:00-19:00",
              image: "URL_image_principale.jpg",
              url: "https://lesite.com",
              areaServed: "Bordeaux, Le Bouscat",
              sameAs: [
                "https://www.facebook.com/people/Ind%C3%A9num-Service/100092448746131/?locale=fr_FR",
              ],
            }),
          }}
        />
      </head>
      <body>
        <header>
          <Header />
        </header>
        <main className="flex w-full items-center justify-center">
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
