# Sanghari Dental Clinic Website

## Build
- Replace the starter page with a polished, mobile-first clinic website and distinct Home, About, Treatments, Root Canal, FAQs, Contact, Appointment, and Privacy pages.
- Establish a clinic-specific blue, teal, and warm-white design system; use generated, calm dental-care photography and do not redraw the described logo that was not included in the upload.
- Add a configurable clinic information file with clearly marked missing details; do not publish invented phone, address, hours, dentist biography, claims, or WhatsApp link.
- Implement a validated appointment request with date/time preferences, consent, review, secure Cloud persistence, a truthful success state, and WhatsApp follow-up only when a real number is configured.
- Keep patient records inaccessible to anonymous visitors; defer the admin area rather than shipping an insecure patient-data view.
- Add route-specific page metadata, a concise setup guide, and focused validation tests.

## Technical details
- Preserve TanStack Start and the existing Tailwind v4 design-system approach.
- Store appointment requests in Lovable Cloud with RLS and the narrowest anonymous write path; validate at the server boundary and persist only required fields.
- Use the existing generated Supabase client and available server-function patterns; never expose privileged credentials.
- Verify the public booking journey, database storage, and responsive layout; report any clinic details or owner email that remain necessary for production.
