# Physics Shan Se

## Current State

Two-page React app: HomePage (class/board selector) and LearnPage (4 sections: Attend Class, Study Online, Take Test, Take Exam). Orange + navy colour scheme. Batch timings in Attend Class were placeholder. Previous deployment failed due to a code error from the UPI payment modal feature. ICSE chapter lists were generic placeholders.

## Requested Changes (Diff)

### Add
- Four uploaded images embedded in the site:
  - **Poster 1** (teacher photo, weekend batch schedule) — displayed prominently on HomePage hero and/or Attend Class section
  - **Fee Structure** — displayed as a dedicated section or card on HomePage or a new Fees page/section
  - **Why Physics Shan Se** — displayed on HomePage below the class selector
  - **Physical Test Paper Check By Faculty** — displayed in the Take Test section
- Correct ICSE chapter lists for Class 9 and Class 10 strictly from Concise Physics (S. Chand / Selina)
- Correct batch timings from Poster: Weekend batches only
  - Saturday 8–10 AM: CBSE 10; Saturday 10 AM–12 PM: CBSE 9
  - Sunday 8–10 AM: ICSE 10; Sunday 10 AM–12 PM: ICSE 9
- Fee structure from uploaded image:
  - Admission Fee: ₹1000 (one time)
  - Class 9 (CBSE/ICSE): ₹1200/month
  - Class 10 (CBSE/ICSE): ₹1500/month
  - Batches starting April 4th, 2026
- UPI payment modal for Pay & Download buttons (fix build errors from previous attempt)
- Teacher info: Shantanu Chatterjee, BE (NIT Jsr), MBA (IMT, Gzb)
- Tagline: "Beyond Coaching — Real Learning Support" / "Concepts, Numericals & Experiments"

### Modify
- Attend Class section: replace placeholder timings with correct weekend schedule from poster
- HomePage: add poster image, Why Physics Shan Se image, teacher credentials
- Take Test section: add faculty paper-checking image and explanation
- ICSE chapter lists for Class 9 and 10 (use Concise Physics chapter names)
- Fix any broken build issues from previous deployment

### Remove
- Placeholder batch timings (Mon/Wed/Fri etc.)

## Implementation Plan

1. Update `chapters.ts` with correct Concise Physics ICSE chapter lists for Class 9 and 10
2. Update `HomePage.tsx`: add poster image in hero, Why Physics Shan Se section with image, fee structure card, teacher credentials
3. Update `LearnPage.tsx`:
   - Attend Class: correct weekend batch timings, use poster image
   - Take Test: add faculty paper-checking image and "Get Checked by Faculty" feature description
   - Fix UPI payment modal — ensure no TypeScript/build errors
4. Validate and deploy
