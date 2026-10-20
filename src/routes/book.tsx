import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock3, ShieldCheck } from "lucide-react";

import { AppointmentForm } from "@/components/clinic/appointment-form";
import { PageHeading } from "@/components/clinic/page-heading";
import { SiteShell } from "@/components/clinic/site-shell";

export const Route = createFileRoute("/book")({
  head: () => ({ meta: [
    { title: "Request an Appointment | Sanghari Dental Clinic" },
    { name: "description", content: "Send an appointment request to Sanghari Dental Clinic in Shirpur. The clinic will contact you to confirm a suitable time." },
    { property: "og:title", content: "Request an Appointment | Sanghari Dental Clinic" },
    { property: "og:description", content: "Choose a preferred date and time and request a dental consultation in Shirpur." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: BookPage,
});

function BookPage() {
  return <SiteShell><section className="clinic-container py-12 sm:py-16"><PageHeading eyebrow="Book an appointment" title="Tell us what brings you in.">A few details help the clinic follow up. Your chosen date and time are preferences, not a confirmed appointment.</PageHeading><div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_19rem]"><AppointmentForm /><aside className="space-y-5 lg:sticky lg:top-28"><div className="border border-clinic-blue/15 bg-secondary/50 p-5"><span className="grid size-10 place-items-center bg-background text-clinic-blue"><CalendarDays size={18} aria-hidden="true" /></span><h2 className="mt-4 font-semibold text-clinic-navy">Your preferred time</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">The clinic will contact you to confirm. Sending this form does not reserve or confirm a slot.</p></div><div className="border border-border bg-card p-5"><span className="grid size-10 place-items-center bg-muted text-clinic-teal"><ShieldCheck size={18} aria-hidden="true" /></span><h2 className="mt-4 font-semibold text-clinic-navy">Your information</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">We ask only for details needed to follow up on this appointment request. Read the <a href="/privacy" className="font-semibold text-clinic-blue underline underline-offset-2">Privacy Policy</a>.</p></div><div className="flex items-start gap-3 px-1"><Clock3 className="mt-0.5 size-4 shrink-0 text-clinic-blue" aria-hidden="true" /><p className="text-xs leading-5 text-muted-foreground">This is a request for a callback, not an emergency service. For urgent concerns, seek appropriate in-person care.</p></div></aside></div></section></SiteShell>;
}