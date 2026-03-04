import { Link } from "@tanstack/react-router";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <img
            src="/assets/uploads/Physics-Shan-Se-Logo-1.jpg"
            alt="Physics Shan Se Logo"
            className="h-10 w-10 object-contain rounded-full"
          />
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
