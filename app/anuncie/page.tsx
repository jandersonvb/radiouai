import ContactForm from "../contato/components/ContactForm";
// src/app/anuncie/page.tsx
export default function AnunciePage() {
  return (
    <section className="mt-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Entre em contato</h2>
      <p className="text-neutral-400 mb-6">
        Preencha o formulário abaixo e nossa equipe entrará em contato com você
        o mais breve possível.
      </p>
      <ContactForm />
    </section>
  );
}
