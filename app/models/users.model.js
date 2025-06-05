
const { supabase } = require("../../db/supabaseConfig");


async function selectUsers() {


    const { data, error } = await supabase.from("users").select("*");

    if (error) {
        console.error("Error fetching users:", error);
        throw error;
    }

    return data;
}

async function addUsers(users) {

    const { data, error } = await supabase
        .from("users")
        .insert(users);

    if (error) {
        console.error("Error adding users:", error);
        throw error;
    }
    return data;

}

/*const users = [{user_name:"Gustavo",group_name:"House Harmony Rd"},
    {user_name:"Yasin",group_name:"House Harmony Rd"},
    {user_name:"Louie",group_name:"House Harmony Rd"}]*/






module.exports = { addUsers, selectUsers };

