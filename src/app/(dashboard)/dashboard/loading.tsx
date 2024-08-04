import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div>
      <Skeleton className="h-8 w-36" />
      <Skeleton className="h-6 w-48 mt-2" />

      <div className="flex items-center gap-2 mt-6">
        <Skeleton className="w-12 h-8" />
        <Skeleton className="w-20 h-8" />
        <Skeleton className="w-20 h-8" />  
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
        {[1, 2, 3, 4, 5, 6].map((elem) => (
          <div key={elem}>
            <Skeleton className="h-80 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
