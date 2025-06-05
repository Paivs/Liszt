"use client";
import * as React from "react";
import Link from "next/link";
import { useUser } from "@/lib/UserContext"; // Importando o hook do contexto
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";
import LaunchUI from "../logos/company";
import { useRouter } from "next/navigation";

export default function Navigation({}) {
  const { user, isAuthenticated } = useUser(); // Usando o contexto do usuário

  // Renderiza os links de acordo com o papel do usuário
  const renderMenu = () => {
    if (!isAuthenticated) {
      return (
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/about" className={navigationMenuTriggerStyle()}>
                Sobre
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" className={navigationMenuTriggerStyle()}>
                Contato
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/help" className={navigationMenuTriggerStyle()}>
                Ajuda
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );
    }

    if (user.role === "patient") {
      return (
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" className={navigationMenuTriggerStyle()}>
                Dashboard
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/journal" className={navigationMenuTriggerStyle()}>
                Diários
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/appointment" className={navigationMenuTriggerStyle()}>
                Sessões
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/settings" className={navigationMenuTriggerStyle()}>
                Settings
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );
    }

    if (user.role === "therapist") {
      return (
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard" className={navigationMenuTriggerStyle()}>
                Dashboard
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/patients" className={navigationMenuTriggerStyle()}>
                Pacientes
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/appointment" className={navigationMenuTriggerStyle()}>
                Sessões
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );
    }
  };

  return <>{renderMenu()}</>;
}
