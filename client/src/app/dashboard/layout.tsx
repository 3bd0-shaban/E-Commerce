import DashboardWraper from "./DashboardWraper";
import Header from "./Header";

export const metadata = {
  title: "Doctor Dashboard",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardWraper>
      {children}
    </DashboardWraper>
  );
}
