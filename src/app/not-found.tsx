import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
    <Navbar />
      <div className="container">
        <h1 className="text-center mt-24 text-xl md:text-2xl lg:text-4xl">
          🚫 404 - Page Not Found
        </h1>
        <div className="mx-auto text-center mt-8">
          <Button size={'lg'} asChild>
            <Link href="/">Go back to home</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
