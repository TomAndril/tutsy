import Navbar from "@/components/navbar";

interface Props {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: Props) {
  return (
    <>
      <Navbar borderBottom />
      {children}
    </>
  );
}
