import Link from "next/link";

export default function AnnouncementBanner() {
  return (
    <div className="bg-muted">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="flex items-center justify-between gap-x-6 p-4">
          <div className="flex w-full items-center gap-x-4 text-sm">
            <p className="flex-1 text-center">
              <Link
                href="#"
                className="font-semibold underline-offset-4 hover:underline"
              >
                Comece hoje mesmo!
              </Link>
              <span className="hidden sm:inline">
                {" "}
                — Planos com até <span className="text-red-500 font-bold">50% de desconto</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
