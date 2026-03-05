import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { AlertCircle, Loader2, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import { useStudentAuth } from "../hooks/useStudentAuth";

interface SearchParams {
  redirect?: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as SearchParams;
  const redirectTo = search.redirect ?? "/learn";

  const { register, login } = useStudentAuth();

  // ── New Student form state ────────────────────────────────────────────────
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPincode, setRegPincode] = useState("");
  const [regSchool, setRegSchool] = useState("");
  const [regError, setRegError] = useState<string | null>(null);
  const [regLoading, setRegLoading] = useState(false);

  // ── Returning Student form state ──────────────────────────────────────────
  const [loginPhone, setLoginPhone] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // ── Register handler ──────────────────────────────────────────────────────
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (
      !regName.trim() ||
      !regEmail.trim() ||
      !regPhone.trim() ||
      !regPincode.trim() ||
      !regSchool.trim()
    ) {
      setRegError("Please fill in all fields.");
      return;
    }
    if (!/^\d{10}$/.test(regPhone.trim())) {
      setRegError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!/^\d{6}$/.test(regPincode.trim())) {
      setRegError("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      setRegLoading(true);
      await register(
        regName.trim(),
        regEmail.trim(),
        regPhone.trim(),
        regPincode.trim(),
        regSchool.trim(),
      );
      navigate({ to: redirectTo as "/" });
    } catch {
      setRegError(
        "Registration failed. Please try again or contact us on WhatsApp.",
      );
    } finally {
      setRegLoading(false);
    }
  };

  // ── Login handler ─────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginPhone.trim()) {
      setLoginError("Please enter your phone number.");
      return;
    }
    if (!/^\d{10}$/.test(loginPhone.trim())) {
      setLoginError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setLoginLoading(true);
      const profile = await login(loginPhone.trim());
      if (!profile) {
        setLoginError(
          "Phone number not found. Please register first or check the number you entered.",
        );
        return;
      }
      navigate({ to: redirectTo as "/" });
    } catch {
      setLoginError("Something went wrong. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.97 0.015 65 / 0.6) 0%, oklch(0.99 0 0) 60%)",
      }}
    >
      {/* Card */}
      <div
        className="w-full max-w-md bg-card rounded-2xl border border-border px-8 py-9 flex flex-col gap-6"
        style={{ boxShadow: "0 4px 32px 0 rgba(26, 46, 90, 0.09)" }}
      >
        {/* Logo + Branding */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="flex items-center justify-center rounded-xl p-2.5"
            style={{
              backgroundColor: "oklch(var(--orange) / 0.10)",
              border: "1px solid oklch(var(--orange) / 0.25)",
            }}
          >
            <img
              src="/assets/uploads/Physics-Shan-Se-Logo-1.jpg"
              alt="Physics Shan Se"
              className="w-16 h-16 object-contain rounded-lg"
            />
          </div>
          <div className="text-center">
            <h1
              className="text-2xl font-bold text-navy leading-tight"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Physics Shan Se
            </h1>
            <p className="text-xs text-muted-foreground font-sans mt-0.5">
              Register to access study material, tests &amp; exams
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="register" className="w-full" data-ocid="auth.tab">
          <TabsList
            className="w-full grid grid-cols-2 mb-2"
            data-ocid="auth.tab"
          >
            <TabsTrigger
              value="register"
              className="gap-1.5 text-sm font-sans font-semibold"
              data-ocid="auth.register.tab"
            >
              <UserPlus size={14} />
              New Student
            </TabsTrigger>
            <TabsTrigger
              value="login"
              className="gap-1.5 text-sm font-sans font-semibold"
              data-ocid="auth.login.tab"
            >
              <LogIn size={14} />
              Returning Student
            </TabsTrigger>
          </TabsList>

          {/* ── New Student ─────────────────────────────────────── */}
          <TabsContent value="register" className="mt-4">
            <form onSubmit={handleRegister} noValidate className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="reg-name"
                  className="text-sm font-semibold text-foreground font-sans"
                >
                  Full Name
                </Label>
                <Input
                  id="reg-name"
                  type="text"
                  placeholder="Your full name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  autoComplete="name"
                  className="h-11 text-base border-border focus-visible:ring-orange"
                  data-ocid="register.name.input"
                />
              </div>

              {/* Email ID */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="reg-email"
                  className="text-sm font-semibold text-foreground font-sans"
                >
                  Email ID
                </Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="yourname@email.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  autoComplete="email"
                  className="h-11 text-base border-border focus-visible:ring-orange"
                  data-ocid="register.email.input"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="reg-phone"
                  className="text-sm font-semibold text-foreground font-sans"
                >
                  Phone Number
                </Label>
                <Input
                  id="reg-phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={regPhone}
                  onChange={(e) =>
                    setRegPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  autoComplete="tel"
                  className="h-11 text-base border-border focus-visible:ring-orange"
                  data-ocid="register.phone.input"
                />
              </div>

              {/* Pincode */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="reg-pincode"
                  className="text-sm font-semibold text-foreground font-sans"
                >
                  Pincode
                </Label>
                <Input
                  id="reg-pincode"
                  type="text"
                  placeholder="6-digit pincode"
                  value={regPincode}
                  onChange={(e) =>
                    setRegPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  autoComplete="postal-code"
                  className="h-11 text-base border-border focus-visible:ring-orange"
                  data-ocid="register.pincode.input"
                />
              </div>

              {/* School Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="reg-school"
                  className="text-sm font-semibold text-foreground font-sans"
                >
                  School Name
                </Label>
                <Input
                  id="reg-school"
                  type="text"
                  placeholder="Name of your school"
                  value={regSchool}
                  onChange={(e) => setRegSchool(e.target.value)}
                  autoComplete="organization"
                  className="h-11 text-base border-border focus-visible:ring-orange"
                  data-ocid="register.school.input"
                />
              </div>

              {/* Error */}
              {regError && (
                <div
                  className="flex items-start gap-2 text-sm text-destructive bg-destructive/8 border border-destructive/20 rounded-md px-3 py-2.5"
                  role="alert"
                  aria-live="polite"
                  data-ocid="register.error_state"
                >
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  <span>{regError}</span>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={regLoading}
                className="w-full h-12 text-base font-semibold font-sans bg-orange text-white hover:bg-[oklch(0.64_0.18_50)] disabled:opacity-60 transition-colors duration-200 rounded-md"
                data-ocid="register.submit_button"
              >
                {regLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering…
                  </>
                ) : (
                  "Register & Continue →"
                )}
              </Button>
            </form>
          </TabsContent>

          {/* ── Returning Student ────────────────────────────────── */}
          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleLogin} noValidate className="space-y-4">
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                Enter the phone number you used when you registered. We'll log
                you back in instantly.
              </p>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="login-phone"
                  className="text-sm font-semibold text-foreground font-sans"
                >
                  Phone Number
                </Label>
                <Input
                  id="login-phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={loginPhone}
                  onChange={(e) =>
                    setLoginPhone(
                      e.target.value.replace(/\D/g, "").slice(0, 10),
                    )
                  }
                  autoComplete="tel"
                  className="h-11 text-base border-border focus-visible:ring-orange"
                  data-ocid="login.phone.input"
                />
              </div>

              {/* Error */}
              {loginError && (
                <div
                  className="flex items-start gap-2 text-sm text-destructive bg-destructive/8 border border-destructive/20 rounded-md px-3 py-2.5"
                  role="alert"
                  aria-live="polite"
                  data-ocid="login.error_state"
                >
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={loginLoading}
                className="w-full h-12 text-base font-semibold font-sans bg-orange text-white hover:bg-[oklch(0.64_0.18_50)] disabled:opacity-60 transition-colors duration-200 rounded-md"
                data-ocid="login.submit_button"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in…
                  </>
                ) : (
                  "Log In →"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {/* Footer note */}
        <p className="text-xs text-muted-foreground font-sans text-center leading-relaxed">
          Your details are used only to provide access to Physics Shan Se study
          material.
        </p>
      </div>

      {/* Site footer */}
      <p className="text-xs text-muted-foreground font-sans mt-8">
        © Physics Shan Se
      </p>
    </div>
  );
}
