import ContactInfo from "@/components/features/ContactInfo";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex h-auto w-full flex-col items-start justify-start gap-10 bg-gradient-to-r from-[#7A6F6F] to-[#583C3C] px-2 pb-16 pt-5 text-white sm:items-center">
      <div className="container w-36 text-left">
        <Image
          src="/img/Indenum.png"
          width={200}
          height={50}
          className="bg-contain"
          alt="Indenum"
          style={{ objectFit: "contain" }}
        />
      </div>
      <section className="flex w-full flex-col gap-10 sm:w-[300px] lg:w-[1024px] lg:flex-row lg:justify-around lg:gap-0">
        <nav className="h-auto w-[300px]">
          <ul className="flex flex-col items-start justify-start gap-1 text-left">
            <li className="font-bold">Services</li>
            <li>Réparation de téléphones toutes marques</li>
            <li>Réparation de tablettes toutes marques</li>
            <li>Réparation de consoles de jeux</li>
          </ul>
        </nav>
        <ContactInfo isFooter={true} />
        <nav className="h-auto w-[230px]">
          <ul className="flex flex-col items-start justify-start gap-1 text-left">
            <li className="font-bold">Informations</li>
            <li>Mentions légales</li>
            <li>Conditions générales de vente</li>
            <li>Politique de confidentialité</li>
          </ul>
        </nav>
      </section>
    </footer>
  );
};

export default Footer;
