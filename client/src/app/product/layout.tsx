import Footer from "@Components/app/Footer";
import Header from "@Components/app/Header";

export const metadata = {
  title: "product",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
