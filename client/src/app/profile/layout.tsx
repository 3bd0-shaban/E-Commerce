import ProfileWraper from "./ProfileWraper";

export const metadata = {
  title: "Profile",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <ProfileWraper>
    {children}
  </ProfileWraper>);
}
