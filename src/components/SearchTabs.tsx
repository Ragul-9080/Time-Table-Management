import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StaffSearchForm from "./StaffSearchForm";
import StudentSearchForm from "./StudentSearchForm";

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
  staffList = [
    "John Smith",
    "Jane Doe",
    "Robert Johnson",
    "Emily Williams",
    "Michael Brown",
  ],
  departmentList = [
    { id: "cs", name: "Computer Science" },
    { id: "math", name: "Mathematics" },
    { id: "eng", name: "Engineering" },
    { id: "sci", name: "Science" },
    { id: "arts", name: "Arts & Humanities" },
  ],
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

  const handleStaffSearch = (values: any) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock results for staff search
      const mockResults: SearchResult[] = [
        {
          department: "Computer Science",
          subject: "Introduction to Programming",
          staffName: values.staffName,
          status: "assigned",
        },
      ];

      onSearchResults(mockResults);
      setIsLoading(false);
    }, 1000);
  };

  const handleStudentSearch = (values: any) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Find department name from id
      const departmentName =
        departmentList.find((d) => d.id === values.department)?.name ||
        "Unknown";

      // Mock results for student search
      const mockResults: SearchResult[] = [
        {
          department: departmentName,
          subject: "Advanced Algorithms",
          staffName: "Dr. Jane Smith",
          status: "assigned",
        },
      ];

      onSearchResults(mockResults);
      setIsLoading(false);
    }, 1000);
  };

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
              staffList={staffList}
              daysList={daysList}
              periodsList={periodsList}
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
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchTabs;
