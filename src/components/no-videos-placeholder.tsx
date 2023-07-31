import { Icons } from "./icons";
import { Button } from "./ui/button";

export default function NoVideosPlaceholder() {
  return (
    <div className="mt-8 border border-dashed flex items-center flex-col py-24 rounded">
      <div className="bg-slate-700 p-4 rounded-full flex items-center justify-center">
        <Icons.youtube size={48} />
      </div>
      <h2 className="mt-4 text-xl font-semibold">No videos added</h2>
      <p className="mt-2 text-slate-400">
        You don&apos;t have any videos yet. Add a new one{" "}
      </p>
      <Button className="mt-8" variant='secondary'>
        <Icons.plus size={14} />
        <span className="ml-2">Add Video</span>
      </Button>
    </div>
  );
}
