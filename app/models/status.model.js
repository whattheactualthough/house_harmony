const {createClient} = require("@supabase/supabase-js");
const {supabase_url, supabase_key} = require("../../db/connection")

async function selectStatus() {
    try {
      const supabase = createClient(supabase_url, supabase_key);
      const { data, error } = await supabase
        .from('status')
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


  module.exports = {selectStatus}