import FooterSimple from "@/components/blocks/footers/simple";
import Navbar from "@/components/blocks/navbar/default";


export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <FooterSimple />
    </>
  );
}
