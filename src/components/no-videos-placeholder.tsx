import Link from "next/link";
import { Icons } from "./icons";
import { Button } from "./ui/button";

export default function NoVideosPlaceholder() {
  return (
    <div className="border border-dashed flex items-center flex-col py-24 rounded mt-4">
      <div className="bg-slate-200 dark:bg-slate-700 p-4 rounded-full flex items-center justify-center">
        <Icons.youtube size={48} />
      </div>
      <h2 className="mt-4 text-xl font-semibold">No videos added</h2>
      <p className="mt-2">You don&apos;t have any videos yet. Add a new one </p>
      <Button className="mt-8" variant="secondary" asChild>
        <Link href="/dashboard/add">
          <Icons.plus size={14} />
          <span className="ml-2">Add Video</span>
        </Link>
      </Button>
    </div>
  );
}
