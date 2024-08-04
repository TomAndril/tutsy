import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div>
      <Skeleton className="h-8 w-36" />
      <Skeleton className="h-6 w-48 mt-2" />

      <div className="mt-8">
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-40 mt-4" />
      </div>
    </div>
  );
}
