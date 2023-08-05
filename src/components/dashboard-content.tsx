interface Props {
  children?: React.ReactNode;
}

export default function DashboardContent({ children }: Props) {
  return <div className="mt-8">{children}</div>;
}
