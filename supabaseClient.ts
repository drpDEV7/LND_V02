
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURAÇÃO DO SUPABASE ---
// ID do projeto extraído da chave fornecida: uyhescuaotrlzjzfsbh
const supabaseUrl = 'https://uyhescuaotrlzjzfsbh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5aGVzY3Vhb3RybHpqenNmc2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzE2NTMsImV4cCI6MjA3OTU0NzY1M30.GJBpitrdab_6WeEsp6h_ZWUoG7H0EgAH2PGkSB3DkZA';

export const supabase = createClient(supabaseUrl, supabaseKey);
