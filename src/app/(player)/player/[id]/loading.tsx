import Navbar from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlayerLoading() {
  return (
    <>
      <div className="container">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 border h-[80vh]">
        <div className="w-full h-full">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    </>
  );
}
