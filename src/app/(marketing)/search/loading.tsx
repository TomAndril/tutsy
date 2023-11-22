import { Skeleton } from "@/components/ui/skeleton";

const NUMBER_OF_CARDS = 9;

export default function SearchLoading() {
  const cards = Array.from({ length: NUMBER_OF_CARDS });

  return (
    <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 container">
      {cards.map((c) => (
        <Skeleton key={c as number} className="h-96 w-full" />
      ))}
    </div>
  );
}
