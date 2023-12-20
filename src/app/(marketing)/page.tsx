import Hero from "@/components/hero";

export default function IndexPage() {
  return (
    <div className="h-screen md:h-[70vh] w-full">
      <main className="container">
        <div className="text-left">
          <Hero />
        </div>
      </main>
    </div>
  );
}
