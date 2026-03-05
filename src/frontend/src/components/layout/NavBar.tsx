import { Link, useLocation } from "@tanstack/react-router";
import { LogOut, UserCircle } from "lucide-react";
import { useStudentAuth } from "../../hooks/useStudentAuth";

export default function NavBar() {
  const { student, isLoading, logout } = useStudentAuth();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-24 flex items-center gap-3">
        {/* Logo + Name */}
        <Link
          to="/"
          className="flex items-center gap-2 group flex-1 min-w-0"
          data-ocid="nav.link"
        >
          <img
            src="/assets/uploads/Physics-Shan-Se-Logo-1.jpg"
            alt="Physics Shan Se Logo"
            className="h-20 w-20 object-contain rounded-md shrink-0"
          />
          <div className="min-w-0">
            <span
              className="text-navy font-bold text-xl tracking-tight block leading-tight"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Physics Shan Se
            </span>
            <span
              className="text-xs font-sans hidden sm:block leading-tight"
              style={{ color: "oklch(var(--orange))" }}
            >
              Concepts. Numericals. Experiments.
            </span>
          </div>
        </Link>

        {/* Auth section */}
        {!isLoading && (
          <div className="flex items-center gap-2 shrink-0">
            {student ? (
              <>
                {/* Logged-in: show name + logout */}
                <span
                  className="hidden sm:flex items-center gap-1.5 text-sm font-sans text-navy font-semibold"
                  data-ocid="nav.student_name"
                >
                  <UserCircle size={16} className="text-orange shrink-0" />
                  Hi, {student.name.split(" ")[0]}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold px-3 py-1.5 rounded-md border border-border text-muted-foreground hover:text-orange hover:border-orange/40 transition-colors"
                  data-ocid="nav.logout_button"
                  aria-label="Log out"
                >
                  <LogOut size={13} />
                  Logout
                </button>
              </>
            ) : (
              /* Not logged in: Student Login link */
              <Link
                to="/register"
                search={{ redirect: location.href }}
                className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold px-4 py-2 rounded-md text-white transition-colors duration-200"
                style={{ backgroundColor: "oklch(var(--orange))" }}
                data-ocid="nav.login_link"
              >
                <UserCircle size={15} />
                Student Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
