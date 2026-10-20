import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { clinicConfig, getConfiguredWhatsAppNumber } from "@/lib/clinic-config";
import { submitAppointmentRequest } from "@/lib/appointment.functions";
import { appointmentRequestSchema, getMinimumAppointmentDate, type AppointmentRequestInput } from "@/lib/appointment-validation";

type FormValues = Omit<AppointmentRequestInput, "consent">;
type FormErrors = Partial<Record<keyof AppointmentRequestInput, string>>;

const emptyValues: FormValues = {
  patientName: "",
  patientPhone: "",
  visitReason: "Root canal consultation",
  preferredDate: "",
  preferredTime: "Morning",
  patientNote: "",
};

function readableDate(value: string): string {
  if (!value) return "—";
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function AppointmentForm() {
  const submitRequest = useServerFn(submitAppointmentRequest);
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState<"details" | "review" | "success">("details");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [referenceCode, setReferenceCode] = useState("");

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate(): boolean {
    const result = appointmentRequestSchema.safeParse({ ...values, consent });
    if (result.success) {
      setErrors({});
      return true;
    }
    const nextErrors: FormErrors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof AppointmentRequestInput | undefined;
      if (key && !nextErrors[key]) nextErrors[key] = issue.message;
    }
    setErrors(nextErrors);
    return false;
  }

  function continueToReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validate()) setStep("review");
  }

  async function sendRequest() {
    if (!validate() || submitting) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const result = await submitRequest({ data: { ...values, consent: true } });
      setReferenceCode(result.referenceCode);
      setStep("success");
    } catch {
      setSubmitError("Your request could not be saved. Your details are still here—please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const whatsappNumber = getConfiguredWhatsAppNumber();
  const whatsappMessage = referenceCode
    ? `New appointment request\nReference: ${referenceCode}\nPatient: ${values.patientName}\nReason: ${values.visitReason}\nPreferred date: ${readableDate(values.preferredDate)}\nPreferred time: ${values.preferredTime}\n\nPlease review and confirm this appointment request with the patient.`
    : "";
  const whatsappUrl = whatsappNumber && whatsappMessage ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}` : null;

  if (step === "success") {
    return <section aria-live="polite" className="border border-border bg-card p-6 sm:p-9">
      <span className="grid size-12 place-items-center bg-secondary text-clinic-blue"><Check aria-hidden="true" /></span>
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.13em] text-clinic-blue">Request received</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-clinic-navy">Your appointment request has been received.</h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">The clinic will contact you to review and confirm the appointment. Your preferred date and time are not confirmed yet.</p>
      <dl className="mt-7 grid gap-x-8 gap-y-5 border-y border-border py-6 sm:grid-cols-2">
        <div><dt className="text-xs font-semibold uppercase text-muted-foreground">Reference</dt><dd className="mt-1 font-semibold text-clinic-navy">{referenceCode}</dd></div>
        <div><dt className="text-xs font-semibold uppercase text-muted-foreground">Patient</dt><dd className="mt-1 font-semibold text-clinic-navy">{values.patientName}</dd></div>
        <div><dt className="text-xs font-semibold uppercase text-muted-foreground">Preferred date & time</dt><dd className="mt-1 font-semibold text-clinic-navy">{readableDate(values.preferredDate)} · {values.preferredTime}</dd></div>
        <div><dt className="text-xs font-semibold uppercase text-muted-foreground">Reason for visit</dt><dd className="mt-1 font-semibold text-clinic-navy">{values.visitReason}</dd></div>
      </dl>
      <div className="mt-6 flex flex-wrap gap-3">
        {whatsappUrl && <Button asChild><a href={whatsappUrl} target="_blank" rel="noreferrer">Continue on WhatsApp <ArrowRight aria-hidden="true" /></a></Button>}
        <Button asChild variant="outline"><Link to="/">Return home</Link></Button>
      </div>
      {whatsappUrl && <p className="mt-3 text-xs leading-5 text-muted-foreground">WhatsApp opens a prefilled message. Review and send it there; it is not sent automatically.</p>}
      {!whatsappUrl && <p className="mt-4 text-xs leading-5 text-muted-foreground">WhatsApp contact is not available until the clinic confirms its number.</p>}
    </section>;
  }

  return <section className="border border-border bg-card p-5 sm:p-8">
    <div className="flex items-start justify-between gap-5 border-b border-border pb-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.13em] text-clinic-blue">{step === "details" ? "Appointment request" : "Please review"}</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-clinic-navy">{step === "details" ? "Tell us a little about your visit" : "Check your details"}</h2>
      </div>
      <span className="shrink-0 text-xs font-semibold text-muted-foreground">{step === "details" ? "01 / 02" : "02 / 02"}</span>
    </div>

    {step === "details" ? <form className="mt-6 space-y-5" onSubmit={continueToReview} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="patientName">Patient full name <span className="text-clinic-red">*</span></Label>
          <Input id="patientName" autoComplete="name" value={values.patientName} maxLength={120} onChange={(event) => update("patientName", event.target.value)} aria-invalid={Boolean(errors.patientName)} aria-describedby={errors.patientName ? "patientName-error" : undefined} />
          {errors.patientName && <p id="patientName-error" className="text-sm text-destructive">{errors.patientName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="patientPhone">Mobile number <span className="text-clinic-red">*</span></Label>
          <div className="flex h-11 items-center border border-input bg-background focus-within:ring-1 focus-within:ring-ring">
            <span className="px-3 text-sm font-semibold text-muted-foreground">+91</span>
            <Input id="patientPhone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} placeholder="10-digit mobile number" value={values.patientPhone} onChange={(event) => update("patientPhone", event.target.value.replace(/\D/g, "").slice(0, 10))} aria-invalid={Boolean(errors.patientPhone)} aria-describedby={errors.patientPhone ? "patientPhone-error" : undefined} className="h-full border-0 shadow-none focus-visible:ring-0" />
          </div>
          {errors.patientPhone && <p id="patientPhone-error" className="text-sm text-destructive">{errors.patientPhone}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="visitReason">Reason for visit <span className="text-clinic-red">*</span></Label>
          <Select value={values.visitReason} onValueChange={(value) => update("visitReason", value as FormValues["visitReason"])}>
            <SelectTrigger id="visitReason" className="h-11" aria-invalid={Boolean(errors.visitReason)}><SelectValue placeholder="Choose a reason" /></SelectTrigger>
            <SelectContent>{clinicConfig.visitReasons.map((reason) => <SelectItem key={reason} value={reason}>{reason}</SelectItem>)}</SelectContent>
          </Select>
          {errors.visitReason && <p className="text-sm text-destructive">{errors.visitReason}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredDate">Preferred date <span className="text-clinic-red">*</span></Label>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" aria-hidden="true" />
            <Input id="preferredDate" type="date" min={getMinimumAppointmentDate()} value={values.preferredDate} onChange={(event) => update("preferredDate", event.target.value)} aria-invalid={Boolean(errors.preferredDate)} aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined} className="h-11 pl-10" />
          </div>
          {errors.preferredDate && <p id="preferredDate-error" className="text-sm text-destructive">{errors.preferredDate}</p>}
          <p className="text-xs text-muted-foreground">Choose a date at least {clinicConfig.minimumAdvanceNoticeDays} day{clinicConfig.minimumAdvanceNoticeDays === 1 ? "" : "s"} ahead.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredTime">Preferred time of day <span className="text-clinic-red">*</span></Label>
          <Select value={values.preferredTime} onValueChange={(value) => update("preferredTime", value as FormValues["preferredTime"])}>
            <SelectTrigger id="preferredTime" className="h-11" aria-invalid={Boolean(errors.preferredTime)}><SelectValue placeholder="Choose a preferred time" /></SelectTrigger>
            <SelectContent>{clinicConfig.preferredTimes.map((time) => <SelectItem key={time} value={time}>{time}</SelectItem>)}</SelectContent>
          </Select>
          {errors.preferredTime && <p className="text-sm text-destructive">{errors.preferredTime}</p>}
          <p className="text-xs text-muted-foreground">The clinic will confirm the time.</p>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="patientNote">Additional note <span className="font-normal text-muted-foreground">(optional)</span></Label>
          <Textarea id="patientNote" value={values.patientNote} maxLength={500} rows={3} placeholder="Share anything the clinic should know before contacting you." onChange={(event) => update("patientNote", event.target.value)} aria-invalid={Boolean(errors.patientNote)} aria-describedby="patientNote-count" />
          <p id="patientNote-count" className="text-right text-xs text-muted-foreground">{values.patientNote?.length ?? 0} / 500</p>
          {errors.patientNote && <p className="text-sm text-destructive">{errors.patientNote}</p>}
        </div>
      </div>
      <div className="flex items-start gap-3 border-t border-border pt-5">
        <Checkbox id="appointmentConsent" checked={consent} onCheckedChange={(checked) => { setConsent(checked === true); setErrors((current) => ({ ...current, consent: undefined })); }} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} />
        <div>
          <Label htmlFor="appointmentConsent" className="cursor-pointer text-sm font-normal leading-5">I agree to be contacted about this appointment request and acknowledge the <Link to="/privacy" className="font-semibold text-clinic-blue underline underline-offset-2">Privacy Policy</Link>. <span className="text-clinic-red">*</span></Label>
          {errors.consent && <p id="consent-error" className="mt-1 text-sm text-destructive">{errors.consent}</p>}
        </div>
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto">Review request <ArrowRight aria-hidden="true" /></Button>
    </form> : <div className="mt-6">
      <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <div><dt className="text-xs font-semibold uppercase text-muted-foreground">Patient</dt><dd className="mt-1 font-semibold text-clinic-navy">{values.patientName}</dd></div>
        <div><dt className="text-xs font-semibold uppercase text-muted-foreground">Mobile number</dt><dd className="mt-1 font-semibold text-clinic-navy">+91 {values.patientPhone}</dd></div>
        <div><dt className="text-xs font-semibold uppercase text-muted-foreground">Reason for visit</dt><dd className="mt-1 font-semibold text-clinic-navy">{values.visitReason}</dd></div>
        <div><dt className="text-xs font-semibold uppercase text-muted-foreground">Preferred date & time</dt><dd className="mt-1 font-semibold text-clinic-navy">{readableDate(values.preferredDate)} · {values.preferredTime}</dd></div>
        {values.patientNote && <div className="sm:col-span-2"><dt className="text-xs font-semibold uppercase text-muted-foreground">Note</dt><dd className="mt-1 whitespace-pre-wrap text-sm text-clinic-navy">{values.patientNote}</dd></div>}
      </dl>
      <div className="mt-6 flex items-start gap-3 border-t border-border pt-5 text-sm leading-6 text-muted-foreground"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-clinic-teal" aria-hidden="true" /><p>Your preferred date and time are a request only. The clinic will contact you to confirm.</p></div>
      {submitError && <p role="alert" className="mt-4 border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{submitError}</p>}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="outline" onClick={() => { setSubmitError(""); setStep("details"); }} disabled={submitting}><ArrowLeft aria-hidden="true" /> Edit details</Button>
        <Button onClick={sendRequest} disabled={submitting}>{submitting ? <><Clock3 className="animate-pulse" aria-hidden="true" /> Sending…</> : <>Send appointment request <ArrowRight aria-hidden="true" /></>}</Button>
      </div>
    </div>}
  </section>;
}