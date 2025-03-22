import React, { useState } from "react";
import TimetableHeader from "./TimetableHeader";
import SearchTabs from "./SearchTabs";
import SearchResults from "./SearchResults";

import { Button } from "@/components/ui/button";

interface SearchResultItem {
  department: string;
  subject: string;
  staffName: string;
  status: "assigned" | "free" | "unassigned";
}

const Home = () => {
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<"staff" | "student">("staff");
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Days and periods lists
  const daysList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const periodsList = [
    "Period 1",
    "Period 2",
    "Period 3",
    "Period 4",
    "Period 5",
    "Period 6",
    "Period 7",
    "Period 8",
  ];

  const handleSearchResults = (
    results: any[],
    type: "staff" | "student" = "staff",
  ) => {
    // Transform the results to match SearchResultItem interface
    const transformedResults: SearchResultItem[] = results.map((result) => ({
      department: result.department || "",
      subject: result.subject || "",
      staffName: result.staffName || "",
      status: result.status || "unassigned",
    }));

    setSearchResults(transformedResults);
    setSearchType(type);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <TimetableHeader
        title="Timetable Management System"
        description="A streamlined period-based timetable tool for quick schedule information access"
      />

      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="space-y-8">
          <SearchTabs
            onSearchResults={(results) => {
              setIsLoading(true);
              handleSearchResults(results);
              setIsLoading(false);
            }}
            daysList={daysList}
            periodsList={periodsList}
          />

          {hasSearched && (
            <div className="transition-all duration-300 ease-in-out">
              <SearchResults
                results={searchResults}
                isLoading={isLoading}
                searchType={searchType}
              />
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">About This System</h2>
            <p className="text-gray-600 mb-4">
              The Timetable Management System provides quick access to schedule
              information for both staff and students. Use the search tabs above
              to find information about class assignments, subjects, and free
              periods.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">For Staff</h3>
                <p className="text-sm text-gray-700">
                  Search by your name, day, and period to view your teaching
                  schedule, including subjects and free periods.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">
                  For Students
                </h3>
                <p className="text-sm text-gray-700">
                  Search by department, day, and period to find information
                  about classes, including subjects and assigned staff.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">
                Timetable Management System
              </h3>
              <p className="text-slate-300 text-sm">
                A streamlined scheduling solution
              </p>
            </div>
            <div className="text-slate-300 text-sm">
              &copy; {new Date().getFullYear()} Education Department. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
