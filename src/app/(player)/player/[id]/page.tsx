import Navbar from "@/components/navbar";

interface PageProps {
  params: {
    id: string;
  };
}

export default function PlayerPage({ params: { id } }: PageProps) {
  return (
    <div className="container">
      <Navbar />
      {id}
    </div>
  );
}
