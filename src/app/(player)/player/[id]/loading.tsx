import Navbar from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlayerLoading() {
  return (
    <>
      <div className="container">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_20%] border h-[80vh]">
        <div className="w-full h-full">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="p-4">
          <Skeleton className="w-full h-12" />
          <div className="mt-4">
            <Skeleton className="w-full h-8 mt-4" />
            <Skeleton className="w-full h-8 mt-4" />
            <Skeleton className="w-full h-8 mt-4" />
            <Skeleton className="w-full h-8 mt-4" />
          </div>
        </div>
      </div>
      <div className="container flex gap-4">
        <Skeleton className="h-12 mt-2 w-1/3" />
        <Skeleton className="h-12 mt-2 w-1/3" />
        <Skeleton className="h-12 mt-2 w-1/3" />
      </div>
    </>
  );
}
