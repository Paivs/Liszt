"use client";
import * as React from "react";
import { Menu } from "lucide-react";
import { useUser } from "@/lib/UserContext"; // Importando o hook do contexto
import { cn } from "@/lib/utils";
import LaunchUI from "../../logos/company";
import { Button } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import Navigation from "../../ui/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import Link from "next/link";

export default function Navbar({
  logo = <LaunchUI />,
  name = "Liszt",
  homeUrl = "/",

  mobileLinks = [
    { text: "Início", href: "/" },
    { text: "Contato", href: "/contact" },
    { text: "Sobre", href: "/about" },
    { text: "Ajuda", href: "/help" },
  ],

  actions = [
    { text: "Login", href: "/login", isButton: false },
    {
      text: "Registrar-se",
      href: "/register",
      isButton: true,
      variant: "default",
    },
  ],

  showNavigation = true,
  customNavigation,
  className
}) {
  const { user, isAuthenticated, logout } = useUser(); // Usando o contexto do usuário

  // Renderiza os links móveis com base no estado de autenticação e papel do usuário
  const renderMobileLinks = () => {
    if (!isAuthenticated) {
      return mobileLinks; // Exibe links padrão quando não está autenticado
    }

    if (user.role === "patient") {
      return [
        { text: "Dashboard", href: "/dashboard" },
        { text: "Diários", href: "/journal" },
        { text: "Pacientes", href: "/patients" },
        { text: "Sessões", href: "/appointment" },
        { text: "Configurações", href: "/settings" },
      ];
    }

    if (user.role === "therapist") {
      return [
        { text: "Dashboard", href: "/dashboard" },
        { text: "Pacientes", href: "/patients" },
        { text: "Sessões", href: "/appointment" },
      ];
    }

    return mobileLinks; // Retorna os links padrão se algum caso falhar
  };

  // Renderiza os links de acordo com o papel do usuário (paciente ou terapeuta)
  const renderMenu = () => {
    if (!isAuthenticated) {
      return (
        <NavbarComponent>
          <NavbarLeft>
            <Link href={homeUrl} className="flex items-center gap-2 text-xl font-bold">
              {logo}
              {name}
            </Link>
            {showNavigation && (customNavigation || <Navigation />)}
          </NavbarLeft>
          <NavbarRight>
            {actions.map((action, index) =>
              action.isButton ? (
                <Button key={index} variant={action.variant || "default"} asChild>
                  <Link href={action.href}>
                    {action.text}
                  </Link>
                </Button>
              ) : (
                <Link key={index} href={action.href} className="hidden text-sm md:block">
                  {action.text}
                </Link>
              )
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link href={homeUrl} className="flex items-center gap-2 text-xl font-bold">
                    <span>{name}</span>
                  </Link>
                  {renderMobileLinks().map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.text}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      );
    }

    // Renderiza o menu para quando o usuário estiver logado como paciente ou terapeuta
    return (
      <NavbarComponent>
        <NavbarLeft>
          <Link href={homeUrl} className="flex items-center gap-2 text-xl font-bold">
            {logo}
            {name}
          </Link>
          {showNavigation && (customNavigation || <Navigation />)}
        </NavbarLeft>
        <NavbarRight>
          {isAuthenticated && (
            <Button onClick={logout} className="text-sm md:block">
              Sair
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href={homeUrl} className="flex items-center gap-2 text-xl font-bold">
                  <span>{name}</span>
                </Link>
                {renderMobileLinks().map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.text}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </NavbarRight>
      </NavbarComponent>
    );
  };

  return <>{renderMenu()}</>;
}
