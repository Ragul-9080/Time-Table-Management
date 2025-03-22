-- Drop existing tables
DROP TABLE IF EXISTS schedules;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS staff;
DROP TABLE IF EXISTS departments;

-- Create department-specific tables
CREATE TABLE IF NOT EXISTS bca (
  id SERIAL PRIMARY KEY,
  day TEXT NOT NULL,
  period INTEGER NOT NULL,
  subject TEXT,
  staff_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bsc_ai_ds (
  id SERIAL PRIMARY KEY,
  day TEXT NOT NULL,
  period INTEGER NOT NULL,
  subject TEXT,
  staff_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cs (
  id SERIAL PRIMARY KEY,
  day TEXT NOT NULL,
  period INTEGER NOT NULL,
  subject TEXT,
  staff_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS math (
  id SERIAL PRIMARY KEY,
  day TEXT NOT NULL,
  period INTEGER NOT NULL,
  subject TEXT,
  staff_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS eng (
  id SERIAL PRIMARY KEY,
  day TEXT NOT NULL,
  period INTEGER NOT NULL,
  subject TEXT,
  staff_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sci (
  id SERIAL PRIMARY KEY,
  day TEXT NOT NULL,
  period INTEGER NOT NULL,
  subject TEXT,
  staff_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS arts (
  id SERIAL PRIMARY KEY,
  day TEXT NOT NULL,
  period INTEGER NOT NULL,
  subject TEXT,
  staff_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data into BCA table
INSERT INTO bca (day, period, subject, staff_name) VALUES
('Monday', 1, 'DBMS', 'Mr. C. Santhosh Kumar'),
('Monday', 2, 'DCN', 'Mr. A. Aswin'),
('Monday', 3, 'JAVA LAB', 'Mr. S. Parusvanathan'),
('Monday', 4, 'DBMS', 'Mr. C. Santhosh Kumar'),
('Monday', 5, 'TAM', 'Mr. S. Santhosh Kumar'),
('Monday', 7, 'LIB/AA', NULL),
('Monday', 8, 'PLA/NS', NULL),
('Tuesday', 1, 'GEN. ELEC.', NULL),
('Tuesday', 2, 'TA/XEBIA', 'Xebia Trainer'),
('Tuesday', 5, 'ENG', 'Dr. Evangeline'),
('Tuesday', 6, 'ENG', 'Dr. Evangeline');

-- Enable realtime for all tables
alter publication supabase_realtime add table bca;
alter publication supabase_realtime add table bsc_ai_ds;
alter publication supabase_realtime add table cs;
alter publication supabase_realtime add table math;
alter publication supabase_realtime add table eng;
alter publication supabase_realtime add table sci;
alter publication supabase_realtime add table arts;