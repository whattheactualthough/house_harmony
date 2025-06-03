//add users to users table in supabase
const { createClient } = require("@supabase/supabase-js");
const { supabase_url, supabase_key } = require("./connection");

async function addUsers(users) {
    try {
        const supabase = createClient(supabase_url, supabase_key);
        const { data, error } = await supabase
            .from("users")
            .insert(users);

        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error("Error adding users:", error);
        throw error;
    }
}

/*const users = [{user_name:"Gustavo",group_name:"House Harmony Rd"},
    {user_name:"Yasin",group_name:"House Harmony Rd"},
    {user_name:"Louie",group_name:"House Harmony Rd"}]

  addUsers(users)
  .then(data => console.log("Users added successfully:", data))  
  .catch(error => console.error("Error adding users:", error));*/

module.exports = { addUsers };