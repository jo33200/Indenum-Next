import ContactInfo from "@/components/features/ContactInfo";
import ContactForm from "@/components/pages/ContactForm";
import { pageMetadata } from "@/utils/metadata";

export const metadata = pageMetadata.contact;

const Contact = () => {
  return (
    <div className="my-16 flex h-auto w-full flex-col items-center justify-center gap-10 md:my-0 lg:min-h-screen lg:flex-row lg:items-start lg:justify-around">
      {/* Titre principal invisible pour l'accessibilité */}
      <h1 className="sr-only">Contactez-nous - Indenum</h1>

      <section className="mt-5 w-full" aria-labelledby="contact-info-title">
        <h2 id="contact-info-title" className="sr-only">
          Informations de contact
        </h2>
        <ContactInfo />
      </section>
      <section className="mt-5 w-full" aria-labelledby="contact-form-title">
        <h2 id="contact-form-title" className="sr-only">
          Formulaire de contact
        </h2>
        <ContactForm />
      </section>
    </div>
  );
};

export default Contact;
