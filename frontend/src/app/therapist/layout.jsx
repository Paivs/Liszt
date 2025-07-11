import Navbar from "@/components/blocks/navbar/therapist";
import FooterSimple from "@/components/blocks/footers/simple";

export default function RootLayout({ children }) {
  return (
    <>
        <Navbar/>
        {children}
        <FooterSimple/>
    </>
  );
}
