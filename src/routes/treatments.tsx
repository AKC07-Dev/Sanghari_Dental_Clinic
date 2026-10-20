import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CircleHelp, Stethoscope } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/clinic/page-heading";
import { SiteShell } from "@/components/clinic/site-shell";

export const Route = createFileRoute("/treatments")({
  head: () => ({ meta: [
    { title: "Treatment Information | Sanghari Dental Clinic" },
    { name: "description", content: "Explore root canal care and consultation information from Sanghari Dental Clinic in Shirpur." },
    { property: "og:title", content: "Treatment Information | Sanghari Dental Clinic" },
    { property: "og:description", content: "Patient-friendly information about dental consultations and root canal care." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: TreatmentsPage,
});

const suggestions = [
  { title: "Tooth pain assessment", description: "A dental examination can help explore possible causes of tooth pain and appropriate next steps.", icon: CircleHelp },
  { title: "General dental consultation", description: "A chance to discuss a concern, ask questions, and understand what a dentist recommends.", icon: Stethoscope },
];

function TreatmentsPage() {
  return <SiteShell><section className="clinic-container py-14 sm:py-20"><PageHeading eyebrow="Treatment information" title="Start with the right conversation.">A consultation helps a dental professional understand your concern and discuss options. Only root canal care is identified as a specialty here; other categories below are suggestions for the clinic to confirm.</PageHeading><div className="mt-12 grid gap-4 md:grid-cols-3"><Link to="/root-canal" className="group flex min-h-72 flex-col border border-clinic-blue/30 bg-secondary/50 p-7"><span className="grid size-12 place-items-center bg-primary text-primary-foreground"><Stethoscope aria-hidden="true" /></span><p className="mt-6 text-xs font-bold uppercase tracking-[0.1em] text-clinic-blue">Clinic specialty</p><h2 className="mt-2 font-display text-2xl font-semibold text-clinic-navy">Root canal consultation</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Learn what a root canal involves and why a dentist may discuss it.</p><span className="mt-auto pt-6 text-sm font-bold text-clinic-blue">Learn about root canals <ArrowRight size={16} className="ml-2 inline transition-transform group-hover:translate-x-1" /></span></Link>{suggestions.map(({ title, description, icon: Icon }) => <div key={title} className="flex min-h-72 flex-col border border-border bg-card p-7"><span className="grid size-12 place-items-center bg-muted text-clinic-teal"><Icon aria-hidden="true" /></span><p className="mt-6 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">Suggested enquiry · confirm with clinic</p><h2 className="mt-2 font-display text-xl font-semibold text-clinic-navy">{title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p><Button asChild variant="link" className="mt-auto justify-start px-0 pt-5"><Link to="/book">Ask about this <ArrowRight aria-hidden="true" /></Link></Button></div>)}</div><div className="mt-12 border-l-2 border-clinic-teal pl-5"><p className="max-w-3xl text-sm leading-6 text-muted-foreground">Available treatments should be confirmed by the clinic before publication. No prices or outcome guarantees are provided here. An examination is needed to determine which care may be suitable.</p></div></section></SiteShell>;
}