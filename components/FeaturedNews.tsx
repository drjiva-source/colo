export default function FeaturedNews() {
  return (
    <section className="relative rounded-2xl overflow-hidden mb-10">

      <img
        src="https://picsum.photos/1200/500"
        alt="featured"
        className="w-full h-[500px] object-cover"
      />

      <div className="absolute inset-0 bg-black/50 flex items-end">

        <div className="p-8 text-white max-w-3xl">

          <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-semibold">
            Destacado
          </span>

          <h2 className="text-5xl font-bold mt-4">
            La nueva generación de inteligencia artificial transforma internet
          </h2>

          <p className="mt-4 text-lg text-gray-200">
            Plataformas, medios digitales y empresas tecnológicas están cambiando
            sus modelos gracias a la IA.
          </p>

        </div>

      </div>

    </section>
  );
}