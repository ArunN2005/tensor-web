"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, ChevronLeft } from "lucide-react";
import { Button } from "./button";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const showBackButton = pathname !== "/";

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-emerald-600"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            className="text-emerald-600"
          >
            <Home className="h-5 w-5" />
          </Button>
        </div>
        <div className="text-sm text-emerald-600">
          {pathname === "/" ? "Home" : pathname.split("/").join(" / ")}
        </div>
      </div>
    </div>
  );
}