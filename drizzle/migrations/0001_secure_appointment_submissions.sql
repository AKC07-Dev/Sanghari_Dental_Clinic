ALTER TABLE public.appointments DROP CONSTRAINT appointments_patient_phone_check;
ALTER TABLE public.appointments ADD CONSTRAINT appointments_patient_phone_india_format CHECK (patient_phone ~ E'^\\+91[6-9][0-9]{9}$');
REVOKE INSERT ON public.appointments FROM anon;
DROP POLICY "Public can submit appointment requests" ON public.appointments;
CREATE TABLE public.appointment_submission_limits (
  ip_fingerprint text PRIMARY KEY CHECK (char_length(ip_fingerprint) = 64),
  window_started_at timestamptz NOT NULL DEFAULT now(),
  request_count integer NOT NULL DEFAULT 1 CHECK (request_count BETWEEN 1 AND 5)
);
GRANT ALL ON public.appointment_submission_limits TO service_role;
ALTER TABLE public.appointment_submission_limits ENABLE ROW LEVEL SECURITY;
CREATE OR REPLACE FUNCTION public.consume_appointment_submission_limit(_ip_fingerprint text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  accepted boolean;
BEGIN
  INSERT INTO public.appointment_submission_limits (ip_fingerprint, window_started_at, request_count)
  VALUES (_ip_fingerprint, now(), 1)
  ON CONFLICT (ip_fingerprint) DO UPDATE
  SET window_started_at = CASE
        WHEN public.appointment_submission_limits.window_started_at < now() - interval '1 hour' THEN now()
        ELSE public.appointment_submission_limits.window_started_at
      END,
      request_count = CASE
        WHEN public.appointment_submission_limits.window_started_at < now() - interval '1 hour' THEN 1
        ELSE public.appointment_submission_limits.request_count + 1
      END
  WHERE public.appointment_submission_limits.window_started_at < now() - interval '1 hour'
     OR public.appointment_submission_limits.request_count < 5
  RETURNING true INTO accepted;
  RETURN coalesce(accepted, false);
END;
$$;
REVOKE ALL ON FUNCTION public.consume_appointment_submission_limit(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.consume_appointment_submission_limit(text) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_appointment_submission_limit(text) TO service_role;