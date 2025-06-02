const {createClient} = require("@supabase/supabase-js");
const {supabase_url, supabase_key} = require("./connection")

async function getTasks() {
    try {
      const supabase = createClient(supabase_url, supabase_key);
      const { data, error } = await supabase
        .from('tasks')
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


  module.exports = {getTasks}