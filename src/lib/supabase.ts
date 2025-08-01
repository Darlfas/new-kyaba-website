import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://gtkmoxkhnwjmssyqfugp.supabase.co';
const supabaseKey = 'sb_publishable_WZSJs5aw56CDErvf9Vw31Q_jQ3r0jcj';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };