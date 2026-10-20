import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MessageCircleMore } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/clinic/page-heading";
import { SiteShell } from "@/components/clinic/site-shell";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About the Clinic | Sanghari Dental Clinic" },
    { name: "description", content: "Learn about Sanghari Dental Clinic's patient-centred approach to dental care in Shirpur, Maharashtra." },
    { property: "og:title", content: "About the Clinic | Sanghari Dental Clinic" },
    { property: "og:description", content: "A thoughtful, clear approach to dental care in Shirpur." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AboutPage,
});

function AboutPage() {
  return <SiteShell><section className="clinic-container py-14 sm:py-20"><PageHeading eyebrow="About the clinic" title="Care grounded in listening and clear guidance.">Sanghari Dental Clinic is based in Shirpur, Maharashtra, and identifies root canal care as a specialty. The clinic's professional details can be added once confirmed by its team.</PageHeading><div className="mt-12 grid gap-12 border-t border-border pt-10 md:grid-cols-[0.75fr_1.25fr]"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-clinic-blue">Our approach</p><h2 className="mt-3 font-display text-2xl font-semibold text-clinic-navy">Understand first. Decide together.</h2></div><div className="max-w-2xl space-y-5 text-base leading-7 text-muted-foreground"><p>A dental consultation should leave room for questions. The aim is to help each patient understand their concern and the options a dental professional may discuss.</p><p>Every treatment recommendation depends on an examination. This site shares general information and is not a substitute for professional dental advice.</p></div></div><div className="mt-12 grid gap-4 border-y border-border py-8 sm:grid-cols-3">{[{ key: "Location", value: "Shirpur, Maharashtra" }, { key: "Specialty", value: "Root canal care" }, { key: "Dentist profile", value: "Details to be confirmed by the clinic" }].map((item) => <div key={item.key}><p className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">{item.key}</p><p className="mt-2 font-semibold text-clinic-navy">{item.value}</p></div>)}</div><div className="mt-10 flex flex-wrap gap-3"><Button asChild><Link to="/book">Request an appointment <ArrowRight aria-hidden="true" /></Link></Button><Button asChild variant="outline"><Link to="/contact"><MessageCircleMore aria-hidden="true" />Contact the clinic</Link></Button></div></section></SiteShell>;
}