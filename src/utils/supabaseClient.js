import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL:", supabaseUrl);
  console.error("Supabase Key:", supabaseKey);
  throw new Error(
    "Supabase URL or Key is missing. Check your environment variables.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
