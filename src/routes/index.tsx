import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Check, ClipboardList, HeartHandshake, Stethoscope } from "lucide-react";

import clinicRoom from "@/assets/clinic-room.jpg";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/clinic/site-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sanghari Dental Clinic | Root Canal Care in Shirpur" },
      { name: "description", content: "Clear guidance and thoughtful dental care from Sanghari Dental Clinic in Shirpur, Maharashtra. Request an appointment online." },
      { property: "og:title", content: "Sanghari Dental Clinic | Root Canal Care in Shirpur" },
      { property: "og:description", content: "Clear guidance and thoughtful dental care in Shirpur, Maharashtra." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const steps = [
  { number: "01", title: "Request an appointment", detail: "Tell us what brings you in and choose a preferred date." },
  { number: "02", title: "Receive confirmation", detail: "The clinic will contact you to confirm a suitable time." },
  { number: "03", title: "Visit for a consultation", detail: "Discuss your concern and ask questions about your options." },
];

const concerns = [
  { icon: Stethoscope, title: "Root canal consultation", detail: "Learn about root canal care and whether a dental evaluation may be appropriate.", href: "/root-canal" },
  { icon: HeartHandshake, title: "Dental consultation", detail: "Discuss a dental concern and understand what may happen next.", href: "/book" },
  { icon: ClipboardList, title: "Other concerns", detail: "Share your reason for visiting and the clinic can guide your next step.", href: "/book" },
];

function HomePage() {
  return <SiteShell>
    <section className="clinic-container grid items-center gap-10 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:py-20">
      <div className="relative z-10">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-clinic-blue"><span className="size-2 bg-clinic-red" />Root canal specialist · Shirpur</p>
        <h1 className="mt-6 max-w-xl font-display text-[2.65rem] font-semibold leading-[1.12] text-clinic-navy sm:text-6xl">Care that helps you keep your natural smile.</h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">Clear guidance, thoughtful dental care, and a simpler way to take the next step toward a healthier smile.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg"><Link to="/book">Book an appointment <ArrowRight aria-hidden="true" /></Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/root-canal">Explore root canal care</Link></Button>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">Questions about treatment? <Link to="/contact" className="font-semibold text-clinic-blue underline underline-offset-4">Get in touch with the clinic.</Link></p>
        <div className="mt-10 flex items-center gap-4 border-t border-border pt-6">
          <span className="grid size-10 place-items-center bg-secondary text-clinic-blue"><Check size={18} aria-hidden="true" /></span>
          <p className="max-w-xs text-sm leading-5 text-muted-foreground">Your appointment time is confirmed by the clinic—not automatically when you send a request.</p>
        </div>
      </div>
      <div className="relative min-w-0">
        <div className="absolute -inset-3 -z-10 bg-secondary/80 sm:-inset-5" />
        <img src={clinicRoom} alt="Illustrative, sunlit dental treatment room with a dental chair" width={1600} height={1088} fetchPriority="high" className="aspect-[1.28] w-full object-cover object-center" />
        <div className="absolute bottom-4 left-4 max-w-[15rem] border border-border/70 bg-background/95 p-4 shadow-lg backdrop-blur sm:bottom-6 sm:left-6 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-clinic-blue">Patient-first approach</p>
          <p className="mt-2 font-display text-lg font-semibold leading-snug text-clinic-navy">Root canal care, explained with clarity.</p>
        </div>
        <p className="mt-3 text-right text-[0.68rem] text-muted-foreground">Illustrative clinic image</p>
      </div>
    </section>

    <section className="border-y border-border bg-card">
      <div className="clinic-container grid gap-9 py-14 md:grid-cols-[0.8fr_1.2fr] md:items-end md:py-20">
        <div><p className="text-xs font-bold uppercase tracking-[0.13em] text-clinic-blue">A calmer way forward</p><h2 className="mt-4 max-w-md font-display text-3xl font-semibold leading-tight text-clinic-navy sm:text-4xl">Personal attention. Clear explanations. Thoughtful care.</h2></div>
        <div className="max-w-2xl"><p className="text-base leading-7 text-muted-foreground">Dental concerns can bring questions. A consultation is an opportunity to talk through what you are experiencing, understand possible options, and decide on the next step with a dental professional.</p><Link to="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-clinic-blue">About the clinic <ArrowRight size={16} aria-hidden="true" /></Link></div>
      </div>
    </section>

    <section className="clinic-container py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div><p className="text-xs font-bold uppercase tracking-[0.13em] text-clinic-blue">Root canal care</p><h2 className="mt-4 max-w-md font-display text-3xl font-semibold leading-tight text-clinic-navy sm:text-4xl">When a tooth needs a closer look.</h2><p className="mt-5 max-w-lg leading-7 text-muted-foreground">A root canal is a dental treatment that addresses tissue inside a tooth. A dentist may discuss it when that tissue is inflamed or infected. Only an examination can help determine what is suitable for your tooth.</p><Button asChild variant="outline" className="mt-6"><Link to="/root-canal">Understand the treatment <ArrowRight aria-hidden="true" /></Link></Button></div>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
          {[{ n: "01", title: "Notice", text: "Pain, sensitivity, or swelling can have different causes." }, { n: "02", title: "Consult", text: "A dentist examines the tooth and discusses options." }, { n: "03", title: "Plan", text: "A treatment plan depends on professional assessment." }].map((item) => <div key={item.n} className="bg-background p-6 sm:p-7"><span className="font-display text-3xl font-semibold text-clinic-teal">{item.n}</span><h3 className="mt-5 font-semibold text-clinic-navy">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p></div>)}
        </div>
      </div>
    </section>

    <section className="bg-secondary/45 py-16 sm:py-20">
      <div className="clinic-container">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.13em] text-clinic-blue">How we can help</p><h2 className="mt-3 font-display text-3xl font-semibold text-clinic-navy">Start with a conversation.</h2></div><Link to="/treatments" className="inline-flex items-center gap-2 text-sm font-semibold text-clinic-blue">See treatment information <ArrowRight size={16} /></Link></div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {concerns.map(({ icon: Icon, title, detail, href }, index) => <Link key={title} to={href} className="group border border-border bg-card p-6 transition-colors hover:border-clinic-blue/40"><span className="grid size-11 place-items-center bg-secondary text-clinic-blue"><Icon size={20} aria-hidden="true" /></span><h3 className="mt-6 font-display text-xl font-semibold text-clinic-navy">{title}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">{detail}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-clinic-blue">Learn more <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>{index > 0 && <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">Suggested enquiry category—confirm services with the clinic.</p>}</Link>)}
        </div>
      </div>
    </section>

    <section className="clinic-container grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.75fr_1.25fr]">
      <div><p className="text-xs font-bold uppercase tracking-[0.13em] text-clinic-blue">Your next step</p><h2 className="mt-4 max-w-sm font-display text-3xl font-semibold leading-tight text-clinic-navy sm:text-4xl">A simple patient journey.</h2><p className="mt-4 max-w-sm leading-7 text-muted-foreground">A request is the beginning of a conversation—not a confirmed appointment.</p></div>
      <ol className="grid gap-0 sm:grid-cols-3">{steps.map((step, index) => <li key={step.number} className="relative border-l border-clinic-teal/40 py-2 pl-5 sm:border-l-0 sm:border-t sm:pl-0 sm:pt-6"><span className="absolute -left-[5px] top-3 size-2.5 rounded-full bg-clinic-teal sm:-top-[5px]" /><span className="font-display text-2xl font-semibold text-clinic-blue">{step.number}</span><h3 className="mt-3 font-semibold text-clinic-navy">{step.title}</h3><p className="mt-2 pr-5 text-sm leading-6 text-muted-foreground">{step.detail}</p>{index === 2 && <CalendarDays className="mt-5 size-5 text-clinic-teal" aria-hidden="true" />}</li>)}</ol>
    </section>

    <section className="border-y border-border bg-card">
      <div className="clinic-container grid gap-10 py-16 sm:py-20 md:grid-cols-[0.7fr_1.3fr]">
        <div><p className="text-xs font-bold uppercase tracking-[0.13em] text-clinic-blue">Know before you visit</p><h2 className="mt-4 max-w-sm font-display text-3xl font-semibold text-clinic-navy">A little preparation can help.</h2></div>
        <div className="grid gap-6 sm:grid-cols-3">{[{ title: "When to seek advice", body: "Speak with a dentist about persistent tooth pain, swelling, or sensitivity." }, { title: "What to bring", body: "Bring any relevant dental records or medication information you already have." }, { title: "What to ask", body: "Ask about what the examination shows, available options, and what happens next." }].map((item) => <div key={item.title} className="border-t-2 border-clinic-teal pt-4"><h3 className="font-semibold text-clinic-navy">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p></div>)}</div>
      </div>
    </section>

    <section className="clinic-container flex flex-col items-start justify-between gap-8 py-16 sm:flex-row sm:items-center sm:py-20">
      <div><p className="text-xs font-bold uppercase tracking-[0.13em] text-clinic-blue">Take the next step</p><h2 className="mt-3 font-display text-3xl font-semibold text-clinic-navy">Have a dental concern? Let’s take the next step.</h2></div>
      <div className="flex shrink-0 flex-wrap gap-3"><Button asChild size="lg"><Link to="/book">Book an appointment <ArrowRight aria-hidden="true" /></Link></Button><Button asChild size="lg" variant="outline"><Link to="/contact">Contact the clinic</Link></Button></div>
    </section>
  </SiteShell>;
}