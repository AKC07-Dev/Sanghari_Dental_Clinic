import { z } from "zod";

import { clinicConfig } from "@/lib/clinic-config";

export function getMinimumAppointmentDate(now = new Date(), advanceDays = clinicConfig.minimumAdvanceNoticeDays) {
  const minimumDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  minimumDate.setDate(minimumDate.getDate() + advanceDays);
  const year = minimumDate.getFullYear();
  const month = String(minimumDate.getMonth() + 1).padStart(2, "0");
  const day = String(minimumDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const appointmentRequestSchema = z.object({
  patientName: z.string().trim().min(2, "Please enter your full name.").max(120, "Name is too long."),
  patientPhone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number."),
  visitReason: z.enum(clinicConfig.visitReasons),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date.")
    .refine((date) => date >= getMinimumAppointmentDate(), "Choose a date at least one day from today."),
  preferredTime: z.enum(clinicConfig.preferredTimes),
  patientNote: z.string().trim().max(500, "Keep your note under 500 characters.").optional(),
  consent: z.literal(true, { error: "Please agree to be contacted about your appointment request." }),
});

export type AppointmentRequestInput = z.infer<typeof appointmentRequestSchema>;