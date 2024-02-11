import GridBackground from "@/components/grid-background";
import Hero from "@/components/hero";

export default function IndexPage() {
  return (
    <GridBackground>
      <main className="container">
        <div className="text-left">
          <Hero />
        </div>
      </main>
    </GridBackground>
  );
}
