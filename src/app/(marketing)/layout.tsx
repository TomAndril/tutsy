import Navbar from "@/components/navbar";

interface Props {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: Props) {
  return (
    <div className="bg-main-gradient">
      <Navbar borderBottom />
      {children}
    </div>
  );
}
