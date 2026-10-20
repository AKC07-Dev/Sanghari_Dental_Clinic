import { describe, expect, it } from "vitest";

import { appointmentRequestSchema, getMinimumAppointmentDate } from "@/lib/appointment-validation";

const validRequest = {
  patientName: "Asha Patil",
  patientPhone: "9876543210",
  visitReason: "Root canal consultation" as const,
  preferredDate: "2026-10-21",
  preferredTime: "Morning" as const,
  patientNote: "",
  consent: true as const,
};

describe("appointment request rules", () => {
  it("accepts a valid Indian mobile number", () => {
    expect(appointmentRequestSchema.safeParse(validRequest).success).toBe(true);
  });

  it("rejects mobile numbers outside the Indian 10-digit format", () => {
    expect(appointmentRequestSchema.safeParse({ ...validRequest, patientPhone: "1234567890" }).success).toBe(false);
  });

  it("requires the patient's unchecked consent to be explicitly accepted", () => {
    expect(appointmentRequestSchema.safeParse({ ...validRequest, consent: false }).success).toBe(false);
  });

  it("requires a preferred date at least one advance day from today", () => {
    expect(getMinimumAppointmentDate(new Date(2026, 9, 20), 1)).toBe("2026-10-21");
    expect(appointmentRequestSchema.safeParse({ ...validRequest, preferredDate: "2026-10-20" }).success).toBe(false);
  });

  it("rejects notes longer than 500 characters", () => {
    expect(appointmentRequestSchema.safeParse({ ...validRequest, patientNote: "x".repeat(501) }).success).toBe(false);
  });
});