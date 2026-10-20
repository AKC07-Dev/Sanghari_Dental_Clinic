import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock3, MapPin, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/clinic/page-heading";
import { SiteShell } from "@/components/clinic/site-shell";
import { clinicConfig, getConfiguredWhatsAppNumber } from "@/lib/clinic-config";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact Sanghari Dental Clinic | Shirpur" },
    { name: "description", content: "Contact Sanghari Dental Clinic in Shirpur, Maharashtra, or request an appointment online." },
    { property: "og:title", content: "Contact Sanghari Dental Clinic | Shirpur" },
    { property: "og:description", content: "Find clinic contact information and request a dental consultation in Shirpur." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ContactPage,
});

function ContactPage() {
  const whatsappNumber = getConfiguredWhatsAppNumber();
  return <SiteShell><section className="clinic-container py-14 sm:py-20"><PageHeading eyebrow="Contact" title="We’re here to help you take the next step.">Request an appointment or use the clinic's verified contact details when they are available. Missing contact details are left unconfigured until confirmed by the clinic.</PageHeading><div className="mt-12 grid gap-12 md:grid-cols-[1fr_0.7fr]"><div className="grid gap-0 border-y border-border">{[{ icon: MapPin, label: "Location", value: clinicConfig.address ?? "Shirpur, Maharashtra, India", note: clinicConfig.address ? "" : "Street address to be confirmed by the clinic." }, { icon: Phone, label: "Phone", value: clinicConfig.phone ?? "Phone number to be confirmed", note: "" }, { icon: Clock3, label: "Opening hours", value: clinicConfig.openingHours ?? "Opening hours to be confirmed", note: "" }].map(({ icon: Icon, label, value, note }) => <div key={label} className="flex gap-4 border-b border-border py-6 last:border-b-0"><span className="grid size-10 shrink-0 place-items-center bg-secondary text-clinic-blue"><Icon size={18} aria-hidden="true" /></span><div><h2 className="font-semibold text-clinic-navy">{label}</h2><p className="mt-1 text-sm text-muted-foreground">{value}</p>{note && <p className="mt-1 text-xs text-muted-foreground">{note}</p>}</div></div>)}</div><aside className="h-fit border border-border bg-secondary/45 p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.1em] text-clinic-blue">Appointment request</p><h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-clinic-navy">Choose a preferred date and time.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">The clinic will contact you to review and confirm your request.</p><Button asChild className="mt-6 w-full"><Link to="/book">Request an appointment <ArrowRight aria-hidden="true" /></Link></Button>{whatsappNumber && <Button asChild variant="outline" className="mt-3 w-full"><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><Send aria-hidden="true" />WhatsApp the clinic</a></Button>}</aside></div><p className="mt-10 border-l-2 border-clinic-red pl-4 text-sm leading-6 text-muted-foreground">This website does not include a map until the clinic confirms its exact address.</p></section></SiteShell>;
}