import { Link } from "react-router-dom";
import { APP_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">{APP_NAME}</span>
        </Link>
      </div>
    </header>
  );
}
