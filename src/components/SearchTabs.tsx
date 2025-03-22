import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StaffSearchForm from "./StaffSearchForm";
import StudentSearchForm from "./StudentSearchForm";
import { db } from "@/data/database";
import { supabaseDb } from "@/data/supabaseService";
import { getSupabaseClient } from "@/lib/supabase";

interface SearchResult {
  department: string;
  subject: string;
  staffName: string;
  status: "assigned" | "free" | "unassigned";
}

interface SearchTabsProps {
  onSearchResults?: (results: SearchResult[]) => void;
  staffList?: string[];
  departmentList?: { id: string; name: string }[];
  daysList?: string[];
  periodsList?: string[];
}

const SearchTabs = ({
  onSearchResults = () => {},
  staffList = [],
  departmentList = [],
  daysList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  periodsList = [
    "Period 1",
    "Period 2",
    "Period 3",
    "Period 4",
    "Period 5",
    "Period 6",
  ],
}: SearchTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>("staff");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allStaff, setAllStaff] = useState<string[]>([]);
  const [allDepartments, setAllDepartments] = useState<
    { id: string; name: string }[]
  >([]);

  // Map day names to database day codes
  const dayMap: Record<string, string> = {
    Monday: "mon",
    Tuesday: "tue",
    Wednesday: "wed",
    Thursday: "thu",
    Friday: "fri",
  };

  // Map period names to database period codes
  const periodMap: Record<string, string> = {
    "Period 1": "1",
    "Period 2": "2",
    "Period 3": "3",
    "Period 4": "4",
    "Period 5": "5",
    "Period 6": "6",
    "Period 7": "7",
  };

  // Fetch staff and departments from database on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if Supabase is configured
        const isSupabaseConfigured =
          !!import.meta.env.VITE_SUPABASE_URL &&
          !!import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (isSupabaseConfigured) {
          // Try to connect to Supabase
          const supabase = getSupabaseClient();
          if (supabase) {
            // Try to connect to the BCA table instead of departments
            const { data: testData } = await supabase
              .from("bca")
              .select("count", { count: "exact", head: true });

            if (testData !== null) {
              // Supabase is working, use it
              console.log("Using Supabase database");
              // Fetch all staff
              const staffData = await supabaseDb.getAllStaff();
              const staffNames = staffData.map((s) => s.name);
              console.log("Fetched staff names:", staffNames);
              setAllStaff(staffNames);

              // Fetch all departments
              const departmentsData = await supabaseDb.getDepartments();
              setAllDepartments(
                departmentsData.map((d) => ({ id: d.id, name: d.name })),
              );
              return;
            }
          }
        }

        // Fallback to mock database
        console.log("Using mock database");
        // Fetch all staff
        const staffData = await db.getAllStaff();
        setAllStaff(staffData.map((s) => s.name));

        // Fetch all departments
        const departmentsData = await db.getDepartments();
        setAllDepartments(
          departmentsData.map((d) => ({ id: d.id, name: d.name })),
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to mock database on error
        try {
          console.log("Falling back to mock database");
          // Fetch all staff
          const staffData = await db.getAllStaff();
          setAllStaff(staffData.map((s) => s.name));

          // Fetch all departments
          const departmentsData = await db.getDepartments();
          setAllDepartments(
            departmentsData.map((d) => ({ id: d.id, name: d.name })),
          );
        } catch (fallbackError) {
          console.error("Error with fallback database:", fallbackError);
        }
      }
    };

    fetchData();
  }, []);

  const handleStaffSearch = async (values: any) => {
    setIsLoading(true);
    try {
      // Convert day and period to database format
      const dayCode = dayMap[values.day] || "mon";
      const periodCode = periodMap[values.period] || "1";

      // Check if Supabase is configured
      const isSupabaseConfigured =
        !!import.meta.env.VITE_SUPABASE_URL &&
        !!import.meta.env.VITE_SUPABASE_ANON_KEY;

      let results;
      if (isSupabaseConfigured) {
        try {
          // Try to use Supabase
          results = await supabaseDb.searchByStaff(
            values.staffName,
            dayCode,
            periodCode,
          );
        } catch (supabaseError) {
          console.error(
            "Supabase error, falling back to mock database:",
            supabaseError,
          );
          // Fallback to mock database
          results = await db.searchByStaff(
            values.staffName,
            dayCode,
            periodCode,
          );
        }
      } else {
        // Use mock database
        results = await db.searchByStaff(values.staffName, dayCode, periodCode);
      }

      // Pass results directly to the callback
      onSearchResults(results);
    } catch (error) {
      console.error("Error searching by staff:", error);
      onSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudentSearch = async (values: any) => {
    setIsLoading(true);
    try {
      // Convert day and period to database format
      const dayCode =
        dayMap[days.find((d) => d.id === values.day)?.name || ""] || values.day;
      const periodCode = values.period;

      // Check if Supabase is configured
      const isSupabaseConfigured =
        !!import.meta.env.VITE_SUPABASE_URL &&
        !!import.meta.env.VITE_SUPABASE_ANON_KEY;

      let results;
      if (isSupabaseConfigured) {
        try {
          // Try to use Supabase
          results = await supabaseDb.searchByDepartment(
            values.department,
            dayCode,
            periodCode,
          );
        } catch (supabaseError) {
          console.error(
            "Supabase error, falling back to mock database:",
            supabaseError,
          );
          // Fallback to mock database
          results = await db.searchByDepartment(
            values.department,
            dayCode,
            periodCode,
          );
        }
      } else {
        // Use mock database
        results = await db.searchByDepartment(
          values.department,
          dayCode,
          periodCode,
        );
      }

      // Pass results directly to the callback
      onSearchResults(results);
    } catch (error) {
      console.error("Error searching by department:", error);
      onSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Map days to format expected by StudentSearchForm
  const days = [
    { id: "mon", name: "Monday" },
    { id: "tue", name: "Tuesday" },
    { id: "wed", name: "Wednesday" },
    { id: "thu", name: "Thursday" },
    { id: "fri", name: "Friday" },
  ];

  // Map periods to format expected by StudentSearchForm
  const periods = [
    { id: "1", name: "Period 1" },
    { id: "2", name: "Period 2" },
    { id: "3", name: "Period 3" },
    { id: "4", name: "Period 4" },
    { id: "5", name: "Period 5" },
    { id: "6", name: "Period 6" },
    { id: "7", name: "Period 7" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <Tabs
        defaultValue="staff"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="px-6 pt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="staff" className="text-lg py-3">
              Staff Search
            </TabsTrigger>
            <TabsTrigger value="student" className="text-lg py-3">
              Student Search
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="staff" className="p-6 pt-4">
          <div className="space-y-4">
            <p className="text-gray-600">
              Search for a staff member's schedule by selecting their name, day,
              and period.
            </p>
            <StaffSearchForm
              onSearch={handleStaffSearch}
              staffList={allStaff.length > 0 ? allStaff : staffList}
              daysList={daysList}
              periodsList={periodsList}
              isLoading={isLoading}
            />
          </div>
        </TabsContent>

        <TabsContent value="student" className="p-6 pt-4">
          <div className="space-y-4">
            <p className="text-gray-600">
              Search for class information by selecting department, day, and
              period.
            </p>
            <StudentSearchForm
              onSearch={handleStudentSearch}
              isLoading={isLoading}
              departments={
                allDepartments.length > 0 ? allDepartments : departmentList
              }
              days={days}
              periods={periods}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchTabs;
