import "@/app/globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/footer";

export const metadata = {
  title: "Indenum",
  description: "Indénum : Réparations de smartphones, tablettes, consoles, rachat de matériel électronique et vente de pièces détachées à Le Bouscat, près de Bordeaux.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
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
