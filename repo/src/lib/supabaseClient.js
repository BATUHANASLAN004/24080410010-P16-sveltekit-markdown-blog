import { createClient } from '@supabase/supabase-js';

// .env dosyasından Supabase bağlantı bilgilerini alıyoruz
// SvelteKit'te public değişkenler import.meta.env.VITE_ veya public ortam değişkenleriyle alınabilir.
// SvelteKit ortamında $env/dynamic/public veya $env/static/public kullanılır.
import { env } from '$env/dynamic/public';

const supabaseUrl = env.PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
