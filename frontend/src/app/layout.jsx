import "./globals.css";
import ThemeProvider from "@/lib/ThemeProvider";
import { UserProvider } from "@/lib/UserContext";
import { Toaster } from "sonner";
import { RedirectProvider } from "@/lib/redirect";
import { Jost, Archivo } from "next/font/google";
import { RedirectCompleteRegisterProvider } from "@/lib/completeRegister";
import Notifier from "@/components/Notifier";

const jost = Jost({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--display-family",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--text-family",
});

export const metadata = {
  title: "Liszt",
  description: "Gerenciador de sessões para psicoterapeutas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${jost.variable} ${archivo.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider>
            <RedirectProvider />
            <RedirectCompleteRegisterProvider/>
            <Toaster expand={true} richColors />
            <Notifier/>
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
