-- Update BCA department timetable based on the provided image

-- First, let's ensure we have all the staff members
INSERT INTO staff (id, name, department)
VALUES 
  ('sk1', 'Mr. S. Santhosh Kumar', 'bca'),
  ('ev1', 'Dr. Evangeline', 'bca'),
  ('sp1', 'Mr. S. Parusvanathan', 'bca'),
  ('csk1', 'Mr. C. Santhosh Kumar', 'bca'),
  ('aa1', 'Mr. A. Aswin', 'bca'),
  ('xt1', 'Xebia Trainer', 'bca'),
  ('kl1', 'Mrs. K. Latha', 'bca'),
  ('bb1', 'Mr. B. Balaji', 'bca'),
  ('yt1', 'Yoga Trainer', 'bca')
ON CONFLICT (id) DO NOTHING;

-- Now, let's ensure we have all the subjects
INSERT INTO subjects (id, name, department, staffId)
VALUES
  ('tam4', 'Tamil - IV', 'bca', 'sk1'),
  ('eng4', 'English - IV', 'bca', 'ev1'),
  ('java', 'Java Programming', 'bca', 'sp1'),
  ('dbms', 'Database Management System', 'bca', 'csk1'),
  ('dcn', 'Data Communications and Computer Networks', 'bca', 'aa1'),
  ('ta', 'Test Automation', 'bca', 'xt1'),
  ('pjava', 'Practical Java Programming', 'bca', 'sp1'),
  ('pdbms', 'Practical Database Management System', 'bca', 'csk1'),
  ('xl', 'Data Manipulation with Excel and SQL', 'bca', 'kl1'),
  ('til', 'Takshashila Innovative Learning', 'bca', 'sp1'),
  ('yoga', 'Yoga and Meditation - IC', 'bca', 'yt1'),
  ('gc', 'Green Credit', 'bca', 'bb1'),
  ('pla', 'Placement Training', 'bca', 'sp1'),
  ('lib', 'Library', 'bca', '')
ON CONFLICT (id) DO NOTHING;

-- Clear existing BCA schedules to avoid duplicates
DELETE FROM schedules WHERE departmentId = 'bca';

-- Insert Monday schedule for BCA
INSERT INTO schedules (id, day, period, subjectId, staffId, departmentId, status)
VALUES
  (uuid_generate_v4(), 'mon', '1', 'dbms', 'csk1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'mon', '2', 'dcn', 'aa1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'mon', '3', 'pjava', 'sp1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'mon', '4', 'dbms', 'csk1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'mon', '5', 'tam4', 'sk1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'mon', '6', 'lib', '', 'bca', 'assigned'),
  (uuid_generate_v4(), 'mon', '7', 'pla', 'sp1', 'bca', 'assigned');

-- Insert Tuesday schedule for BCA
INSERT INTO schedules (id, day, period, subjectId, staffId, departmentId, status)
VALUES
  (uuid_generate_v4(), 'tue', '1', 'gc', 'bb1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'tue', '2', 'ta', 'xt1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'tue', '3', 'eng4', 'ev1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'tue', '4', 'eng4', 'ev1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'tue', '5', 'ta', 'xt1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'tue', '6', 'xl', 'kl1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'tue', '7', 'til', 'sp1', 'bca', 'assigned');

-- Insert Wednesday schedule for BCA
INSERT INTO schedules (id, day, period, subjectId, staffId, departmentId, status)
VALUES
  (uuid_generate_v4(), 'wed', '1', 'ta', 'xt1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'wed', '2', 'java', 'sp1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'wed', '3', 'pla', 'sp1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'wed', '4', 'pdbms', 'csk1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'wed', '5', 'tam4', 'sk1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'wed', '6', 'eng4', 'ev1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'wed', '7', 'club', '', 'bca', 'assigned');

-- Insert Thursday schedule for BCA
INSERT INTO schedules (id, day, period, subjectId, staffId, departmentId, status)
VALUES
  (uuid_generate_v4(), 'thu', '1', 'java', 'sp1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'thu', '2', 'dcn', 'aa1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'thu', '3', 'dbms', 'csk1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'thu', '4', 'eng4', 'ev1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'thu', '5', 'tam4', 'sk1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'thu', '6', 'eng4', 'ev1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'thu', '7', 'pet', '', 'bca', 'assigned');

-- Insert Friday schedule for BCA
INSERT INTO schedules (id, day, period, subjectId, staffId, departmentId, status)
VALUES
  (uuid_generate_v4(), 'fri', '1', 'java', 'sp1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'fri', '2', 'pjava', 'sp1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'fri', '3', 'gc', 'bb1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'fri', '4', 'tam4', 'sk1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'fri', '5', 'dcn', 'aa1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'fri', '6', 'java', 'sp1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'fri', '7', 'xl', 'kl1', 'bca', 'assigned');

-- Insert Saturday schedule for BCA
INSERT INTO schedules (id, day, period, subjectId, staffId, departmentId, status)
VALUES
  (uuid_generate_v4(), 'sat', '1', 'dbms', 'csk1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'sat', '2', 'java', 'sp1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'sat', '3', 'pdbms', 'csk1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'sat', '4', 'yoga', 'yt1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'sat', '5', 'pla', 'sp1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'sat', '6', 'dcn', 'aa1', 'bca', 'assigned'),
  (uuid_generate_v4(), 'sat', '7', 'til', 'sp1', 'bca', 'assigned');

alter publication supabase_realtime add table staff;
alter publication supabase_realtime add table subjects;
alter publication supabase_realtime add table schedules;