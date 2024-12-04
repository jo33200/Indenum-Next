import ContactInfo from "@/components/features/ContactInfo";
import ContactForm from "@/components/pages/ContactForm";

const Contact = () => {
  return (
    <div className="my-16 flex h-auto w-full flex-col items-center justify-center gap-10 md:my-0 lg:min-h-screen lg:items-start lg:flex-row lg:justify-around">
      <section className="mt-5 w-full">
        <ContactInfo />
      </section>
      <section className="mt-5 w-full">
        <ContactForm />
      </section>
    </div>
  );
};

export default Contact;
