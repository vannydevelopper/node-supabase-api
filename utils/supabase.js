const { createClient } = require('@supabase/supabase-js');
const { supabaseUrl, supabaseAnonKey } = require('./index')

const supabase = createClient(supabaseUrl, supabaseAnonKey)

module.exports={
    supabase
}