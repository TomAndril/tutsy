import DashboardContent from "@/components/dashboard-content";
import DashboardHeader from "@/components/dashboard-header";

export default function PeoplePage() {
  return (
    <div>
      <DashboardHeader
        title="People"
        subheading="Connect and learn with others"
      />

      <DashboardContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident
          itaque libero nostrum! Voluptatum quaerat quisquam reprehenderit ipsam
          totam porro tenetur doloremque voluptates ut culpa soluta voluptate,
          inventore repudiandae! Nobis, unde?
        </p>
      </DashboardContent>
    </div>
  );
}
