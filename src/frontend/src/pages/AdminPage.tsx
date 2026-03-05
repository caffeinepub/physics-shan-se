import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  School,
  Users,
} from "lucide-react";
import { useState } from "react";
import type { Student } from "../backend.d";
import NavBar from "../components/layout/NavBar";
import { useActor } from "../hooks/useActor";

// Simple hardcoded admin password gate
const ADMIN_PASSWORD = "PhysicsShanSe@2026";

function useAllStudents(enabled: boolean) {
  const { actor, isFetching } = useActor();
  return useQuery<Student[]>({
    queryKey: ["allStudents"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStudents();
    },
    enabled: enabled && !!actor && !isFetching,
  });
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: students,
    isLoading,
    isError,
  } = useAllStudents(isAuthenticated);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  const filteredStudents =
    students?.filter((s) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        s.school.toLowerCase().includes(q) ||
        s.pincode.toLowerCase().includes(q)
      );
    }) ?? [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />

      <main className="flex-1 px-4 py-10 max-w-5xl mx-auto w-full">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-sans text-muted-foreground hover:text-orange transition-colors mb-8"
          data-ocid="admin.back_link"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
            style={{
              backgroundColor: "oklch(var(--orange) / 0.12)",
              border: "1px solid oklch(var(--orange) / 0.30)",
            }}
          >
            <Lock size={20} style={{ color: "oklch(var(--orange))" }} />
          </div>
          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold text-navy leading-tight"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Admin Panel
            </h1>
            <p className="text-sm font-sans text-muted-foreground">
              Physics Shan Se · Registered Students
            </p>
          </div>
        </div>

        {!isAuthenticated ? (
          /* ─── Password gate ─────────────────────────────────── */
          <div className="max-w-sm mx-auto">
            <div
              className="bg-card border border-border rounded-2xl p-8"
              style={{ boxShadow: "0 2px 16px 0 rgba(26,46,90,0.09)" }}
              data-ocid="admin.login.panel"
            >
              <div className="flex flex-col items-center mb-7">
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                  style={{
                    background: "oklch(var(--orange) / 0.10)",
                    border: "1px solid oklch(var(--orange) / 0.25)",
                  }}
                >
                  <Lock
                    size={28}
                    strokeWidth={1.6}
                    style={{ color: "oklch(var(--orange))" }}
                  />
                </div>
                <h2
                  className="text-xl font-bold text-navy text-center"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  Admin Access
                </h2>
                <p className="text-sm font-sans text-muted-foreground text-center mt-1">
                  Enter the admin password to view student data.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="admin-password"
                    className="text-sm font-semibold text-foreground font-sans"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setAuthError(false);
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter admin password"
                      className="pr-10 h-11 text-base border-border focus:ring-2"
                      style={
                        authError
                          ? { borderColor: "oklch(var(--destructive))" }
                          : {}
                      }
                      autoComplete="current-password"
                      data-ocid="admin.password.input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      data-ocid="admin.password.toggle"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  {authError && (
                    <div
                      className="flex items-center gap-2 text-sm text-destructive bg-destructive/8 border border-destructive/20 rounded-md px-3 py-2"
                      role="alert"
                      aria-live="polite"
                      data-ocid="admin.login.error_state"
                    >
                      <AlertCircle size={14} className="shrink-0" />
                      <span>Incorrect password. Please try again.</span>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleLogin}
                  className="w-full h-11 text-base font-semibold text-white transition-colors duration-200"
                  style={{ backgroundColor: "oklch(var(--orange))" }}
                  data-ocid="admin.login.submit_button"
                >
                  Access Panel
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* ─── Student table ─────────────────────────────────── */
          <div>
            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div
                className="flex items-center gap-3 px-5 py-3.5 rounded-xl border"
                style={{
                  backgroundColor: "oklch(var(--orange) / 0.07)",
                  borderColor: "oklch(var(--orange) / 0.25)",
                }}
                data-ocid="admin.stats.card"
              >
                <Users size={20} style={{ color: "oklch(var(--orange))" }} />
                <div>
                  <p className="text-xs font-sans text-muted-foreground leading-none mb-0.5">
                    Total Registered
                  </p>
                  <p
                    className="text-2xl font-bold leading-none"
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      color: "oklch(var(--navy))",
                    }}
                  >
                    {isLoading ? "—" : (students?.length ?? 0)}
                  </p>
                </div>
              </div>

              {/* Search */}
              <div className="flex-1 min-w-[200px] max-w-xs">
                <Input
                  type="search"
                  placeholder="Search by name, phone, school…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 text-sm border-border"
                  data-ocid="admin.search.input"
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAuthenticated(false)}
                className="text-xs font-sans ml-auto"
                data-ocid="admin.logout.button"
              >
                Lock Panel
              </Button>
            </div>

            {/* Loading state */}
            {isLoading && (
              <div
                className="flex items-center justify-center py-20 gap-3 text-muted-foreground font-sans text-sm"
                data-ocid="admin.table.loading_state"
              >
                <Loader2 size={18} className="animate-spin" />
                Loading student data…
              </div>
            )}

            {/* Error state */}
            {isError && !isLoading && (
              <div
                className="flex items-center gap-2 text-sm text-destructive bg-destructive/8 border border-destructive/20 rounded-xl px-5 py-4"
                role="alert"
                data-ocid="admin.table.error_state"
              >
                <AlertCircle size={16} className="shrink-0" />
                <span>
                  Failed to load student data. Please refresh the page.
                </span>
              </div>
            )}

            {/* Empty state */}
            {!isLoading && !isError && filteredStudents.length === 0 && (
              <div
                className="flex flex-col items-center justify-center py-16 rounded-xl border border-border bg-card text-center"
                data-ocid="admin.table.empty_state"
              >
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-full mb-4"
                  style={{ backgroundColor: "oklch(var(--orange) / 0.10)" }}
                >
                  <School size={24} style={{ color: "oklch(var(--orange))" }} />
                </div>
                <p className="text-base font-semibold text-navy font-sans">
                  {searchQuery ? "No matching students" : "No students yet"}
                </p>
                <p className="text-sm text-muted-foreground font-sans mt-1">
                  {searchQuery
                    ? "Try a different search term."
                    : "Registrations will appear here once students sign up."}
                </p>
              </div>
            )}

            {/* Table */}
            {!isLoading && !isError && filteredStudents.length > 0 && (
              <div
                className="rounded-xl border border-border overflow-hidden"
                style={{ boxShadow: "0 1px 8px 0 rgba(26,46,90,0.07)" }}
                data-ocid="admin.students.table"
              >
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow
                        style={{
                          backgroundColor: "oklch(var(--navy) / 0.06)",
                        }}
                      >
                        <TableHead className="font-sans font-semibold text-navy text-xs uppercase tracking-wider py-3.5">
                          #
                        </TableHead>
                        <TableHead className="font-sans font-semibold text-navy text-xs uppercase tracking-wider py-3.5">
                          Name
                        </TableHead>
                        <TableHead className="font-sans font-semibold text-navy text-xs uppercase tracking-wider py-3.5">
                          Phone
                        </TableHead>
                        <TableHead className="font-sans font-semibold text-navy text-xs uppercase tracking-wider py-3.5 hidden sm:table-cell">
                          Email
                        </TableHead>
                        <TableHead className="font-sans font-semibold text-navy text-xs uppercase tracking-wider py-3.5 hidden md:table-cell">
                          School
                        </TableHead>
                        <TableHead className="font-sans font-semibold text-navy text-xs uppercase tracking-wider py-3.5 hidden lg:table-cell">
                          Pincode
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student, index) => (
                        <TableRow
                          key={student.id.toString()}
                          className="hover:bg-muted/40 transition-colors"
                          style={
                            index % 2 === 0
                              ? { backgroundColor: "transparent" }
                              : {
                                  backgroundColor: "oklch(var(--navy) / 0.025)",
                                }
                          }
                          data-ocid={`admin.students.row.${index + 1}`}
                        >
                          <TableCell className="font-sans text-xs text-muted-foreground py-3.5 w-10">
                            <Badge
                              variant="outline"
                              className="text-xs font-mono px-1.5 py-0"
                            >
                              {index + 1}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-sans font-semibold text-sm text-foreground py-3.5">
                            {student.name}
                          </TableCell>
                          <TableCell className="font-sans text-sm text-foreground py-3.5">
                            <a
                              href={`tel:${student.phone}`}
                              className="hover:text-orange transition-colors"
                              style={{ color: "oklch(var(--orange))" }}
                            >
                              {student.phone}
                            </a>
                          </TableCell>
                          <TableCell className="font-sans text-sm text-muted-foreground py-3.5 hidden sm:table-cell max-w-[180px] truncate">
                            {student.email || "—"}
                          </TableCell>
                          <TableCell className="font-sans text-sm text-muted-foreground py-3.5 hidden md:table-cell max-w-[200px] truncate">
                            {student.school || "—"}
                          </TableCell>
                          <TableCell className="font-sans text-sm text-muted-foreground py-3.5 hidden lg:table-cell">
                            {student.pincode || "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Footer count */}
                <div
                  className="px-5 py-3 border-t border-border flex items-center justify-between"
                  style={{ backgroundColor: "oklch(var(--navy) / 0.03)" }}
                >
                  <p className="text-xs font-sans text-muted-foreground">
                    Showing{" "}
                    <span className="font-semibold text-foreground">
                      {filteredStudents.length}
                    </span>{" "}
                    {searchQuery ? "matching" : ""} student
                    {filteredStudents.length !== 1 ? "s" : ""}
                    {searchQuery && students && (
                      <> of {students.length} total</>
                    )}
                  </p>
                  <p className="text-xs font-sans text-muted-foreground hidden sm:block">
                    Data is live from the backend
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-border py-5 px-4 text-center">
        <p className="text-xs text-muted-foreground font-sans">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-orange transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
