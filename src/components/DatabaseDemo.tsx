import React, { useState, useEffect } from "react";
import { getSupabaseClient } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DatabaseDemo = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "departments" | "staff" | "schedules"
  >("departments");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const supabase = getSupabaseClient();
        if (!supabase) {
          throw new Error("Supabase client not initialized");
        }

        // Fetch data based on active tab
        if (activeTab === "departments") {
          const { data, error } = await supabase
            .from("departments")
            .select("*")
            .limit(10);
          if (error) throw error;
          setDepartments(data || []);
        } else if (activeTab === "staff") {
          const { data, error } = await supabase
            .from("staff")
            .select("*, departments(name)")
            .limit(10);
          if (error) throw error;
          setStaff(data || []);
        } else if (activeTab === "schedules") {
          const { data, error } = await supabase
            .from("schedules")
            .select("*, departments(name), staff(name), subjects(name)")
            .limit(10);
          if (error) throw error;
          setSchedules(data || []);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const renderDepartments = () => {
    if (departments.length === 0) {
      return (
        <p className="text-gray-500 text-center py-4">No departments found</p>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Created At</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{dept.id}</td>
                <td className="p-3">{dept.name}</td>
                <td className="p-3">
                  {new Date(dept.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderStaff = () => {
    if (staff.length === 0) {
      return <p className="text-gray-500 text-center py-4">No staff found</p>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Department</th>
              <th className="p-3 border-b">Created At</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((person) => (
              <tr key={person.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{person.id}</td>
                <td className="p-3">{person.name}</td>
                <td className="p-3">{person.departments?.name || "N/A"}</td>
                <td className="p-3">
                  {new Date(person.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderSchedules = () => {
    if (schedules.length === 0) {
      return (
        <p className="text-gray-500 text-center py-4">No schedules found</p>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">Day</th>
              <th className="p-3 border-b">Period</th>
              <th className="p-3 border-b">Department</th>
              <th className="p-3 border-b">Subject</th>
              <th className="p-3 border-b">Staff</th>
              <th className="p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {schedule.day === "mon"
                    ? "Monday"
                    : schedule.day === "tue"
                      ? "Tuesday"
                      : schedule.day === "wed"
                        ? "Wednesday"
                        : schedule.day === "thu"
                          ? "Thursday"
                          : schedule.day === "fri"
                            ? "Friday"
                            : schedule.day}
                </td>
                <td className="p-3">Period {schedule.period}</td>
                <td className="p-3">{schedule.departments?.name || "N/A"}</td>
                <td className="p-3">{schedule.subjects?.name || "N/A"}</td>
                <td className="p-3">{schedule.staff?.name || "N/A"}</td>
                <td className="p-3">
                  <Badge
                    className={`px-2 py-1 ${
                      schedule.status === "assigned"
                        ? "bg-green-100 text-green-800"
                        : schedule.status === "free"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {schedule.status === "assigned"
                      ? "Assigned Class"
                      : schedule.status === "free"
                        ? "Free Period"
                        : "Unassigned Class"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6">Supabase Database Demo</h2>

      <div className="flex space-x-2 mb-6">
        <Button
          variant={activeTab === "departments" ? "default" : "outline"}
          onClick={() => setActiveTab("departments")}
        >
          Departments
        </Button>
        <Button
          variant={activeTab === "staff" ? "default" : "outline"}
          onClick={() => setActiveTab("staff")}
        >
          Staff
        </Button>
        <Button
          variant={activeTab === "schedules" ? "default" : "outline"}
          onClick={() => setActiveTab("schedules")}
        >
          Schedules
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {activeTab === "departments"
              ? "Departments"
              : activeTab === "staff"
                ? "Staff"
                : "Schedules"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : (
            <>
              {activeTab === "departments" && renderDepartments()}
              {activeTab === "staff" && renderStaff()}
              {activeTab === "schedules" && renderSchedules()}
            </>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 text-sm text-gray-500">
        <p>
          This demo shows data from the Supabase database tables created for the
          timetable management system.
        </p>
        <p>Click the buttons above to view different tables.</p>
      </div>
    </div>
  );
};

export default DatabaseDemo;
