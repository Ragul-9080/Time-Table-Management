import React from "react";
import { cn } from "../lib/utils";

interface TimetableHeaderProps {
  title?: string;
  description?: string;
}

const TimetableHeader = ({
  title = "Timetable Management System",
  description = "A streamlined period-based timetable tool for quick schedule information access",
}: TimetableHeaderProps) => {
  return (
    <header className="w-full bg-slate-50 border-b border-slate-200 py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          {title}
        </h1>
        <p className="text-slate-600 text-lg max-w-3xl">{description}</p>
      </div>
    </header>
  );
};

export default TimetableHeader;
