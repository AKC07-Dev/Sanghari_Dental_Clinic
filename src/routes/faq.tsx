import { Link, createFileRoute } from "@tanstack/react-router";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/clinic/page-heading";
import { SiteShell } from "@/components/clinic/site-shell";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [
    { title: "Patient FAQs | Sanghari Dental Clinic" },
    { name: "description", content: "Answers to common questions about root canal care, dental appointments, and what to bring to a consultation." },
    { property: "og:title", content: "Patient FAQs | Sanghari Dental Clinic" },
    { property: "og:description", content: "Helpful information for your dental consultation in Shirpur." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: FaqPage,
});

const questions = [
  { question: "What is a root canal treatment?", answer: "It is a dental treatment for inflamed or infected tissue inside a tooth. A dentist can explain whether it is suitable after examining the tooth." },
  { question: "When should I consult a dentist about tooth pain?", answer: "Consider contacting a dentist about persistent pain, sensitivity, swelling, or a change you have noticed. Symptoms can have different causes, and only an examination can guide diagnosis and care." },
  { question: "How do I request an appointment?", answer: "Complete the appointment request form with your contact details and preferred date and time. The clinic will contact you to review and confirm the appointment." },
  { question: "What happens after I submit my request?", answer: "Your request is stored and a reference is shown. The preferred date and time are not confirmed until the clinic contacts you." },
  { question: "Can I contact the clinic on WhatsApp?", answer: "WhatsApp will be offered here once the clinic confirms its contact number. Until then, use the appointment request form or the confirmed contact details provided by the clinic." },
  { question: "What should I bring to a visit?", answer: "Bring any relevant dental records and a list of medicines you already take, if applicable. You may also note down questions you would like to discuss." },
];

function FaqPage() {
  return <SiteShell><section className="clinic-container py-14 sm:py-20"><PageHeading eyebrow="Patient FAQs" title="A few helpful answers before you visit.">If you have a concern that is not covered here, request an appointment and the clinic can guide your next step.</PageHeading><Accordion.Root type="single" collapsible className="mt-12 max-w-4xl border-t border-border">{questions.map((item, index) => <Accordion.Item key={item.question} value={`item-${index}`} className="border-b border-border"><Accordion.Header><Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-5 text-left font-semibold text-clinic-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span>{item.question}</span><ChevronDown size={18} className="shrink-0 text-clinic-blue transition-transform group-data-[state=open]:rotate-180" aria-hidden="true" /></Accordion.Trigger></Accordion.Header><Accordion.Content className="max-w-3xl overflow-hidden pb-5 text-sm leading-6 text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">{item.answer}</Accordion.Content></Accordion.Item>)}</Accordion.Root><div className="mt-10 flex flex-wrap gap-3"><Button asChild><Link to="/book">Request an appointment</Link></Button><Button asChild variant="outline"><Link to="/root-canal">Root canal information</Link></Button></div></section></SiteShell>;
}