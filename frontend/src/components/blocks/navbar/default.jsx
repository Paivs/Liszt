"use client";

import { useState } from "react";
import { LogIn, Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ModeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Definindo as variáveis
const logoAlt = "Lucid logo";
const logoSrc = "/img/logo.png";
const logoWidth = 150;
const logoHeight = 40;

const menuItems = [
  { label: "Início", href: "/" },
  { label: "Contato", href: "/contact" },
  { label: "Sobre", href: "/about" },
  { label: "Ajuda", href: "/help" },
];

const loginLink = "/login";
const registerLink = "/register";
const logoutLink = "/logout";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Variável de controle de estado de login (simulando um estado de login)
  const isLoggedIn = false; // Troque para `true` quando o usuário estiver logado

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <header className="relative bg-[#004B50] dark:bg-background text-foreground border-b border-border shadow-sm w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={logoWidth}
            height={logoHeight}
            className="h-auto w-auto max-h-12 object-contain"
            priority
          />
          <h2 className="font-bold text-2xl text-[#004387] mt-2">LISZT</h2>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6 text-md text-background dark:text-foreground font-medium">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ModeToggle />
          {isLoggedIn ? (
            <Button asChild>
              <Link href={logoutLink} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href={loginLink} className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          size="icon"
          aria-label="Abrir menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-background border-t border-border shadow-sm absolute top-full left-0 w-full z-50"
          >
            <div className="container px-4 py-4 flex flex-col gap-4 text-sm font-medium">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <ModeToggle />
              {isLoggedIn ? (
                <Button
                  asChild
                  className="w-full justify-center mt-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <Link href={logoutLink} className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </Link>
                </Button>
              ) : (
                <>
                  <Button
                    asChild
                    className="w-full justify-center mt-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Link href={loginLink} className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full justify-center mt-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Link href={registerLink} className="flex items-center gap-2">
                      <span>Registrar</span>
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
