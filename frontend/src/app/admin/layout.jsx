import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/blocks/navbar/admin";
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
