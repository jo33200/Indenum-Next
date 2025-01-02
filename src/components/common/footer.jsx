import ContactInfo from "@/components/features/ContactInfo";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex h-auto w-full flex-col items-start justify-start gap-10 bg-gradient-to-r from-[#7A6F6F] to-[#583C3C] px-2 pb-16 pt-5 text-white sm:items-center">
      <div className="container w-36 text-left">
        <Image
          src="/img/Indenum.webp"
          width={200}
          height={50}
          className="bg-contain"
          alt="Logo de l'entreprise Indenum"
          style={{ objectFit: "contain" }}
          priority={false}
        />
      </div>
      <section className="flex w-full flex-col gap-10 sm:w-[300px] lg:w-[1024px] lg:flex-row lg:justify-around lg:gap-0">
        <nav
          aria-label="Navigation de pied de page"
          className="h-auto w-[300px]"
        >
          <ul className="flex flex-col items-start justify-start gap-1 text-left">
            <li className="font-bold">Services</li>
            <li>
              <Link href="/rate" className="hover:underline">
                Réparation de téléphones toutes marques
              </Link>
            </li>
            <li>
              <Link href="/rate" className="hover:underline">
                Réparation de tablettes toutes marques
              </Link>
            </li>
            <li>
              <Link href="/rate" className="hover:underline">
                Réparation de consoles de jeux
              </Link>
            </li>
            <li>
              <Link href="/ad" className="hover:underline">
                Vente de matériel éléctronique reconditionné
              </Link>
            </li>
            <li>
              <Link href="/buy" className="hover:underline">
                Rachat de matériel éléctronique
              </Link>
            </li>
          </ul>
        </nav>
        <ContactInfo isFooter={true} />
        <nav
          aria-label="Navigation de pied de page"
          className="h-auto w-[230px]"
        >
          <ul className="flex flex-col items-start justify-start gap-1 text-left">
            <li className="font-bold">Informations</li>
            <li>
              <Link href="/details" className="hover:underline">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/cgv" className="hover:underline">
                Conditions générales de vente
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/return" className="hover:underline">
                Politique de retour
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </footer>
  );
};

export default Footer;
