import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CircleAlert, ClipboardCheck, SearchCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/clinic/page-heading";
import { SiteShell } from "@/components/clinic/site-shell";

export const Route = createFileRoute("/root-canal")({
  head: () => ({ meta: [
    { title: "Root Canal Care | Sanghari Dental Clinic, Shirpur" },
    { name: "description", content: "Understand what root canal treatment involves, why a dentist may recommend it, and when to seek a dental evaluation." },
    { property: "og:title", content: "Root Canal Care | Sanghari Dental Clinic" },
    { property: "og:description", content: "Plain-language information about root canal treatment and professional assessment." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: RootCanalPage,
});

const pathway = [
  { n: "01", title: "Talk through the concern", body: "Share what you have noticed and when it began." },
  { n: "02", title: "Have the tooth assessed", body: "A dentist examines the tooth and may recommend further checks." },
  { n: "03", title: "Discuss a care plan", body: "The dentist explains appropriate options based on the findings." },
];

function RootCanalPage() {
  return <SiteShell><section className="clinic-container py-14 sm:py-20"><PageHeading eyebrow="Root canal care · Shirpur" title="Keep your options clear when a tooth hurts.">A root canal is a treatment that addresses inflamed or infected tissue inside a tooth. Whether it is suitable depends on a dentist's examination and assessment.</PageHeading><div className="mt-12 grid gap-12 border-y border-border py-10 md:grid-cols-[0.7fr_1.3fr]"><div><p className="text-xs font-bold uppercase tracking-[0.1em] text-clinic-blue">The basics</p><h2 className="mt-3 font-display text-2xl font-semibold text-clinic-navy">What is a root canal?</h2></div><div className="max-w-2xl space-y-4 text-sm leading-7 text-muted-foreground"><p>Inside each tooth is soft tissue containing nerves and blood vessels. If it becomes inflamed or infected, a dentist may discuss a root canal as one option for treating the tooth.</p><p>Tooth pain does not always mean a root canal is needed. A professional examination is the right way to understand what is causing discomfort.</p></div></div><div className="grid gap-12 py-12 md:grid-cols-2"><div><span className="grid size-11 place-items-center bg-secondary text-clinic-blue"><CircleAlert aria-hidden="true" /></span><h2 className="mt-5 font-display text-2xl font-semibold text-clinic-navy">When to seek an evaluation</h2><p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">Consider speaking with a dentist about persistent tooth pain, lingering sensitivity, swelling, or a change you have noticed around a tooth. These symptoms can have different causes and do not establish a diagnosis.</p></div><div><span className="grid size-11 place-items-center bg-secondary text-clinic-teal"><SearchCheck aria-hidden="true" /></span><h2 className="mt-5 font-display text-2xl font-semibold text-clinic-navy">What happens next?</h2><p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">The dentist asks about your concern, examines the tooth, and may explain tests or treatment choices. The plan depends on the findings and your individual situation.</p></div></div><section aria-labelledby="journey-title" className="bg-secondary/45 p-6 sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.1em] text-clinic-blue">A simple journey</p><h2 id="journey-title" className="mt-3 font-display text-2xl font-semibold text-clinic-navy">From concern to a considered plan.</h2><ol className="mt-8 grid gap-6 sm:grid-cols-3">{pathway.map((item) => <li key={item.n} className="border-t border-clinic-teal/50 pt-4"><span className="font-display text-2xl font-semibold text-clinic-blue">{item.n}</span><h3 className="mt-3 font-semibold text-clinic-navy">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p></li>)}</ol></section><div className="mt-10 flex flex-wrap items-center justify-between gap-5"><div className="flex max-w-xl items-start gap-3 text-sm leading-6 text-muted-foreground"><ClipboardCheck className="mt-0.5 size-5 shrink-0 text-clinic-teal" aria-hidden="true" /><p>This information is general and does not replace a dental examination or professional advice.</p></div><Button asChild><Link to="/book">Request a consultation <ArrowRight aria-hidden="true" /></Link></Button></div></section></SiteShell>;
}