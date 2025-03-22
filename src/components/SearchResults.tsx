import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SearchResultItem {
  department: string;
  subject: string;
  staffName: string;
  status: "assigned" | "free" | "unassigned";
}

interface SearchResultsProps {
  results?: SearchResultItem[];
  isLoading?: boolean;
  error?: string;
  searchType?: "staff" | "student";
}

const SearchResults = ({
  results = [],
  isLoading = false,
  error = "",
  searchType = "staff",
}: SearchResultsProps) => {
  // Mock data for demonstration when no results are provided
  const defaultResults: SearchResultItem[] = [
    {
      department: "BCA",
      subject: "DBMS",
      staffName: "Mr. C. Santhosh Kumar",
      status: "assigned",
    },
    {
      department: "BSc.AI&DS",
      subject: "AI Fundamentals",
      staffName: "IBM Trainer",
      status: "assigned",
    },
    {
      department: "Computer Science",
      subject: "",
      staffName: "",
      status: "unassigned",
    },
  ];

  const displayResults = results.length > 0 ? results : defaultResults;

  if (isLoading) {
    return (
      <Card className="w-full bg-white shadow-md">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">Loading results...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full bg-white shadow-md">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (displayResults.length === 0) {
    return (
      <Card className="w-full bg-white shadow-md">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">
              No results found. Please try a different search.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">
          {searchType === "staff"
            ? "Staff Schedule Results"
            : "Class Schedule Results"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border-b">Department</th>
                <th className="p-3 border-b">Subject</th>
                <th className="p-3 border-b">Staff Name</th>
                <th className="p-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayResults.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.department}</td>
                  <td className="p-3">
                    {item.subject || (
                      <span className="text-gray-400 italic">
                        {item.status === "free"
                          ? "Free Period"
                          : "No Subject Assigned"}
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    {item.staffName || (
                      <span className="text-gray-400 italic">Not Assigned</span>
                    )}
                  </td>
                  <td className="p-3">
                    <Badge
                      className={cn(
                        "px-2 py-1",
                        item.status === "assigned"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : item.status === "free"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-100",
                      )}
                    >
                      {item.status === "assigned"
                        ? "Assigned Class"
                        : item.status === "free"
                          ? "Free Period"
                          : "Unassigned Class"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResults;
