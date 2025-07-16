import { GalleryVerticalEnd } from "lucide-react";

import { RegisterForm } from "@/components/register-form";
import Link from "next/link";

export default function RegisterPage() {
  const checkStrength = (pwd) => {
    let score = 0;

    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 10) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    let level = "Péssima";
    if (score <= 1) level = "Péssima";
    else if (score === 2) level = "Ruim";
    else if (score === 3 || score === 4) level = "Boa";
    else if (score >= 5) level = "Muito Boa";

    return { level, score };
  };

  const handleChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setStrength(checkStrength(pwd));
  };

  const getColor = () => {
    switch (strength.level) {
      case "Péssima":
        return "bg-red-500";
      case "Ruim":
        return "bg-orange-500";
      case "Boa":
        return "bg-yellow-500";
      case "Muito Boa":
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/img/register_bg.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Laurem Inc.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
