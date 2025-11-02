// app/noticias/page.tsx
export default function NoticiasPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Notícias</h1>
      <p className="text-neutral-500 mt-2">
        Confira as últimas notícias da região.
      </p>
      {/* TODO: Implementar a lista de notícias */}
      <div className="mt-8 p-8 bg-neutral-900 rounded-lg">
        <p className="text-white">Em breve...</p>
      </div>
    </div>
  );
}