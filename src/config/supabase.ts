import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ilmufbxfsvyhpaqwdyxg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsbXVmYnhmc3Z5aHBhcXdkeXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyNTk3NzcsImV4cCI6MjAzMzgzNTc3N30.XsOwbpsLN4lH6OLGR1J4jdGK-n1kOZOJhXH01MwiyPo';

export const supabase = createClient(supabaseUrl, supabaseKey);