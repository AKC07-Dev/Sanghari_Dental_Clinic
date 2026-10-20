CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code text NOT NULL UNIQUE,
  patient_name text NOT NULL CHECK (char_length(patient_name) BETWEEN 2 AND 120),
  patient_phone text NOT NULL CHECK (patient_phone ~ '^\\+91[6-9][0-9]{9}$'),
  visit_reason text NOT NULL CHECK (visit_reason IN ('Root canal consultation', 'Tooth pain', 'General dental consultation', 'Other')),
  preferred_date date NOT NULL,
  preferred_time text NOT NULL CHECK (preferred_time IN ('Morning (9 am–12 pm)', 'Afternoon (12 pm–3 pm)', 'Evening (3 pm–6 pm)')),
  patient_note text CHECK (patient_note IS NULL OR char_length(patient_note) <= 500),
  consent_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.appointments TO anon;
GRANT ALL ON public.appointments TO service_role;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit appointment requests" ON public.appointments FOR INSERT TO anon WITH CHECK (status = 'pending');
CREATE INDEX appointments_created_at_idx ON public.appointments (created_at DESC);
CREATE INDEX appointments_preferred_date_idx ON public.appointments (preferred_date);