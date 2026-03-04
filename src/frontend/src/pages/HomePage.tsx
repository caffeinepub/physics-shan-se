import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  BookOpen,
  Calculator,
  FlaskConical,
  Lightbulb,
  MessageCircle,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import NavBar from "../components/layout/NavBar";
import { BOARD_OPTIONS, CLASS_OPTIONS } from "../data/chapters";

// ─── USP Data ─────────────────────────────────────────────────────────────────
const USP_CARDS = [
  {
    icon: Users,
    title: "Small Batches",
    desc: "Max 10 students per batch — personal attention guaranteed for every student.",
  },
  {
    icon: Lightbulb,
    title: "Concept First",
    desc: "Deep conceptual understanding before numericals. No rote learning.",
  },
  {
    icon: Calculator,
    title: "Extensive Numericals",
    desc: "Rigorous problem-solving practice every single session.",
  },
  {
    icon: FlaskConical,
    title: "Regular Experiments",
    desc: "Hands-on experiments to build real, intuitive understanding of physics.",
  },
  {
    icon: Star,
    title: "Personal Attention",
    desc: "Every student's progress is tracked and guided individually.",
  },
  {
    icon: BookOpen,
    title: "Board-Focused Study",
    desc: "Content strictly aligned to CBSE and ICSE board patterns for exam readiness.",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [showError, setShowError] = useState(false);

  const handleProceed = () => {
    if (!selectedClass || !selectedBoard) {
      setShowError(true);
      return;
    }
    setShowError(false);
    navigate({
      to: "/learn",
      search: { class: selectedClass, board: selectedBoard },
    });
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    if (showError && value && selectedBoard) setShowError(false);
  };

  const handleBoardChange = (value: string) => {
    setSelectedBoard(value);
    if (showError && selectedClass && value) setShowError(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />

      <main className="flex-1 flex flex-col items-center px-4 py-10 sm:py-14">
        {/* ─── Class & Board Selector ───────────────────────────── */}
        <div
          className="w-full max-w-md bg-card border border-border rounded-lg p-7 sm:p-9 mb-10"
          style={{ boxShadow: "0 2px 12px 0 rgba(26, 46, 90, 0.07)" }}
        >
          <h2
            className="text-lg font-semibold text-navy mb-6 text-center"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Select Your Class &amp; Board
          </h2>

          <div className="space-y-5">
            {/* Class Select */}
            <div className="space-y-2">
              <Label
                htmlFor="class-select"
                className="text-sm font-semibold text-foreground font-sans"
              >
                Select Class
              </Label>
              <Select value={selectedClass} onValueChange={handleClassChange}>
                <SelectTrigger
                  id="class-select"
                  className="w-full h-11 text-base border-border focus:ring-2 focus:ring-orange"
                  data-ocid="home.class_select"
                >
                  <SelectValue placeholder="Choose a class…" />
                </SelectTrigger>
                <SelectContent>
                  {CLASS_OPTIONS.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Board Select */}
            <div className="space-y-2">
              <Label
                htmlFor="board-select"
                className="text-sm font-semibold text-foreground font-sans"
              >
                Select Board
              </Label>
              <Select value={selectedBoard} onValueChange={handleBoardChange}>
                <SelectTrigger
                  id="board-select"
                  className="w-full h-11 text-base border-border focus:ring-2 focus:ring-orange"
                  data-ocid="home.board_select"
                >
                  <SelectValue placeholder="Choose a board…" />
                </SelectTrigger>
                <SelectContent>
                  {BOARD_OPTIONS.map((board) => (
                    <SelectItem key={board} value={board}>
                      {board}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Validation message */}
            {showError && (
              <div
                className="flex items-center gap-2 text-sm text-destructive bg-destructive/8 border border-destructive/20 rounded-md px-3 py-2.5"
                role="alert"
                aria-live="polite"
                data-ocid="home.error_state"
              >
                <AlertCircle size={15} className="shrink-0" />
                <span>Please select both a class and a board to continue.</span>
              </div>
            )}

            {/* Proceed Button */}
            <Button
              onClick={handleProceed}
              className="w-full h-12 text-base font-semibold bg-orange text-white hover:bg-[oklch(0.64_0.18_50)] transition-colors duration-200 rounded-md mt-1"
              data-ocid="home.proceed_button"
            >
              Proceed →
            </Button>
          </div>
        </div>

        {/* ─── Why Physics Shan Se ──────────────────────────────── */}
        <section
          className="w-full max-w-3xl mb-10"
          data-ocid="home.why.section"
        >
          {/* Section heading */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-1 h-7 rounded-full shrink-0"
              style={{ backgroundColor: "oklch(var(--orange))" }}
              aria-hidden="true"
            />
            <h2
              className="text-2xl sm:text-3xl font-bold text-navy"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Why Physics Shan Se?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USP_CARDS.map((usp, idx) => {
              const Icon = usp.icon;
              return (
                <div
                  key={usp.title}
                  className="bg-card rounded-xl border border-border p-5 flex flex-col gap-3 transition-shadow hover:shadow-md"
                  style={{ boxShadow: "0 1px 4px 0 rgba(26, 46, 90, 0.06)" }}
                  data-ocid={`home.usp.card.${idx + 1}`}
                >
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                    style={{
                      backgroundColor: "oklch(var(--orange) / 0.10)",
                      border: "1px solid oklch(var(--orange) / 0.25)",
                    }}
                    aria-hidden="true"
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      style={{ color: "oklch(var(--orange))" }}
                    />
                  </span>
                  <div>
                    <h3
                      className="text-base font-bold text-navy leading-snug mb-1"
                      style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                      }}
                    >
                      {usp.title}
                    </h3>
                    <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                      {usp.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Fee Structure ────────────────────────────────────── */}
        <section
          className="w-full max-w-3xl mb-6"
          data-ocid="home.fees.section"
        >
          {/* Section heading */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-1 h-7 rounded-full shrink-0"
              style={{ backgroundColor: "oklch(var(--orange))" }}
              aria-hidden="true"
            />
            <h2
              className="text-2xl sm:text-3xl font-bold text-navy"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Fee Structure
            </h2>
          </div>

          {/* Batch start banner */}
          <div
            className="flex items-center gap-3 rounded-lg px-5 py-3.5 mb-6"
            style={{
              backgroundColor: "oklch(var(--orange) / 0.08)",
              border: "1px solid oklch(var(--orange) / 0.25)",
              borderLeft: "4px solid oklch(var(--orange))",
            }}
          >
            <span
              className="text-sm font-sans font-semibold"
              style={{ color: "oklch(var(--orange))" }}
            >
              🗓 Batches starting April 4th, 2026
            </span>
            <span className="text-xs font-sans text-muted-foreground ml-auto hidden sm:block">
              Limited seats · Weekend only
            </span>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {/* Class 9 */}
            <div
              className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2"
              style={{ boxShadow: "0 1px 4px 0 rgba(26, 46, 90, 0.06)" }}
              data-ocid="home.fees.class9.card"
            >
              <span className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-widest">
                Class 9
              </span>
              <div className="flex items-end gap-1 mt-1">
                <span
                  className="text-4xl font-serif font-bold leading-none"
                  style={{ color: "oklch(var(--navy))" }}
                >
                  ₹1,200
                </span>
                <span className="text-sm font-sans text-muted-foreground mb-0.5">
                  / month
                </span>
              </div>
              <p className="text-xs font-sans text-muted-foreground mt-1 leading-relaxed">
                CBSE &amp; ICSE · Saturday batches available
              </p>
            </div>

            {/* Class 10 */}
            <div
              className="rounded-xl p-6 flex flex-col gap-2 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.17 0.07 254) 0%, oklch(0.22 0.08 254) 100%)",
                boxShadow: "0 4px 16px 0 rgba(26, 46, 90, 0.14)",
              }}
              data-ocid="home.fees.class10.card"
            >
              {/* Subtle top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: "oklch(var(--orange))" }}
                aria-hidden="true"
              />
              <span
                className="text-xs font-sans font-semibold uppercase tracking-widest"
                style={{ color: "oklch(0.7 0.05 240)" }}
              >
                Class 10
              </span>
              <div className="flex items-end gap-1 mt-1">
                <span
                  className="text-4xl font-serif font-bold leading-none"
                  style={{ color: "oklch(0.98 0 0)" }}
                >
                  ₹1,500
                </span>
                <span
                  className="text-sm font-sans mb-0.5"
                  style={{ color: "oklch(0.7 0.05 240)" }}
                >
                  / month
                </span>
              </div>
              <p
                className="text-xs font-sans mt-1 leading-relaxed"
                style={{ color: "oklch(0.7 0.05 240)" }}
              >
                CBSE &amp; ICSE · Sunday batches available
              </p>
            </div>
          </div>

          {/* Admission fee note */}
          <p className="text-sm font-sans text-muted-foreground text-center mb-2">
            <span className="font-semibold text-foreground">
              Admission Fee: ₹1,000
            </span>{" "}
            (one-time, non-refundable)
          </p>
        </section>

        {/* ─── Enrol CTA ───────────────────────────────────────── */}
        <div className="text-center mt-2 mb-10">
          <a
            href="https://wa.me/919830277479"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-md text-white font-sans font-semibold text-base transition-colors duration-200"
            style={{ backgroundColor: "oklch(var(--orange))" }}
            data-ocid="home.whatsapp_button"
          >
            Enquire on WhatsApp: 9830277479
          </a>
          <p className="text-xs text-muted-foreground font-sans mt-2">
            WhatsApp messages only · 121, Prajapati Mansion, Dakshin Jagaddal,
            Kolkata 700149
          </p>
        </div>

        {/* ─── Profile / Hero Section (at the end) ─────────────── */}
        <section
          className="w-full max-w-3xl mb-4 rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.17 0.07 254) 0%, oklch(0.22 0.08 254) 60%, oklch(0.20 0.07 260) 100%)",
            boxShadow: "0 4px 32px 0 rgba(26, 46, 90, 0.18)",
          }}
          data-ocid="home.hero.section"
        >
          {/* Orange top-bar accent */}
          <div
            className="h-1.5 w-full"
            style={{ background: "oklch(var(--orange))" }}
            aria-hidden="true"
          />

          <div className="px-7 sm:px-12 py-10 sm:py-14 flex flex-col sm:flex-row gap-8 items-start sm:items-center">
            {/* Left: text */}
            <div className="flex-1">
              {/* Credential badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span
                  className="inline-flex items-center text-xs font-sans font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "oklch(var(--orange) / 0.15)",
                    color: "oklch(0.88 0.14 50)",
                    border: "1px solid oklch(var(--orange) / 0.35)",
                  }}
                >
                  BE · NIT Jsr
                </span>
                <span
                  className="inline-flex items-center text-xs font-sans font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "oklch(var(--orange) / 0.15)",
                    color: "oklch(0.88 0.14 50)",
                    border: "1px solid oklch(var(--orange) / 0.35)",
                  }}
                >
                  MBA · IMT Gzb
                </span>
              </div>

              {/* Teacher name */}
              <h2
                className="text-3xl sm:text-4xl font-bold leading-tight mb-2"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  color: "oklch(0.98 0 0)",
                }}
              >
                Shantanu Chatterjee
              </h2>

              {/* Subtitle */}
              <p
                className="text-sm font-sans leading-relaxed"
                style={{ color: "oklch(0.75 0.03 240)" }}
              >
                Weekend physics classes for Class 9 &amp; 10 · CBSE &amp; ICSE ·
                Kolkata
              </p>
            </div>

            {/* Right: logo */}
            <div
              className="shrink-0 flex items-center justify-center rounded-xl p-3"
              style={{
                backgroundColor: "oklch(var(--orange) / 0.10)",
                border: "1px solid oklch(var(--orange) / 0.25)",
              }}
              aria-hidden="true"
            >
              <img
                src="/assets/uploads/Physics-Shan-Se-Logo-1.jpg"
                alt="Physics Shan Se"
                className="w-24 h-24 object-contain rounded-lg"
              />
            </div>
          </div>
        </section>
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
