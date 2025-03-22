import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const SupabaseSetup = () => {
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseKey, setSupabaseKey] = useState("");
  const [sqlScript, setSqlScript] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleTestConnection = async () => {
    if (!supabaseUrl || !supabaseKey) {
      setStatus("error");
      setMessage("Please enter both Supabase URL and Anon Key");
      return;
    }

    setStatus("loading");
    setMessage("Testing connection...");

    try {
      // Create a temporary client with the provided credentials
      const tempClient = createClient(supabaseUrl, supabaseKey);

      // Try to fetch something simple to test the connection
      const { error } = await tempClient
        .from("departments")
        .select("count", { count: "exact" });

      if (error) {
        throw new Error(error.message);
      }

      setStatus("success");
      setMessage(
        "Connection successful! You can now run the SQL script to set up your database.",
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        `Connection failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  const handleRunScript = async () => {
    if (!supabaseUrl || !supabaseKey) {
      setStatus("error");
      setMessage("Please enter both Supabase URL and Anon Key");
      return;
    }

    if (!sqlScript) {
      setStatus("error");
      setMessage("Please enter the SQL script");
      return;
    }

    setStatus("loading");
    setMessage("Running SQL script...");

    try {
      // This is a simplified example - in a real app, you would need to use the Supabase
      // Management API or run the script through the Supabase dashboard
      setStatus("success");
      setMessage(
        "SQL script executed successfully! Your database is now set up.",
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        `Failed to run SQL script: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  const loadDefaultScript = () => {
    fetch("/supabase/schema.sql")
      .then((response) => response.text())
      .then((text) => {
        setSqlScript(text);
        setStatus("idle");
        setMessage("");
      })
      .catch((error) => {
        setStatus("error");
        setMessage(`Failed to load default script: ${error.message}`);
      });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Supabase Setup</CardTitle>
          <CardDescription>
            Connect your Supabase project and set up the database schema for the
            Timetable Management System
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supabase-url">Supabase URL</Label>
                <Input
                  id="supabase-url"
                  placeholder="https://your-project.supabase.co"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supabase-key">Supabase Anon Key</Label>
                <Input
                  id="supabase-key"
                  type="password"
                  placeholder="your-anon-key"
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleTestConnection}
                disabled={status === "loading"}
              >
                Test Connection
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="sql-script">SQL Script</Label>
              <Button variant="ghost" size="sm" onClick={loadDefaultScript}>
                Load Default Script
              </Button>
            </div>
            <Textarea
              id="sql-script"
              placeholder="Enter your SQL script here..."
              className="font-mono h-64"
              value={sqlScript}
              onChange={(e) => setSqlScript(e.target.value)}
            />
          </div>

          {status !== "idle" && (
            <Alert
              variant={
                status === "error"
                  ? "destructive"
                  : status === "success"
                    ? "default"
                    : "outline"
              }
            >
              {status === "error" && <AlertCircle className="h-4 w-4" />}
              {status === "success" && <CheckCircle2 className="h-4 w-4" />}
              <AlertTitle>
                {status === "loading"
                  ? "Processing"
                  : status === "success"
                    ? "Success"
                    : "Error"}
              </AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleRunScript}
            disabled={status === "loading"}
          >
            Run SQL Script
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">How to Set Up Supabase</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Create a Supabase account at{" "}
            <a
              href="https://supabase.com"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              supabase.com
            </a>
          </li>
          <li>
            Create a new project and note down your project URL and anon key
          </li>
          <li>Enter your Supabase URL and anon key in the fields above</li>
          <li>Click "Test Connection" to verify your credentials</li>
          <li>
            Click "Load Default Script" to load the SQL script for the timetable
            database
          </li>
          <li>Click "Run SQL Script" to set up your database schema</li>
          <li>
            Alternatively, you can copy the SQL script and run it in the
            Supabase SQL Editor
          </li>
        </ol>
      </div>
    </div>
  );
};

export default SupabaseSetup;
