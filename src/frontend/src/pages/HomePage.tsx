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
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import NavBar from "../components/layout/NavBar";
import { BOARD_OPTIONS, CLASS_OPTIONS } from "../data/chapters";

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
        {/* ─── Hero Poster ─────────────────────────────────────── */}
        <div className="w-full max-w-3xl mb-10">
          <img
            src="/assets/uploads/Poster-1-3.png"
            alt="Physics Shan Se — Weekend Physics Batches by Shantanu Chatterjee"
            className="w-full rounded-xl shadow-md object-contain"
            style={{ maxHeight: 600 }}
          />
        </div>

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
        <div className="w-full max-w-3xl mb-10">
          <img
            src="/assets/uploads/Why-Physics-Shan-Se-4.png"
            alt="Why Physics Shan Se — Small batches, deep concepts, extensive numericals, regular experiments"
            className="w-full rounded-xl shadow-md object-contain"
          />
        </div>

        {/* ─── Fee Structure ────────────────────────────────────── */}
        <div className="w-full max-w-3xl mb-6">
          <img
            src="/assets/uploads/Fees-Structure-1.png"
            alt="Physics Shan Se Fee Structure — Admission ₹1000, Class 9: ₹1200/month, Class 10: ₹1500/month. Batches starting April 4th 2026."
            className="w-full rounded-xl shadow-md object-contain"
          />
        </div>

        {/* ─── Enrol CTA ───────────────────────────────────────── */}
        <div className="text-center mt-2 mb-4">
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
