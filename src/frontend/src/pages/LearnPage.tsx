import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookMarked,
  BookOpen,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Download,
  FileDown,
  FileText,
  ImageIcon,
  MapPin,
  Phone,
  School,
  Sigma,
  TrendingUp,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import NavBar from "../components/layout/NavBar";
import { CHAPTERS } from "../data/chapters";

// ─── Types ───────────────────────────────────────────────────────────────────
interface SearchParams {
  class?: string;
  board?: string;
}

interface PayItem {
  label: string;
  price: number;
  description: string;
}

// ─── UPI Payment Modal ────────────────────────────────────────────────────────
function UpiModal({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item: PayItem | null;
}) {
  if (!item) return null;
  const upiId = "9830277479@ybl";
  const encodedNote = encodeURIComponent(`Physics Shan Se: ${item.label}`);
  const upiDeepLink = `upi://pay?pa=${upiId}&pn=Physics+Shan+Se&am=${item.price}&cu=INR&tn=${encodedNote}`;
  const waMsg = encodeURIComponent(
    `Hi, I have paid ₹${item.price} for "${item.label}" on Physics Shan Se. Please send me the file.`,
  );
  const waLink = `https://wa.me/919830277479?text=${waMsg}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-full" data-ocid="upi.dialog">
        <DialogHeader>
          <DialogTitle className="text-navy font-serif text-lg">
            Pay &amp; Download
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          {/* Item info */}
          <div className="bg-orange/8 border border-orange/20 rounded-lg px-4 py-3">
            <p className="text-sm font-sans font-semibold text-navy">
              {item.label}
            </p>
            <p className="text-xs text-muted-foreground font-sans mt-0.5">
              {item.description}
            </p>
            <p className="text-2xl font-serif font-bold text-orange mt-2">
              ₹{item.price}
            </p>
          </div>

          {/* UPI details */}
          <div className="space-y-1">
            <p className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wide">
              UPI ID
            </p>
            <p className="text-base font-sans font-bold text-navy">{upiId}</p>
            <p className="text-xs text-muted-foreground font-sans">
              Open any UPI app and pay to the above ID, or tap the button below.
            </p>
          </div>

          {/* Pay button */}
          <a
            href={upiDeepLink}
            className="flex items-center justify-center gap-2 w-full rounded-md py-3 text-white font-sans font-semibold text-sm transition-colors duration-200"
            style={{ backgroundColor: "oklch(var(--orange))" }}
            data-ocid="upi.pay_button"
          >
            Open UPI App &amp; Pay ₹{item.price}
          </a>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-sans">
              After payment
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* WhatsApp link */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-md py-2.5 border border-border text-foreground font-sans font-semibold text-sm hover:bg-muted/40 transition-colors"
            data-ocid="upi.whatsapp_button"
          >
            <Phone size={14} />
            Share Screenshot on WhatsApp
          </a>

          <p className="text-xs text-muted-foreground font-sans text-center leading-relaxed">
            Send your payment screenshot to WhatsApp and we will send you the
            file within a few hours.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
          data-ocid="upi.close_button"
        >
          <X size={18} />
        </button>
      </DialogContent>
    </Dialog>
  );
}

// ─── Pay & Download Button ────────────────────────────────────────────────────
function PayButton({
  item,
  ocid,
  onPay,
}: {
  item: PayItem;
  ocid: string;
  onPay: (item: PayItem) => void;
}) {
  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={() => onPay(item)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-sans font-semibold rounded-md border border-orange/40 text-orange bg-orange/6 hover:bg-orange/12 transition-colors cursor-pointer select-none whitespace-nowrap"
    >
      <Download size={13} className="shrink-0" />₹{item.price} Pay &amp;
      Download
    </button>
  );
}

// ─── Chapter List with Pay ────────────────────────────────────────────────────
function ChapterList({
  chapters,
  scope,
  makeItem,
  onPay,
}: {
  chapters: string[];
  scope: string;
  makeItem: (chapter: string, idx: number) => PayItem;
  onPay: (item: PayItem) => void;
}) {
  return (
    <ul className="divide-y divide-border">
      {chapters.map((chapter, idx) => (
        <li
          key={chapter}
          className="flex items-center justify-between py-3 px-1 gap-3"
          data-ocid={`${scope}.item.${idx + 1}`}
        >
          <span className="text-sm font-sans text-foreground leading-snug">
            <span className="inline-block w-6 text-muted-foreground text-xs font-medium tabular-nums mr-1">
              {String(idx + 1).padStart(2, "0")}.
            </span>
            {chapter}
          </span>
          <PayButton
            item={makeItem(chapter, idx)}
            ocid={`${scope}.button.${idx + 1}`}
            onPay={onPay}
          />
        </li>
      ))}
    </ul>
  );
}

// ─── Section wrapper ─────────────────────────────────────────────────────────
function SectionCard({
  id,
  ocid,
  children,
}: {
  id?: string;
  ocid: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-ocid={ocid}
      className="bg-card border border-border rounded-lg p-6 md:p-8"
      style={{ boxShadow: "0 1px 3px 0 rgba(26, 46, 90, 0.06)" }}
    >
      {children}
    </section>
  );
}

// ─── Section heading ─────────────────────────────────────────────────────────
function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span
        className="text-orange font-sans font-bold text-sm tracking-widest uppercase opacity-70"
        aria-hidden="true"
      >
        {number}
      </span>
      <h2
        className="text-2xl md:text-3xl font-bold text-navy"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {title}
      </h2>
    </div>
  );
}

// ─── Attend Class Section ─────────────────────────────────────────────────────
function AttendClassSection() {
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=121+Prajapati+Mansion+Near+Kali+Shani+Mandir+Badamtala+Dakshin+Jagaddal+Kolkata+700149";

  const BATCHES = [
    { day: "Saturday", time: "8:00 – 10:00 AM", cls: "CBSE 10" },
    { day: "Saturday", time: "10:00 AM – 12:00 PM", cls: "CBSE 9" },
    { day: "Sunday", time: "8:00 – 10:00 AM", cls: "ICSE 10" },
    { day: "Sunday", time: "10:00 AM – 12:00 PM", cls: "ICSE 9" },
  ];

  return (
    <div className="-mx-6 md:-mx-8 -mt-6 md:-mt-8 overflow-hidden rounded-lg">
      {/* Banner strip */}
      <div
        className="px-6 md:px-8 py-5 border-b border-border flex items-center gap-4"
        style={{
          background:
            "linear-gradient(to right, oklch(0.96 0.04 50 / 0.45), oklch(0.97 0.03 65 / 0.35))",
          borderLeft: "4px solid oklch(var(--orange))",
        }}
      >
        <span
          className="text-orange font-sans font-black text-4xl leading-none opacity-20 select-none"
          aria-hidden="true"
        >
          01
        </span>
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-navy leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Attend Class
          </h2>
          <p className="text-sm font-sans text-muted-foreground mt-0.5">
            Weekend in-person physics classes in Kolkata
          </p>
        </div>
      </div>

      {/* Three feature cards */}
      <div className="px-6 md:px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Location card */}
        <div
          className="rounded-lg border border-border bg-background p-5 flex flex-col gap-3"
          data-ocid="attend.location.card"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-orange/30 bg-orange/8 text-orange shrink-0">
              <MapPin size={17} strokeWidth={1.8} />
            </span>
            <h3
              className="text-base font-bold text-navy"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Our Location
            </h3>
          </div>

          <address className="not-italic text-sm font-sans text-foreground leading-relaxed border-l-2 border-orange/30 pl-3 ml-1">
            121, Prajapati Mansion,
            <br />
            Near Kali Shani Mandir,
            <br />
            Badamtala, Dakshin Jagaddal,
            <br />
            <span className="font-medium">Kolkata – 700149</span>
          </address>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-orange underline underline-offset-2 hover:opacity-75 transition-opacity mt-auto"
            aria-label="Get directions on Google Maps"
          >
            <MapPin size={11} />
            Get Directions on Google Maps
          </a>
        </div>

        {/* Contact card */}
        <div
          className="rounded-lg border border-border bg-background p-5 flex flex-col gap-3"
          data-ocid="attend.contact.card"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-orange/30 bg-orange/8 text-orange shrink-0">
              <Phone size={17} strokeWidth={1.8} />
            </span>
            <h3
              className="text-base font-bold text-navy"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Contact Us
            </h3>
          </div>

          <div className="space-y-0.5">
            <a
              href="https://wa.me/919830277479"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg font-sans font-bold text-orange hover:opacity-80 transition-opacity"
              aria-label="WhatsApp 9830277479"
            >
              9830277479
            </a>
            <p className="text-xs text-muted-foreground font-sans">
              WhatsApp messages only
            </p>
          </div>

          <a
            href="https://wa.me/919830277479"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="attend.whatsapp.button"
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-sans font-semibold text-white transition-colors duration-200"
            style={{ backgroundColor: "oklch(var(--orange))" }}
            aria-label="Message on WhatsApp"
          >
            <Phone size={14} strokeWidth={2} />
            Message on WhatsApp
          </a>
        </div>

        {/* Batch Timings card */}
        <div
          className="rounded-lg border border-border bg-background p-5 flex flex-col gap-3"
          data-ocid="attend.timings.card"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-orange/30 bg-orange/8 text-orange shrink-0">
              <Clock size={17} strokeWidth={1.8} />
            </span>
            <h3
              className="text-base font-bold text-navy"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Batch Timings
            </h3>
          </div>

          <p className="text-xs text-muted-foreground font-sans -mt-1">
            Batches starting{" "}
            <span className="text-orange font-semibold">April 4th, 2026</span>
          </p>

          <div className="rounded-md overflow-hidden border border-border text-sm font-sans">
            {/* Table header */}
            <div
              className="grid grid-cols-3 px-3 py-2"
              style={{ backgroundColor: "oklch(var(--orange) / 0.10)" }}
            >
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Day
              </span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Time
              </span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">
                Batch
              </span>
            </div>
            {BATCHES.map((batch, i) => (
              <div
                key={`${batch.day}-${batch.cls}`}
                className="grid grid-cols-3 px-3 py-2.5 border-t border-border items-center"
                style={{
                  backgroundColor:
                    i % 2 === 0 ? "transparent" : "oklch(0.97 0.003 240 / 0.5)",
                }}
              >
                <span className="font-semibold text-navy text-xs">
                  {batch.day}
                </span>
                <span className="text-muted-foreground text-xs leading-snug">
                  {batch.time}
                </span>
                <span
                  className="text-xs font-bold text-right"
                  style={{ color: "oklch(var(--orange))" }}
                >
                  {batch.cls}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground font-sans mt-auto">
            Max 10 students per batch · Personal attention
          </p>
        </div>
      </div>

      {/* Enrolment note */}
      <div className="px-6 md:px-8 pb-6">
        <p className="text-sm font-sans text-muted-foreground italic text-center">
          New enrolments open.{" "}
          <a
            href="https://wa.me/919830277479"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange underline underline-offset-2 not-italic font-medium hover:opacity-75 transition-opacity"
          >
            Contact us on WhatsApp
          </a>{" "}
          to register.
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LearnPage() {
  const search = useSearch({ strict: false }) as SearchParams;
  const selectedClass = search.class ?? "Class 9";
  const selectedBoard = search.board ?? "ICSE";

  const chapters = CHAPTERS[selectedClass]?.[selectedBoard] ?? [];

  // UPI modal state
  const [payItem, setPayItem] = useState<PayItem | null>(null);
  const [upiOpen, setUpiOpen] = useState(false);

  const openPay = (item: PayItem) => {
    setPayItem(item);
    setUpiOpen(true);
  };
  const closePay = () => setUpiOpen(false);

  // Answer sheet upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setUploadedFile(file);
    setUploadSuccess(false);
  };

  const handleSubmitAnswerSheet = () => {
    if (!uploadedFile) return;
    setUploadSuccess(true);
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Comprehensive test groupings (every 3 chapters)
  const compTests: { label: string; chapters: string[] }[] = [];
  for (let i = 0; i < chapters.length; i += 3) {
    const group = chapters.slice(i, i + 3);
    compTests.push({
      label: `Comprehensive Test ${compTests.length + 1}`,
      chapters: group,
    });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />

      {/* UPI Payment Modal */}
      <UpiModal open={upiOpen} onClose={closePay} item={payItem} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-sans text-muted-foreground hover:text-orange transition-colors"
            aria-label="Back to home"
            data-ocid="nav.back_link"
          >
            <ArrowLeft size={14} />
            Home
          </Link>
          <ChevronRight size={14} className="text-muted-foreground" />
          <span
            className="text-base font-semibold text-navy font-sans"
            aria-current="page"
          >
            {selectedClass} · {selectedBoard}
          </span>
        </div>

        <div className="space-y-8">
          {/* ──────────────────────────────────────────────────── */}
          {/* SECTION 1: ATTEND CLASS                             */}
          {/* ──────────────────────────────────────────────────── */}
          <SectionCard id="attend-class" ocid="attend.section">
            <AttendClassSection />
          </SectionCard>

          {/* ──────────────────────────────────────────────────── */}
          {/* SECTION 2: STUDY ONLINE                             */}
          {/* ──────────────────────────────────────────────────── */}
          <SectionCard id="study-online" ocid="study.section">
            <SectionHeading number="02" title="Study Online" />
            <p className="text-sm font-sans text-muted-foreground mb-6 -mt-2">
              Chapter-wise study materials for {selectedClass} ({selectedBoard}
              ). Pay &amp; download each resource.
            </p>

            <Accordion type="multiple" className="space-y-3">
              {/* Chapter Notes */}
              <AccordionItem
                value="notes"
                className="border border-border rounded-lg overflow-hidden"
                data-ocid="study.notes.panel"
              >
                <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-muted/40 transition-colors [&[data-state=open]]:bg-muted/30">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-md border border-orange/30 bg-orange/8 text-orange">
                      <BookOpen size={14} strokeWidth={1.8} />
                    </span>
                    <span className="text-base font-semibold text-navy font-sans">
                      Chapter Notes
                    </span>
                    <span className="text-xs text-muted-foreground font-sans ml-1">
                      ₹49 each
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-1">
                  <ChapterList
                    chapters={chapters}
                    scope="study.notes"
                    makeItem={(chapter) => ({
                      label: `Chapter Notes: ${chapter}`,
                      price: 49,
                      description: `${selectedClass} ${selectedBoard} — Detailed chapter notes`,
                    })}
                    onPay={openPay}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Important Diagrams */}
              <AccordionItem
                value="diagrams"
                className="border border-border rounded-lg overflow-hidden"
                data-ocid="study.diagrams.panel"
              >
                <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-muted/40 transition-colors [&[data-state=open]]:bg-muted/30">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-md border border-orange/30 bg-orange/8 text-orange">
                      <ImageIcon size={14} strokeWidth={1.8} />
                    </span>
                    <span className="text-base font-semibold text-navy font-sans">
                      Important Diagrams
                    </span>
                    <span className="text-xs text-muted-foreground font-sans ml-1">
                      ₹49 each
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-1">
                  <ChapterList
                    chapters={chapters}
                    scope="study.diagrams"
                    makeItem={(chapter) => ({
                      label: `Diagrams: ${chapter}`,
                      price: 49,
                      description: `${selectedClass} ${selectedBoard} — Important diagrams`,
                    })}
                    onPay={openPay}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Formula Sheets */}
              <AccordionItem
                value="formulas"
                className="border border-border rounded-lg overflow-hidden"
                data-ocid="study.formulas.panel"
              >
                <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-muted/40 transition-colors [&[data-state=open]]:bg-muted/30">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-md border border-orange/30 bg-orange/8 text-orange">
                      <Sigma size={14} strokeWidth={1.8} />
                    </span>
                    <span className="text-base font-semibold text-navy font-sans">
                      Formula Sheets
                    </span>
                    <span className="text-xs text-muted-foreground font-sans ml-1">
                      ₹49 each
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-1">
                  <ChapterList
                    chapters={chapters}
                    scope="study.formulas"
                    makeItem={(chapter) => ({
                      label: `Formula Sheet: ${chapter}`,
                      price: 49,
                      description: `${selectedClass} ${selectedBoard} — Formula sheet`,
                    })}
                    onPay={openPay}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Reference Books */}
              <AccordionItem
                value="books"
                className="border border-border rounded-lg overflow-hidden"
                data-ocid="study.books.panel"
              >
                <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-muted/40 transition-colors [&[data-state=open]]:bg-muted/30">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-md border border-orange/30 bg-orange/8 text-orange">
                      <BookMarked size={14} strokeWidth={1.8} />
                    </span>
                    <span className="text-base font-semibold text-navy font-sans">
                      Reference Book Notes
                    </span>
                    <span className="text-xs text-muted-foreground font-sans ml-1">
                      ₹49 each
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-1">
                  <ChapterList
                    chapters={chapters}
                    scope="study.books"
                    makeItem={(chapter) => ({
                      label: `Reference Notes: ${chapter}`,
                      price: 49,
                      description: `${selectedClass} ${selectedBoard} — Reference book notes`,
                    })}
                    onPay={openPay}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SectionCard>

          {/* ──────────────────────────────────────────────────── */}
          {/* SECTION 3: TAKE TEST                                */}
          {/* ──────────────────────────────────────────────────── */}
          <SectionCard id="take-test" ocid="test.section">
            <SectionHeading number="03" title="Take Test" />

            {/* Faculty checking callout */}
            <div
              className="mb-6 rounded-lg px-5 py-5 flex items-start gap-4"
              style={{
                borderLeft: "4px solid oklch(var(--orange))",
                backgroundColor: "oklch(var(--orange) / 0.07)",
                border: "1px solid oklch(var(--orange) / 0.20)",
                borderLeftWidth: "4px",
                borderLeftColor: "oklch(var(--orange))",
              }}
            >
              <span
                className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 mt-0.5"
                style={{
                  backgroundColor: "oklch(var(--orange) / 0.12)",
                  border: "1px solid oklch(var(--orange) / 0.28)",
                }}
                aria-hidden="true"
              >
                <ClipboardCheck
                  size={20}
                  strokeWidth={1.8}
                  style={{ color: "oklch(var(--orange))" }}
                />
              </span>
              <div>
                <h3
                  className="text-base font-bold text-navy mb-1"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  Personally checked by faculty
                </h3>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                  Every test paper is reviewed by{" "}
                  <span className="font-semibold text-foreground">
                    Shantanu Chatterjee
                  </span>{" "}
                  — you get real, handwritten feedback, not automated scoring.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Chapter Tests */}
              <div>
                <h3 className="subsection-heading mb-1">Chapter Tests</h3>
                <p className="text-xs font-sans text-muted-foreground mb-3">
                  One test paper per chapter — ₹29 each. Download, attempt on
                  paper, and submit for faculty feedback.
                </p>
                <ul className="divide-y divide-border">
                  {chapters.map((chapter, idx) => (
                    <li
                      key={chapter}
                      className="flex items-center justify-between py-3 px-1 gap-3"
                      data-ocid={`test.item.${idx + 1}`}
                    >
                      <span className="text-sm font-sans text-foreground leading-snug">
                        <span className="inline-block w-6 text-muted-foreground text-xs font-medium tabular-nums mr-1">
                          {String(idx + 1).padStart(2, "0")}.
                        </span>
                        {chapter}
                      </span>
                      <PayButton
                        item={{
                          label: `Chapter Test: ${chapter}`,
                          price: 29,
                          description: `${selectedClass} ${selectedBoard} — Chapter test paper`,
                        }}
                        ocid={`test.chapter.button.${idx + 1}`}
                        onPay={openPay}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Comprehensive Tests */}
              <div>
                <h3 className="subsection-heading mb-1">Comprehensive Tests</h3>
                <p className="text-xs font-sans text-muted-foreground mb-3">
                  Multi-chapter tests covering broader topics — ₹49 each.
                </p>
                <ul className="divide-y divide-border">
                  {compTests.map((test, idx) => (
                    <li
                      key={test.label}
                      className="flex items-start justify-between py-3 px-1 gap-3"
                      data-ocid={`test.item.${chapters.length + idx + 1}`}
                    >
                      <div>
                        <p className="text-sm font-sans font-medium text-foreground">
                          {test.label}
                        </p>
                        <p className="text-xs text-muted-foreground font-sans mt-0.5 leading-relaxed">
                          {test.chapters.join(" · ")}
                        </p>
                      </div>
                      <PayButton
                        item={{
                          label: test.label,
                          price: 49,
                          description: `${selectedClass} ${selectedBoard} — ${test.chapters.join(", ")}`,
                        }}
                        ocid={`test.comp.button.${idx + 1}`}
                        onPay={openPay}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Answer Sheet Upload */}
              <div>
                <h3 className="subsection-heading mb-1">
                  Submit Your Answer Sheet
                </h3>
                <p className="text-sm font-sans text-muted-foreground mb-4">
                  Upload a photo of your completed answer sheet for personal
                  checking by faculty. Accepted formats: JPG, PNG, HEIC.
                </p>

                <label
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-orange/50 transition-colors cursor-pointer flex flex-col items-center"
                  aria-label="Upload answer sheet"
                  data-ocid="test.dropzone"
                >
                  <Upload size={22} className="text-muted-foreground mb-2" />
                  {uploadedFile ? (
                    <p className="text-sm font-sans text-orange font-medium">
                      {uploadedFile.name}
                    </p>
                  ) : (
                    <p className="text-sm font-sans text-muted-foreground">
                      Click to browse or drop your image here
                    </p>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                    aria-label="Upload answer sheet image"
                    data-ocid="test.upload_button"
                  />
                </label>

                {uploadSuccess && (
                  <output
                    className="mt-3 flex items-center gap-2 text-sm font-sans text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2.5"
                    aria-live="polite"
                    data-ocid="test.success_state"
                  >
                    <span>✓</span>
                    <span>
                      Answer sheet submitted successfully. Your teacher will
                      review it.
                    </span>
                  </output>
                )}

                <Button
                  className="mt-4 w-full sm:w-auto px-8 h-11 font-sans font-semibold bg-orange text-white hover:bg-[oklch(0.64_0.18_50)] disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
                  disabled={!uploadedFile}
                  onClick={handleSubmitAnswerSheet}
                  data-ocid="test.submit_button"
                >
                  Submit Answer Sheet
                </Button>
              </div>
            </div>
          </SectionCard>

          {/* ──────────────────────────────────────────────────── */}
          {/* SECTION 4: TAKE EXAM                                */}
          {/* ──────────────────────────────────────────────────── */}
          <SectionCard id="take-exam" ocid="exam.section">
            <SectionHeading number="04" title="Take Exam" />
            <p className="text-sm font-sans text-muted-foreground mb-6 -mt-2">
              Formal examination papers following school exam patterns for{" "}
              {selectedClass}.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Half-Yearly Exam */}
              <div className="border border-border rounded-lg p-5 bg-muted/20 hover:bg-muted/30 transition-colors">
                <div className="flex items-start gap-3 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-orange/30 bg-orange/8 text-orange shrink-0 mt-0.5">
                    <FileDown size={15} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-navy font-sans">
                      Half-Yearly Exam
                    </h3>
                    <p className="text-xs font-sans text-muted-foreground mt-0.5 leading-relaxed">
                      Covers first half of the syllabus. Follows school exam
                      pattern.
                    </p>
                  </div>
                </div>
                <PayButton
                  item={{
                    label: `Half-Yearly Exam Paper — ${selectedClass} ${selectedBoard}`,
                    price: 99,
                    description: `${selectedClass} ${selectedBoard} — Half-yearly exam paper`,
                  }}
                  ocid="exam.halfyearly.button"
                  onPay={openPay}
                />
              </div>

              {/* Annual Exam */}
              <div className="border border-border rounded-lg p-5 bg-muted/20 hover:bg-muted/30 transition-colors">
                <div className="flex items-start gap-3 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-orange/30 bg-orange/8 text-orange shrink-0 mt-0.5">
                    <FileText size={15} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-navy font-sans">
                      Annual Exam
                    </h3>
                    <p className="text-xs font-sans text-muted-foreground mt-0.5 leading-relaxed">
                      Full syllabus examination. Follows school exam pattern.
                    </p>
                  </div>
                </div>
                <PayButton
                  item={{
                    label: `Annual Exam Paper — ${selectedClass} ${selectedBoard}`,
                    price: 99,
                    description: `${selectedClass} ${selectedBoard} — Annual exam paper`,
                  }}
                  ocid="exam.annual.button"
                  onPay={openPay}
                />
              </div>
            </div>
          </SectionCard>

          {/* ──────────────────────────────────────────────────── */}
          {/* LEARNING FLOW                                        */}
          {/* ──────────────────────────────────────────────────── */}
          <LearningFlow />
        </div>
      </main>

      <footer className="border-t border-border py-5 px-4 text-center mt-8">
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

// ─── Learning Flow Component ──────────────────────────────────────────────────
const FLOW_STEPS = [
  { icon: BookOpen, label: "Study", color: "text-navy" },
  { icon: School, label: "Attend Class", color: "text-orange" },
  { icon: ClipboardCheck, label: "Take Test", color: "text-orange" },
  { icon: FileText, label: "Take Exam", color: "text-orange" },
  { icon: TrendingUp, label: "Improve", color: "text-navy" },
];

function LearningFlow() {
  return (
    <section
      data-ocid="flow.section"
      className="bg-card border border-border rounded-lg p-6 md:p-8"
      style={{ boxShadow: "0 1px 3px 0 rgba(26, 46, 90, 0.06)" }}
    >
      <h2
        className="text-xl md:text-2xl font-bold text-navy mb-6 text-center"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        Your Learning Journey
      </h2>

      <div className="overflow-x-auto pb-2">
        <div className="flex items-center justify-center gap-1 min-w-max mx-auto px-2">
          {FLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === FLOW_STEPS.length - 1;
            return (
              <div key={step.label} className="flex items-center gap-1">
                <div
                  className={`flex flex-col items-center gap-2 px-4 py-3.5 rounded-lg border-2 min-w-[88px] ${
                    idx === 0 || isLast
                      ? "border-navy/20 bg-navy/5"
                      : "border-orange/25 bg-orange/6"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-9 h-9 rounded-full ${
                      idx === 0 || isLast
                        ? "bg-navy/10 text-navy"
                        : "bg-orange/12 text-orange"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span className="text-xs font-sans font-semibold text-foreground text-center leading-tight whitespace-nowrap">
                    {step.label}
                  </span>
                </div>
                {!isLast && (
                  <span className="text-muted-foreground/50 font-sans text-lg font-light px-0.5">
                    →
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-center text-xs font-sans text-muted-foreground mt-4">
        Follow this cycle consistently to master physics concepts and score well
        in exams.
      </p>
    </section>
  );
}
