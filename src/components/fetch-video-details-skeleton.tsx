import { Skeleton } from "@/components/ui/skeleton";

export default function FetchVideoDetailsSkeleton() {
  return (
    <div>
      <div>
        <Skeleton className="h-[8.5rem] mb-2" />
      </div>
      <div className="grid md:grid-cols-12 gap-4 mt-2 h-[31rem]">
        <Skeleton className="col-span-12 md:col-span-6 lg:col-span-8 h-[14rem] md:h-[31rem]" />
        <div className="col-span-12 md:col-span-6 lg:col-span-4 h-[14rem] md:h-[31rem]">
          <div className="flex flex-col justify-between">
            <div>
              <Skeleton className="h-6" />
              <div className="flex items-center mt-2 gap-4">
                <div>
                  <Skeleton className="h-6 w-16" />
                </div>
                <div>
                  <Skeleton className="h-6 w-24" />
                </div>
                <div>
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
              <Skeleton className="h-6 mt-2 w-16" />
            </div>
            <div>
              <Skeleton className="h-12 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
