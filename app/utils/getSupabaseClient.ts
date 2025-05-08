import { createServerClient } from "@supabase/auth-helpers-remix";
import { createClient } from "@supabase/supabase-js";
import { type Request } from "@remix-run/node";


// export function getSupabaseClient() {
//   const supabaseUrl = process.env.SUPABASE_DATABASE_URL!;
//   const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

//   if (!supabaseUrl || !supabaseAnonKey) {
//     throw new Error("Supabase environment variables are missing.");
//   }

//   return createClient(supabaseUrl, supabaseAnonKey);
// }

export function getSupabaseClient(token?: string) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    token
      ? {
          global: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      : undefined
  );
  return supabase;
}