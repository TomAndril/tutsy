import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function IndexPage() {
  return (
    <>
      <Navbar borderBottom />
      <div className="dark:content-hero-dark content-hero-light h-screen md:h-[70vh] w-full absolute">
        <main className="container">
          <div className="text-left">
            <Hero />
          </div>
        </main>
      </div>
    </>
  );
}
