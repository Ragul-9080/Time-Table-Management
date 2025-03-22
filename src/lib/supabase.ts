import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Create a singleton Supabase client
let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or Anon Key is missing");
    return null;
  }

  try {
    supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
    return supabaseClient;
  } catch (error) {
    console.error("Error initializing Supabase client:", error);
    return null;
  }
}
