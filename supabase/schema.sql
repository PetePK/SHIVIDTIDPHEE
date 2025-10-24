-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  student_id TEXT,
  department TEXT,
  qr_code TEXT NOT NULL UNIQUE,
  attended BOOLEAN DEFAULT FALSE,
  attended_at TIMESTAMP WITH TIME ZONE
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS registrations_email_idx ON registrations(email);

-- Create index on qr_code for scanner lookups
CREATE INDEX IF NOT EXISTS registrations_qr_code_idx ON registrations(qr_code);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for registration)
CREATE POLICY "Allow public insert" ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow public select (for QR verification)
CREATE POLICY "Allow public select" ON registrations
  FOR SELECT
  TO anon
  USING (true);

-- Create policy to allow public updates (for attendance marking)
CREATE POLICY "Allow public update" ON registrations
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);
