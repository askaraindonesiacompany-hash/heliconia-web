import type { Config } from "@netlify/functions"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async (req: Request) => {
  try {
    // Ganti 'rooms' dengan tabel yang ada di database Anda
    const { data, error } = await supabase.from('rooms').select('id').limit(1)
    
    if (error) throw error

    console.log("Supabase ping success")
    return new Response("Supabase kept alive!")
  } catch (error: any) {
    console.error("Supabase ping error:", error)
    return new Response("Error keeping Supabase alive", { status: 500 })
  }
}

// Konfigurasi cron job, misalnya "0 0 * * *" untuk berjalan setiap hari jam 00:00
export const config: Config = {
  schedule: "0 0 * * *"
}