import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Search } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  department: z.string({
    required_error: "Please select a department",
  }),
  day: z.string({
    required_error: "Please select a day",
  }),
  period: z.string({
    required_error: "Please select a period",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface StudentSearchFormProps {
  onSearch?: (values: FormValues) => void;
  isLoading?: boolean;
}

const StudentSearchForm = ({
  onSearch = () => {},
  isLoading = false,
}: StudentSearchFormProps) => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department: "",
      day: "",
      period: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setSubmitted(true);
    onSearch(values);
  };

  // Mock data for dropdowns
  const departments = [
    { id: "cs", name: "Computer Science" },
    { id: "math", name: "Mathematics" },
    { id: "eng", name: "Engineering" },
    { id: "sci", name: "Science" },
    { id: "arts", name: "Arts & Humanities" },
  ];

  const days = [
    { id: "mon", name: "Monday" },
    { id: "tue", name: "Tuesday" },
    { id: "wed", name: "Wednesday" },
    { id: "thu", name: "Thursday" },
    { id: "fri", name: "Friday" },
  ];

  const periods = [
    { id: "1", name: "Period 1" },
    { id: "2", name: "Period 2" },
    { id: "3", name: "Period 3" },
    { id: "4", name: "Period 4" },
    { id: "5", name: "Period 5" },
    { id: "6", name: "Period 6" },
  ];

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem key={department.id} value={department.id}>
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day.id} value={day.id}>
                          {day.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Period</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {periods.map((period) => (
                        <SelectItem key={period.id} value={period.id}>
                          {period.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>

      {submitted && !isLoading && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">
            Search completed. View results below.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentSearchForm;
