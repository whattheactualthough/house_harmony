
const {supabase} = require("../../db/supabaseConfig");

async function selectStatus() {
    try {
    
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