import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const URL  = () => process.env.NEXT_PUBLIC_SUPABASE_URL!;
const KEY  = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Lazy singleton — avoids build-time error when env vars are placeholder strings
let _client: SupabaseClient<Database> | null = null;

export function getSupabase(): SupabaseClient<Database> {
  if (!_client) _client = createClient<Database>(URL(), KEY());
  return _client;
}

// Server-side client for API routes — same anon key, no service role needed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createServerClient(): SupabaseClient<any> {
  return createClient(URL(), KEY());
}
