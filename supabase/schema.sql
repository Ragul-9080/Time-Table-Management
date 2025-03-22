-- Create departments table
CREATE TABLE departments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

-- Create staff table
CREATE TABLE staff (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT REFERENCES departments(id),
  designation TEXT
);

-- Create subjects table
CREATE TABLE subjects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT REFERENCES departments(id),
  staffId TEXT REFERENCES staff(id),
  course_code TEXT,
  abbr TEXT
);

-- Create schedules table
CREATE TABLE schedules (
  id TEXT PRIMARY KEY,
  day TEXT NOT NULL,
  period TEXT NOT NULL,
  subjectId TEXT REFERENCES subjects(id),
  staffId TEXT REFERENCES staff(id),
  departmentId TEXT REFERENCES departments(id),
  status TEXT CHECK (status IN ('assigned', 'free', 'unassigned')),
  time_slot TEXT,
  section TEXT,
  batch TEXT,
  academic_year TEXT,
  program TEXT
);

-- Insert departments data
INSERT INTO departments (id, name) VALUES
  ('bca', 'BCA'),
  ('bsc-ai-ds', 'BSc.AI&DS'),
  ('cs', 'Computer Science'),
  ('math', 'Mathematics'),
  ('eng', 'Engineering'),
  ('sci', 'Science'),
  ('arts', 'Arts & Humanities'),
  ('bus', 'Business'),
  ('lang', 'Languages');

-- Insert staff data based on the timetable
INSERT INTO staff (id, name, department, designation) VALUES
  ('sk1', 'Mr. S. Santhosh Kumar', 'bca', 'AP/Tamil'),
  ('ev1', 'Dr. Evangeline', 'bca', 'English'),
  ('sp1', 'Mr. S. Parusvanathan', 'bca', 'AP/CS'),
  ('csk1', 'Mr. C. Santhosh Kumar', 'bca', 'AP/MCA'),
  ('aa1', 'Mr. A. Aswin', 'bca', 'AP/CS'),
  ('xt1', 'Xebia Trainer', 'bca', ''),
  ('kl1', 'Mrs. K. Latha', 'bca', 'AP/MCA'),
  ('bb1', 'Mr. B. Balaji', 'bca', 'Farm Manager/SAGS'),
  ('yt1', 'Yoga Trainer', 'bca', '');

-- Insert subjects data based on the timetable
INSERT INTO subjects (id, name, department, staffId, course_code, abbr) VALUES
  ('tam4', 'Tamil - IV', 'bca', 'sk1', 'ASU23TAS404', 'TAM'),
  ('eng4', 'English - IV', 'bca', 'ev1', 'ASU23ENS404', 'ENG'),
  ('java', 'Java Programming', 'bca', 'sp1', 'ASU23CSC414', 'JAVA'),
  ('dbms', 'Database Management System', 'bca', 'csk1', 'ASU23CSC415', 'DBMS'),
  ('dcn', 'Data Communications and Computer Networks', 'bca', 'aa1', 'ASU23CAE404', 'DCN'),
  ('test', 'Test Automation', 'bca', 'xt1', 'ASU23CAC417', 'TA'),
  ('pjava', 'Practical Java Programming', 'bca', 'sp1', 'ASU23CSC417', 'JAVA LAB'),
  ('pdbms', 'Practical Database Management System', 'bca', 'csk1', 'ASU23CSC418', 'DBMS LAB'),
  ('excel', 'Data Manipulation with Excel and SQL', 'bca', 'kl1', 'ASU23CSC404', 'XL LAB'),
  ('til', 'Takshashila Innovative Learning', 'bca', 'sp1', 'U24UMP191', 'TIL'),
  ('yoga', 'Yoga and Meditation - IC', 'bca', 'yt1', 'U24UMP192', 'Yoga'),
  ('green', 'Green Credit', 'bca', 'bb1', 'U24UMP193', 'GC'),
  ('pla', 'Placement Training', 'bca', '', '', 'PLA');

-- Insert schedule data based on the timetable
-- Monday
INSERT INTO schedules (id, day, period, subjectId, staffId, departmentId, status, time_slot, section) VALUES
  ('mon-1', 'mon', '1', 'dbms', 'csk1', 'bca', 'assigned', '9.30-10.20', 'II/IV/A'),
  ('mon-2', 'mon', '2', 'dcn', 'aa1', 'bca', 'assigned', '10.20-11.10', 'II/IV/A'),
  ('mon-3', 'mon', '3', 'pjava', 'sp1', 'bca', 'assigned', '11.20-12.10', 'II/IV/A'),
  ('mon-4', 'mon', '4', null, null, 'bca', 'free', '12.10-1.00', 'II/IV/A'),
  ('mon-5', 'mon', '5', 'dbms', 'csk1', 'bca', 'assigned', '1.40-2.20', 'II/IV/A'),
  ('mon-6', 'mon', '6', 'tam4', 'sk1', 'bca', 'assigned', '2.20-3.00', 'II/IV/A'),
  ('mon-7', 'mon', '7', null, null, 'bca', 'assigned', '3.10-4.00', 'II/IV/A'),
  ('mon-8', 'mon', '8', 'pla', null, 'bca', 'assigned', '4.00-4.40', 'II/IV/A');

-- Tuesday
INSERT INTO schedules (id, day, period, subjectId, staffId, departmentId, status, time_slot, section) VALUES
  ('tue-1', 'tue', '1', null, null, 'bca', 'assigned', '9.30-10.20', 'II/IV/A'),
  ('tue-2', 'tue', '2', 'test', 'xt1', 'bca', 'assigned', '10.20-11.10', 'II/IV/A'),
  ('tue-3', 'tue', '3', null, null, 'bca', 'assigned', '11.20-12.10', 'II/IV/A'),
  ('tue-4', 'tue', '4', null, null, 'bca', 'assigned', '12.10-1.00', 'II/IV/A'),
  ('tue-5', 'tue', '5', 'eng4', 'ev1', 'bca', 'assigned', '1.40-2.20', 'II/IV/A'),
  ('tue-6', 'tue', '6', 'eng4', 'ev1', 'bca', 'assigned', '2.20-3.00', 'II/IV/A'),
  ('tue-7', 'tue', '7', null, null, 'bca', 'assigned', '3.10-4.00', 'II/IV/A'),
  ('tue-8', 'tue', '8', null, 'xt1', 'bca', 'assigned', '4.00-4.40', 'II/IV/A');

-- Wednesday
INSERT INTO schedules (id, day, period, subjectId, staffId, departmentId, status, time_slot, section) VALUES
  ('wed-1', 'wed', '1', 'test', 'xt1', 'bca', 'assigned', '9.30-10.20', 'II/IV/A'),
  ('wed-2', 'wed', '2', null, null, 'bca', 'assigned', '10.20-11.10', 'II/IV/A'),
  ('wed-3', 'wed', '3', 'java', 'sp1', 'bca', 'assigned', '11.20-12.10', 'II/IV/A'),
  ('wed-4', 'wed', '4', null, null, 'bca', 'assigned', '12.10-1.00', 'II/IV/A'),
  ('wed-5', 'wed', '5', 'pdbms', 'csk1', 'bca', 'assigned', '1.40-2.20', 'II/IV/A'),
  ('wed-6', 'wed', '6', null, null, 'bca', 'assigned', '2.20-3.00', 'II/IV/A'),
  ('wed-7', 'wed', '7', null, null, 'bca', 'assigned', '3.10-4.00', 'II/IV/A'),
  ('wed-8', 'wed', '8', 'til', 'sp1', 'bca', 'assigned', '4.00-4.40', 'II/IV/A');

-- Thursday
INSERT INTO schedules (id, day, period, subjectId, staffId, departmentId, status, time_slot, section) VALUES
  ('thu-1', 'thu', '1', 'java', 'sp1', 'bca', 'assigned', '9.30-10.20', 'II/IV/A'),
  ('thu-2', 'thu', '2', 'dcn', 'aa1', 'bca', 'assigned', '10.20-11.10', 'II/IV/A'),
  ('thu-3', 'thu', '3', 'dbms', 'csk1', 'bca', 'assigned', '11.20-12.10', 'II/IV/A'),
  ('thu-4', 'thu', '4', 'eng4', 'ev1', 'bca', 'assigned', '12.10-1.00', 'II/IV/A'),
  ('thu-5', 'thu', '5', 'tam4', 'sk1', 'bca', 'assigned', '1.40-2.20', 'II/IV/A'),
  ('thu-6', 'thu', '6', 'eng4', 'ev1', 'bca', 'assigned', '2.20-3.00', 'II/IV/A'),
  ('thu-7', 'thu', '7', null, null, 'bca', 'assigned', '3.10-4.00', 'II/IV/A'),
  ('thu-8', 'thu', '8', null, null, 'bca', 'assigned', '4.00-4.40', 'II/IV/A');

-- Friday
INSERT INTO schedules (id, day, period, subjectId, staffId, departmentId, status, time_slot, section) VALUES
  ('fri-1', 'fri', '1', 'pjava', 'sp1', 'bca', 'assigned', '9.30-10.20', 'II/IV/A'),
  ('fri-2', 'fri', '2', null, null, 'bca', 'assigned', '10.20-11.10', 'II/IV/A'),
  ('fri-3', 'fri', '3', 'green', 'bb1', 'bca', 'assigned', '11.20-12.10', 'II/IV/A'),
  ('fri-4', 'fri', '4', 'tam4', 'sk1', 'bca', 'assigned', '12.10-1.00', 'II/IV/A'),
  ('fri-5', 'fri', '5', 'dcn', 'aa1', 'bca', 'assigned', '1.40-2.20', 'II/IV/A'),
  ('fri-6', 'fri', '6', 'java', 'sp1', 'bca', 'assigned', '2.20-3.00', 'II/IV/A'),
  ('fri-7', 'fri', '7', 'excel', 'kl1', 'bca', 'assigned', '3.10-4.00', 'II/IV/A'),
  ('fri-8', 'fri', '8', null, null, 'bca', 'assigned', '4.00-4.40', 'II/IV/A');

-- Saturday
INSERT INTO schedules (id, day, period, subjectId, staffId, departmentId, status, time_slot, section) VALUES
  ('sat-1', 'sat', '1', 'dbms', 'csk1', 'bca', 'assigned', '9.30-10.20', 'II/IV/A'),
  ('sat-2', 'sat', '2', 'java', 'sp1', 'bca', 'assigned', '10.20-11.10', 'II/IV/A'),
  ('sat-3', 'sat', '3', 'pdbms', 'csk1', 'bca', 'assigned', '11.20-12.10', 'II/IV/A'),
  ('sat-4', 'sat', '4', null, null, 'bca', 'assigned', '12.10-1.00', 'II/IV/A'),
  ('sat-5', 'sat', '5', 'yoga', 'yt1', 'bca', 'assigned', '1.40-2.20', 'II/IV/A'),
  ('sat-6', 'sat', '6', 'pla', null, 'bca', 'assigned', '2.20-3.00', 'II/IV/A'),
  ('sat-7', 'sat', '7', 'dcn', 'aa1', 'bca', 'assigned', '3.10-4.00', 'II/IV/A'),
  ('sat-8', 'sat', '8', null, 'sp1', 'bca', 'assigned', '4.00-4.40', 'II/IV/A');
