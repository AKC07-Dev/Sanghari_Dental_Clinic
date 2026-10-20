import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import { appointmentRequestSchema } from "@/lib/appointment-validation";

export const submitAppointmentRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => appointmentRequestSchema.parse(input))
  .handler(async ({ data }) => {
    const request = getRequest();
    const clientAddress = request.headers.get("cf-connecting-ip") ?? "unknown";
    const fingerprintBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(clientAddress));
    const fingerprint = Array.from(new Uint8Array(fingerprintBuffer), (value) => value.toString(16).padStart(2, "0")).join("");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: allowed, error: limitError } = await supabaseAdmin.rpc("consume_appointment_submission_limit", {
      _ip_fingerprint: fingerprint,
    });
    if (limitError || !allowed) {
      throw new Error("We couldn't accept this request right now. Please try again later or contact the clinic.");
    }

    const referenceCode = `SDC-${new Date().getFullYear()}-${crypto.randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
    const { data: saved, error } = await supabaseAdmin
      .from("appointments")
      .insert({
        reference_code: referenceCode,
        patient_name: data.patientName,
        patient_phone: `+91${data.patientPhone}`,
        visit_reason: data.visitReason,
        preferred_date: data.preferredDate,
        preferred_time: data.preferredTime,
        patient_note: data.patientNote || null,
        consent_at: new Date().toISOString(),
      })
      .select("reference_code")
      .single();

    if (error || !saved) {
      throw new Error("Your request could not be saved. Your details are still here—please try again.");
    }

    return { referenceCode: saved.reference_code };
  });