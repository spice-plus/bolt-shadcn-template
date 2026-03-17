import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "ホーム", href: "/" },
  { label: "コンポーネント", href: "/components" },
];

export function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 min-h-screen border-r bg-background px-3 py-4">
      <nav className="flex flex-col gap-1">
        {navItems.map(({ label, href }) => (
          <Link
            key={href}
            to={href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
