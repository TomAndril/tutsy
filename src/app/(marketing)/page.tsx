import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function IndexPage() {
  return (
    <>
      <Navbar borderBottom />
      <main className="container">
        <div>
          <h1 className="text-6xl font-bold mt-48">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem totam eum est impedit consequatur, cumque atque
            quaerat !
          </h1>
          <div className="mt-12">
            <Button size="lg" className="mr-4">
              Explore
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
