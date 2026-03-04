import { Link } from "@tanstack/react-router";
import { Atom } from "lucide-react";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-ocid="nav.link"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-orange text-orange group-hover:bg-orange group-hover:text-white transition-colors duration-200">
            <Atom size={16} strokeWidth={1.8} />
          </span>
          <span
            className="text-navy font-bold text-xl tracking-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Physics Shan Se
          </span>
        </Link>
      </div>
    </header>
  );
}
