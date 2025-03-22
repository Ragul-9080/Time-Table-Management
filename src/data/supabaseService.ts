import { getSupabaseClient } from "@/lib/supabase";
import { SearchResult } from "./database";

export const supabaseDb = {
  // Get all departments
  getDepartments: async () => {
    const departments = [
      { id: "bca", name: "BCA" },
      { id: "bsc_ai_ds", name: "BSc.AI&DS" },
      { id: "cs", name: "Computer Science" },
      { id: "math", name: "Mathematics" },
      { id: "eng", name: "Engineering" },
      { id: "sci", name: "Science" },
      { id: "arts", name: "Arts & Humanities" },
    ];
    return departments;
  },

  // Get all staff
  getAllStaff: async () => {
    const supabase = getSupabaseClient();

    try {
      // Get unique staff names from all department tables
      const { data: bcaStaff, error: bcaError } = await supabase
        .from("bca")
        .select("staff_name")
        .not("staff_name", "is", null);

      if (bcaError) throw bcaError;

      // Create a Set to store unique staff names
      const uniqueStaffNames = new Set<string>();

      // Add staff names from BCA table
      bcaStaff.forEach((item) => {
        if (item.staff_name) uniqueStaffNames.add(item.staff_name);
      });

      // Try to get staff from other tables too
      try {
        const { data: bscData } = await supabase
          .from("bsc_ai_ds")
          .select("staff_name")
          .not("staff_name", "is", null);

        if (bscData) {
          bscData.forEach((item) => {
            if (item.staff_name) uniqueStaffNames.add(item.staff_name);
          });
        }
      } catch (e) {
        console.log("No bsc_ai_ds table or error fetching from it", e);
      }

      // Convert Set to array of objects with id and name
      const staffList = Array.from(uniqueStaffNames).map((name) => ({
        id: name.toLowerCase().replace(/\s+/g, "-"),
        name,
      }));

      return staffList;
    } catch (error) {
      console.error("Error fetching staff:", error);
      // Return default staff list if there's an error
      return [
        { id: "mr-s-santhosh-kumar", name: "Mr. S. Santhosh Kumar" },
        { id: "dr-evangeline", name: "Dr. Evangeline" },
        { id: "mr-s-parusvanathan", name: "Mr. S. Parusvanathan" },
        { id: "mr-c-santhosh-kumar", name: "Mr. C. Santhosh Kumar" },
        { id: "mr-a-aswin", name: "Mr. A. Aswin" },
        { id: "xebia-trainer", name: "Xebia Trainer" },
      ];
    }
  },

  // Search schedule by staff, day, and period
  searchByStaff: async (
    staffName: string,
    day: string,
    period: string,
  ): Promise<SearchResult[]> => {
    const supabase = getSupabaseClient();

    try {
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

      // Search in BCA table
      const { data: bcaData, error: bcaError } = await supabase
        .from("bca")
        .select("*")
        .eq("staff_name", staffName)
        .eq("day", formattedDay)
        .eq("period", periodNumber);

      if (bcaError) throw bcaError;

      // Search in BSc.AI&DS table
      const { data: bscData, error: bscError } = await supabase
        .from("bsc_ai_ds")
        .select("*")
        .eq("staff_name", staffName)
        .eq("day", formattedDay)
        .eq("period", periodNumber);

      if (bscError) throw bscError;

      // Combine and transform results
      const bcaResults = (bcaData || []).map((item) => ({
        department: "BCA",
        subject: item.subject || "",
        staffName: item.staff_name || "",
        status: item.staff_name
          ? "assigned"
          : ("unassigned" as "assigned" | "free" | "unassigned"),
      }));

      const bscResults = (bscData || []).map((item) => ({
        department: "BSc.AI&DS",
        subject: item.subject || "",
        staffName: item.staff_name || "",
        status: item.staff_name
          ? "assigned"
          : ("unassigned" as "assigned" | "free" | "unassigned"),
      }));

      const combinedResults = [...bcaResults, ...bscResults];

      // If no results found, return a "free period" result
      if (combinedResults.length === 0) {
        return [
          {
            department: "",
            subject: "",
            staffName: staffName,
            status: "free",
          },
        ];
      }

      return combinedResults;
    } catch (error) {
      console.error("Error searching by staff:", error);
      throw error;
    }
  },

  // Search schedule by department, day, and period
  searchByDepartment: async (
    departmentId: string,
    day: string,
    period: string,
  ): Promise<SearchResult[]> => {
    const supabase = getSupabaseClient();

    try {
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

      // Determine which table to query based on department ID
      let tableName: string;
      let departmentName: string;

      switch (departmentId) {
        case "bca":
          tableName = "bca";
          departmentName = "BCA";
          break;
        case "bsc-ai-ds":
        case "bsc_ai_ds":
          tableName = "bsc_ai_ds";
          departmentName = "BSc.AI&DS";
          break;
        case "cs":
          tableName = "cs";
          departmentName = "Computer Science";
          break;
        case "math":
          tableName = "math";
          departmentName = "Mathematics";
          break;
        case "eng":
          tableName = "eng";
          departmentName = "Engineering";
          break;
        case "sci":
          tableName = "sci";
          departmentName = "Science";
          break;
        case "arts":
          tableName = "arts";
          departmentName = "Arts & Humanities";
          break;
        default:
          tableName = "bca";
          departmentName = "BCA";
      }

      // Query the appropriate table
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("day", formattedDay)
        .eq("period", periodNumber);

      if (error) throw error;

      // Transform results
      const results = (data || []).map((item) => ({
        department: departmentName,
        subject: item.subject || "",
        staffName: item.staff_name || "",
        status: item.staff_name
          ? "assigned"
          : ("unassigned" as "assigned" | "free" | "unassigned"),
      }));

      // If no results found, return an "unassigned" result
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

      return results;
    } catch (error) {
      console.error("Error searching by department:", error);
      throw error;
    }
  },
};
