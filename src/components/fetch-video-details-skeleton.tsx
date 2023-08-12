import { Skeleton } from "@/components/ui/skeleton";

export default function FetchVideoDetailsSkeleton() {
  return (
    <div className="mt-2 border-dashed border rounded p-4">
      <div>
        <Skeleton className="h-12 mb-2" />
      </div>
      <Skeleton className="h-96" />
      <div>
        <Skeleton className="h-12 mb-2 mt-2" />
      </div>
    </div>
  );
}
