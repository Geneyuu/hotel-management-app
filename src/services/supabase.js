import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://wxwnndjrdvpevzbrrued.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4d25uZGpyZHZwZXZ6YnJydWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5OTI5NDQsImV4cCI6MjA3NzU2ODk0NH0.ZqI_w2DB7qHwOhGFOPpdT9zNXvm4XhwmkJrxyWrngSs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
