interface Props {
  title: string;
  subheading: string;
  children?: React.ReactNode;
}

export default function DashboardHeader({
  children,
  title,
  subheading,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-slate-400 mt-2 text-lg">{subheading}</p>
      </div>
      {children}
    </div>
  );
}
