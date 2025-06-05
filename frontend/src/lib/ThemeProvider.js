"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Provider({ children, props }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>
  } else {
    return (
      <>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem {... props}>{children}</ThemeProvider>
      </>
    );
  }
}
