const { createClient } = require('@supabase/supabase-js');
const ENV = "test";
require('dotenv').config({ path: `${__dirname}/../.env.${ENV}` });
const supabase_url = process.env.SUPABASE_URL
const supabase_key = process.env.SUPABASE_KEY
const supabase = createClient(supabase_url, supabase_key);

module.exports = { supabase }