import { createFileRoute } from "@tanstack/react-router";

import { PageHeading } from "@/components/clinic/page-heading";
import { SiteShell } from "@/components/clinic/site-shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy Policy | Sanghari Dental Clinic" },
    { name: "description", content: "How Sanghari Dental Clinic handles information submitted through its appointment request form." },
    { property: "og:title", content: "Privacy Policy | Sanghari Dental Clinic" },
    { property: "og:description", content: "Information about appointment request data and privacy." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <SiteShell><article className="clinic-container max-w-4xl py-14 sm:py-20"><PageHeading eyebrow="Privacy policy" title="Your appointment details are for follow-up.">This policy applies to information submitted through the appointment request form.</PageHeading><div className="mt-12 space-y-9 border-t border-border pt-8 text-sm leading-7 text-muted-foreground"><section><h2 className="font-display text-xl font-semibold text-clinic-navy">What the form collects</h2><p className="mt-3">The form asks for a patient's name, Indian mobile number, reason for the visit, preferred date and time, optional note, and consent to be contacted about the request.</p></section><section><h2 className="font-display text-xl font-semibold text-clinic-navy">How information is used</h2><p className="mt-3">These details are used to review the appointment request and contact the patient about confirming a visit. The preferred time is not confirmed when the form is sent.</p></section><section><h2 className="font-display text-xl font-semibold text-clinic-navy">Who can access requests</h2><p className="mt-3">Appointment records are stored securely and are not publicly listed. Access is limited to authorized clinic handling through the connected service.</p></section><section><h2 className="font-display text-xl font-semibold text-clinic-navy">Questions about your details</h2><p className="mt-3">Clinic contact information has not yet been confirmed for publication. The clinic should add a verified privacy contact before this policy is published to patients.</p></section><p className="border-l-2 border-clinic-red pl-4 text-xs">This draft policy should be reviewed and approved by the clinic owner before public launch.</p></div></article></SiteShell>;
}