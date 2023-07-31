import DashboardHeader from "@/components/dashboard-header";
import { Icons } from "@/components/icons";
import NoVideosPlaceholder from "@/components/no-videos-placeholder";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const Icon = Icons["plus"];
  return (
    <div>
      <DashboardHeader
        title="Videos"
        subheading="Browse your videos and add new ones"
      >
        <Button size="lg" variant="secondary">
          <Icon size={14} />
          <span className="ml-2">Add Video</span>
        </Button>
      </DashboardHeader>
      <NoVideosPlaceholder />
    </div>
  );
}
