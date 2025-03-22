-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create staff table
CREATE TABLE IF NOT EXISTS staff (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT REFERENCES departments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT REFERENCES departments(id),
  staffId TEXT REFERENCES staff(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schedules table
CREATE TABLE IF NOT EXISTS schedules (
  id TEXT PRIMARY KEY,
  day TEXT NOT NULL,
  period TEXT NOT NULL,
  subjectId TEXT REFERENCES subjects(id),
  staffId TEXT REFERENCES staff(id),
  departmentId TEXT REFERENCES departments(id),
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable realtime for all tables
alter publication supabase_realtime add table departments;
alter publication supabase_realtime add table staff;
alter publication supabase_realtime add table subjects;
alter publication supabase_realtime add table schedules;

-- Insert initial data for departments
INSERT INTO departments (id, name) VALUES
('bca', 'BCA'),
('bsc-ai-ds', 'BSc.AI&DS'),
('cs', 'Computer Science'),
('math', 'Mathematics'),
('eng', 'Engineering'),
('sci', 'Science'),
('arts', 'Arts & Humanities'),
('bus', 'Business'),
('lang', 'Languages')
ON CONFLICT (id) DO NOTHING;

-- Insert initial data for staff
INSERT INTO staff (id, name, department) VALUES
('sk1', 'Mr. S. Santhosh Kumar', 'bca'),
('ev1', 'Dr. Evangeline', 'bca'),
('sp1', 'Mr. S. Parusvanathan', 'bca'),
('csk1', 'Mr. C. Santhosh Kumar', 'bca'),
('aa1', 'Mr. A. Aswin', 'bca'),
('xt1', 'Xebia Trainer', 'bca'),
('kl1', 'Mrs. K. Latha', 'bca'),
('bb1', 'Mr. B. Balaji', 'bca'),
('yt1', 'Yoga Trainer', 'bca'),
('nl1', 'Mrs. N. Latha', 'bsc-ai-ds'),
('ibm1', 'IBM Trainer', 'bsc-ai-ds'),
('js1', 'John Smith', 'cs'),
('jd1', 'Jane Doe', 'math'),
('rj1', 'Robert Johnson', 'eng'),
('ew1', 'Emily Williams', 'sci'),
('mb1', 'Michael Brown', 'arts'),
('sd1', 'Sarah Davis', 'bus'),
('dw1', 'David Wilson', 'lang')
ON CONFLICT (id) DO NOTHING;

-- Insert initial data for subjects
INSERT INTO subjects (id, name, department, staffId) VALUES
('tam4', 'Tamil IV', 'bca', 'sk1'),
('eng4', 'English IV', 'bca', 'ev1'),
('java', 'Java Programming', 'bca', 'sp1'),
('dbms', 'Database Management System', 'bca', 'csk1'),
('dcn', 'Data Communications and Computer Networks', 'bca', 'aa1'),
('test', 'Test Automation', 'bca', 'xt1'),
('pjava', 'Practical Java Programming', 'bca', 'sp1'),
('pdbms', 'Practical Database Management System', 'bca', 'csk1'),
('excel', 'Data Manipulation with Excel and SQL', 'bca', 'kl1'),
('til', 'Takshashila Innovative Learning', 'bca', 'sp1'),
('yoga', 'Yoga and Meditation - IC', 'bca', 'yt1'),
('green', 'Green Credit', 'bca', 'bb1'),
('tam4-ai', 'Tamil IV', 'bsc-ai-ds', 'sk1'),
('eng4-ai', 'English IV', 'bsc-ai-ds', 'ev1'),
('java-ai', 'Java Programming', 'bsc-ai-ds', 'sp1'),
('dbms-ai', 'Database Management System', 'bsc-ai-ds', 'csk1'),
('se-ai', 'Software Engineering', 'bsc-ai-ds', 'aa1'),
('ml-ai', 'Development of Machine Learning Models', 'bsc-ai-ds', 'ibm1'),
('pjava-ai', 'Practical Java Programming', 'bsc-ai-ds', 'sp1'),
('pdbms-ai', 'Practical Database Management System', 'bsc-ai-ds', 'csk1'),
('excel-ai', 'Data Manipulation with Excel and SQL', 'bsc-ai-ds', 'kl1'),
('til-ai', 'Takshashila Innovative Learning', 'bsc-ai-ds', 'kl1'),
('yoga-ai', 'Yoga and Meditation - IC', 'bsc-ai-ds', 'nl1'),
('green-ai', 'Green Credit', 'bsc-ai-ds', 'bb1'),
('calc', 'Calculus', 'math', 'jd1'),
('prog', 'Introduction to Programming', 'cs', 'js1'),
('algo', 'Advanced Algorithms', 'cs', 'js1')
ON CONFLICT (id) DO NOTHING;

-- Insert initial data for schedules
INSERT INTO schedules (id, day, period, subjectId, staffId, departmentId, status) VALUES
-- BCA Department - Monday
('1', 'mon', '1', 'tam4', 'sk1', 'bca', 'assigned'),
('2', 'mon', '2', 'eng4', 'ev1', 'bca', 'assigned'),
('3', 'mon', '3', 'java', 'sp1', 'bca', 'assigned'),
('4', 'mon', '4', 'dbms', 'csk1', 'bca', 'assigned'),
('5', 'mon', '5', 'dcn', 'aa1', 'bca', 'assigned'),
('6', 'mon', '6', 'test', 'xt1', 'bca', 'assigned'),

-- BCA Department - Tuesday
('7', 'tue', '1', 'pjava', 'sp1', 'bca', 'assigned'),
('8', 'tue', '2', 'pdbms', 'csk1', 'bca', 'assigned'),
('9', 'tue', '3', 'excel', 'kl1', 'bca', 'assigned'),
('10', 'tue', '4', 'til', 'sp1', 'bca', 'assigned'),
('11', 'tue', '5', 'yoga', 'yt1', 'bca', 'assigned'),
('12', 'tue', '6', 'green', 'bb1', 'bca', 'assigned'),

-- BSc.AI&DS Department - Monday
('13', 'mon', '1', 'tam4-ai', 'sk1', 'bsc-ai-ds', 'assigned'),
('14', 'mon', '2', 'eng4-ai', 'ev1', 'bsc-ai-ds', 'assigned'),
('15', 'mon', '3', 'java-ai', 'sp1', 'bsc-ai-ds', 'assigned'),
('16', 'mon', '4', 'dbms-ai', 'csk1', 'bsc-ai-ds', 'assigned'),
('17', 'mon', '5', 'se-ai', 'aa1', 'bsc-ai-ds', 'assigned'),
('18', 'mon', '6', 'ml-ai', 'ibm1', 'bsc-ai-ds', 'assigned'),

-- BSc.AI&DS Department - Tuesday
('19', 'tue', '1', 'pjava-ai', 'sp1', 'bsc-ai-ds', 'assigned'),
('20', 'tue', '2', 'pdbms-ai', 'csk1', 'bsc-ai-ds', 'assigned'),
('21', 'tue', '3', 'excel-ai', 'kl1', 'bsc-ai-ds', 'assigned'),
('22', 'tue', '4', 'til-ai', 'kl1', 'bsc-ai-ds', 'assigned'),
('23', 'tue', '5', 'yoga-ai', 'nl1', 'bsc-ai-ds', 'assigned'),
('24', 'tue', '6', 'green-ai', 'bb1', 'bsc-ai-ds', 'assigned'),

-- Add some free periods for staff
('25', 'wed', '1', NULL, 'sp1', 'bca', 'free'),
('26', 'wed', '2', NULL, 'csk1', 'bca', 'free'),
('27', 'wed', '3', NULL, 'kl1', 'bca', 'free'),

-- Add some unassigned periods
('28', 'wed', '4', NULL, NULL, 'bca', 'unassigned'),
('29', 'wed', '5', NULL, NULL, 'bsc-ai-ds', 'unassigned'),

-- Additional schedules for other departments
('30', 'mon', '1', 'calc', 'jd1', 'math', 'assigned'),
('31', 'mon', '2', 'prog', 'js1', 'cs', 'assigned'),
('32', 'tue', '3', 'algo', 'js1', 'cs', 'assigned')
ON CONFLICT (id) DO NOTHING;