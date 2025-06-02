const {createClient} = require("@supabase/supabase-js");
const {supabase_url, supabase_key} = require("./connection")

async function getUsers() {
    try {
      const supabase = createClient(supabase_url, supabase_key);
      console.log(supabase_url, supabase_key)
      const { data, error } = await supabase
        .from('users')
        .select('*');
  
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }