// Mock database for timetable management system

export interface DepartmentSchedule {
  id: string;
  day: string;
  period: number;
  subject: string | null;
  staff_name: string | null;
}

export interface SearchResult {
  department: string;
  subject: string;
  staffName: string;
  status: "assigned" | "free" | "unassigned";
}

// Department data
export const departments = [
  { id: "bca", name: "BCA" },
  { id: "bsc_ai_ds", name: "BSc.AI&DS" },
  { id: "cs", name: "Computer Science" },
  { id: "math", name: "Mathematics" },
  { id: "eng", name: "Engineering" },
  { id: "sci", name: "Science" },
  { id: "arts", name: "Arts & Humanities" },
];

// Staff data for dropdown options
export const staffList = [
  "Mr. S. Santhosh Kumar",
  "Dr. Evangeline",
  "Mr. S. Parusvanathan",
  "Mr. C. Santhosh Kumar",
  "Mr. A. Aswin",
  "Xebia Trainer",
  "Mrs. K. Latha",
  "Mr. B. Balaji",
  "Yoga Trainer",
  "Mrs. N. Latha",
  "IBM Trainer",
];

// Mock BCA schedule data
const bcaSchedule: DepartmentSchedule[] = [
  {
    id: "1",
    day: "Monday",
    period: 1,
    subject: "DBMS",
    staff_name: "Mr. C. Santhosh Kumar",
  },
  {
    id: "2",
    day: "Monday",
    period: 2,
    subject: "DCN",
    staff_name: "Mr. A. Aswin",
  },
  {
    id: "3",
    day: "Monday",
    period: 3,
    subject: "JAVA LAB",
    staff_name: "Mr. S. Parusvanathan",
  },
  {
    id: "4",
    day: "Monday",
    period: 4,
    subject: "DBMS",
    staff_name: "Mr. C. Santhosh Kumar",
  },
  {
    id: "5",
    day: "Monday",
    period: 5,
    subject: "TAM",
    staff_name: "Mr. S. Santhosh Kumar",
  },
  {
    id: "6",
    day: "Monday",
    period: 7,
    subject: "LIB/AA",
    staff_name: null,
  },
  {
    id: "7",
    day: "Monday",
    period: 8,
    subject: "PLA/NS",
    staff_name: null,
  },
  {
    id: "8",
    day: "Tuesday",
    period: 1,
    subject: "GEN. ELEC.",
    staff_name: null,
  },
  {
    id: "9",
    day: "Tuesday",
    period: 2,
    subject: "TA/XEBIA",
    staff_name: "Xebia Trainer",
  },
  {
    id: "10",
    day: "Tuesday",
    period: 5,
    subject: "ENG",
    staff_name: "Dr. Evangeline",
  },
  {
    id: "11",
    day: "Tuesday",
    period: 6,
    subject: "ENG",
    staff_name: "Dr. Evangeline",
  },
];

// Mock BSc.AI&DS schedule data
const bscAiDsSchedule: DepartmentSchedule[] = [
  {
    id: "1",
    day: "Monday",
    period: 1,
    subject: "AI Fundamentals",
    staff_name: "IBM Trainer",
  },
  {
    id: "2",
    day: "Monday",
    period: 2,
    subject: "Data Structures",
    staff_name: "Mr. S. Parusvanathan",
  },
  {
    id: "3",
    day: "Monday",
    period: 3,
    subject: "Machine Learning",
    staff_name: "Mrs. N. Latha",
  },
];

// Database service functions
export const db = {
  // Get all departments
  getDepartments: () => {
    return Promise.resolve(departments);
  },

  // Get all staff
  getAllStaff: () => {
    return Promise.resolve(
      staffList.map((name) => ({
        id: name.toLowerCase().replace(/\s+/g, "-"),
        name,
      })),
    );
  },

  // Search schedule by staff, day, and period
  searchByStaff: async (staffName: string, day: string, period: string) => {
    // Convert day format if needed (e.g., "mon" to "Monday")
    const dayMap: Record<string, string> = {
      mon: "Monday",
      tue: "Tuesday",
      wed: "Wednesday",
      thu: "Thursday",
      fri: "Friday",
    };

    const formattedDay = dayMap[day] || day;
    const periodNumber = parseInt(period);

    // Search in all department schedules
    const allSchedules = [...bcaSchedule, ...bscAiDsSchedule];

    // Find schedules for this staff, day, and period
    const results = allSchedules.filter(
      (s) =>
        s.staff_name === staffName &&
        s.day === formattedDay &&
        s.period === periodNumber,
    );

    // Transform results to match SearchResult interface
    return results.map((result) => {
      // Determine department based on which array the result is from
      const department = bcaSchedule.includes(result as any)
        ? "BCA"
        : "BSc.AI&DS";

      return {
        department,
        subject: result.subject || "",
        staffName: result.staff_name || "",
        status: result.staff_name ? "assigned" : "unassigned",
      };
    });
  },

  // Search schedule by department, day, and period
  searchByDepartment: async (
    departmentId: string,
    day: string,
    period: string,
  ) => {
    // Convert day format if needed
    const dayMap: Record<string, string> = {
      mon: "Monday",
      tue: "Tuesday",
      wed: "Wednesday",
      thu: "Thursday",
      fri: "Friday",
    };

    const formattedDay = dayMap[day] || day;
    const periodNumber = parseInt(period);

    // Select the appropriate schedule based on department
    let departmentSchedule: DepartmentSchedule[] = [];
    let departmentName = "";

    switch (departmentId) {
      case "bca":
        departmentSchedule = bcaSchedule;
        departmentName = "BCA";
        break;
      case "bsc-ai-ds":
      case "bsc_ai_ds":
        departmentSchedule = bscAiDsSchedule;
        departmentName = "BSc.AI&DS";
        break;
      default:
        departmentSchedule = [];
        departmentName =
          departments.find((d) => d.id === departmentId)?.name || "";
    }

    // Find schedules for this department, day, and period
    const results = departmentSchedule.filter(
      (s) => s.day === formattedDay && s.period === periodNumber,
    );

    // If no results, return an empty slot
    if (results.length === 0) {
      return [
        {
          department: departmentName,
          subject: "",
          staffName: "",
          status: "unassigned",
        },
      ];
    }

    // Transform results to match SearchResult interface
    return results.map((result) => ({
      department: departmentName,
      subject: result.subject || "",
      staffName: result.staff_name || "",
      status: result.staff_name ? "assigned" : "unassigned",
    }));
  },
};
