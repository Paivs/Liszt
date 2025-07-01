
import Navbar from "@/components/blocks/navbar/patient";
import FooterSimple from "@/components/blocks/footers/simple";

export const metadata = {
  title: "Liszt",
  description: "Gerenciador de sessões para psicoterapeutas",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <FooterSimple />
    </>
  );
}
