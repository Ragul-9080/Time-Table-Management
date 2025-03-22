import { getSupabaseClient } from "@/lib/supabase";
import { SearchResult } from "./database";

export const supabaseDb = {
  // Get all departments
  getDepartments: async () => {
    const departments = [
      { id: "bca_i", name: "BCA - I" },
      { id: "bca_ii", name: "BCA - II" },
      { id: "bsc_ai_ds_i", name: "Bsc AI&DS - I" },
      { id: "bsc_ai_ds_ii", name: "Bsc AI&DS - II" },
      { id: "mca_i", name: "MCA - I" },
      { id: "mca_ii", name: "MCA - II" },
    ];
    return departments;
  },

  // Get all staff
  getAllStaff: async () => {
    const supabase = getSupabaseClient();

    try {
      // Create a Set to store unique staff names
      const uniqueStaffNames = new Set<string>();

      // Array of all department tables
      const tables = [
        "bca-i",
        "bca-ii",
        "bsc_ai_ds-i",
        "bsc_ai_ds-ii",
        "mca-i",
        "mca-ii",
      ];

      // Query each table for staff names
      for (const table of tables) {
        try {
          const { data, error } = await supabase
            .from(table)
            .select("staff_name")
            .not("staff_name", "is", null);

          if (error) {
            console.log(`Error fetching from ${table}:`, error);
            continue;
          }

          if (data) {
            data.forEach((item) => {
              if (item.staff_name) uniqueStaffNames.add(item.staff_name);
            });
          }
        } catch (e) {
          console.log(`No ${table} table or error fetching from it`, e);
        }
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
        { id: "dr-n-p-damodaran", name: "Dr. N.P. Damodaran, AP/Maths" },
        { id: "dr-prathiba", name: "Dr. Prathiba" },
        { id: "dr-t-vijayakumar", name: "Dr. T. Vijayakumar" },
        { id: "mr-a-aswin", name: "Mr. A. Aswin" },
        { id: "mr-b-balaji", name: "Mr. B. Balaji" },
        { id: "mr-c-santhosh-kumar", name: "Mr. C. Santhosh Kumar" },
        { id: "mr-r-bharathidasan", name: "Mr. R. Bharathidasan" },
        { id: "mr-rogen-judie", name: "Mr. Rogen Judie" },
        { id: "mr-s-parsuvanathan", name: "Mr. S. Parsuvanathan" },
        { id: "mr-s-santhosh-kumar", name: "Mr. S. Santhosh Kumar" },
        { id: "mrs-k-hemavathi", name: "Mrs. K. Hemavathi" },
        { id: "mrs-k-latha", name: "Mrs. K. Latha" },
        { id: "mrs-r-saranya", name: "Mrs. R. Saranya" },
        { id: "ms-p-kalaiselvi", name: "Ms. P. Kalaiselvi" },
        { id: "ms-priyadharshini", name: "Ms. Priyadharshini" },
        { id: "ms-t-mahakaviyarasi", name: "Ms. T. Mahakaviyarasi" },
        { id: "ibm-trainer", name: "IBM Trainer" },
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
        sat: "Saturday",
      };

      const formattedDay = dayMap[day] || day;
      const periodNumber = parseInt(period);

      // Array of all department tables
      const tables = [
        "bca-i",
        "bca-ii",
        "bsc_ai_ds-i",
        "bsc_ai_ds-ii",
        "mca-i",
        "mca-ii",
      ];

      // Map table names to department display names
      const tableToDisplayName: Record<string, string> = {
        "bca-i": "BCA - I",
        "bca-ii": "BCA - II",
        "bsc_ai_ds-i": "Bsc AI&DS - I",
        "bsc_ai_ds-ii": "Bsc AI&DS - II",
        "mca-i": "MCA - I",
        "mca-ii": "MCA - II",
      };

      // Store all results
      const allResults: SearchResult[] = [];

      // Query each table for the staff schedule
      for (const table of tables) {
        try {
          const { data, error } = await supabase
            .from(table)
            .select("*")
            .eq("staff_name", staffName)
            .eq("day", formattedDay)
            .eq("period", periodNumber);

          if (error) {
            console.log(`Error fetching from ${table}:`, error);
            continue;
          }

          if (data && data.length > 0) {
            // Transform results for this table
            const tableResults = data.map((item) => ({
              department: tableToDisplayName[table] || table,
              subject: item.subject || "",
              staffName: item.staff_name || "",
              status: item.staff_name
                ? "assigned"
                : ("unassigned" as "assigned" | "free" | "unassigned"),
            }));

            // Add to all results
            allResults.push(...tableResults);
          }
        } catch (e) {
          console.log(`Error querying ${table}:`, e);
        }
      }

      // If no results found, return a "free period" result
      if (allResults.length === 0) {
        return [
          {
            department: "",
            subject: "",
            staffName: staffName,
            status: "free",
          },
        ];
      }

      return allResults;
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
        sat: "Saturday",
      };

      const formattedDay = dayMap[day] || day;
      const periodNumber = parseInt(period);

      // Determine which table to query based on department ID
      let tableName: string;
      let departmentName: string;

      switch (departmentId) {
        case "bca_i":
          tableName = "bca-i";
          departmentName = "BCA - I";
          break;
        case "bca_ii":
          tableName = "bca-ii";
          departmentName = "BCA - II";
          break;
        case "bsc_ai_ds_i":
          tableName = "bsc_ai_ds-i";
          departmentName = "Bsc AI&DS - I";
          break;
        case "bsc_ai_ds_ii":
          tableName = "bsc_ai_ds-ii";
          departmentName = "Bsc AI&DS - II";
          break;
        case "mca_i":
          tableName = "mca-i";
          departmentName = "MCA - I";
          break;
        case "mca_ii":
          tableName = "mca-ii";
          departmentName = "MCA - II";
          break;
        default:
          tableName = "bca-i";
          departmentName = "BCA - I";
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
