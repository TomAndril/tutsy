import FetchVideoDetailsSkeleton from "@/components/fetch-video-details-skeleton";

export default function AddVideoLoading() {
  return (
    <div className="container my-4">
      <FetchVideoDetailsSkeleton />
    </div>
  );
}
