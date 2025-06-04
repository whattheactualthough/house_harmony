const { createClient } = require("@supabase/supabase-js");
const { supabase_url, supabase_key } = require("../../db/connection");
//write select query fo tasks table with supabase 
//tasks table should return id, task_name, description,is_urgent, due_date,
// task_speific_date, is_recurring, recurring_frequency, room_name(foreign key from rooms),
// created_by_user(foreign key from users), assined _to_user(foreign key from users),
//status(fore_key from status), task_desitability_level(foreign key from task_desirability_level)
//created_on, updated_on
// and return the data in an array of objects for a group named "House Harmony Rd"
const supabase = createClient(supabase_url, supabase_key);

exports.selectAllTasksForGroup = async (groupName) => {
  const { data, error } = await supabase
    .from("tasks")
    .select(`
            id,
            task_name,
            description,
            is_urgent,
            due_date,
            task_specific_date,
            is_recurring,
            recurring_frequency,
            rooms(room_name),
            users!created_by_user_id(user_name),          
            status(description),
            task_desirability_level(level,points),          
            created_at,
            updated_at
        `)
    .eq('users.group_name', groupName);

  if (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
  return data;
}

exports.addTask = async (task) => {
  !assigned_to_user_id(user_name)
    .insert(task);

  if (error) {
    console.error("Error adding task:", error);
    throw error;
  }
  return data;
}

exports.selectTasksAssignedToUser = async (userId) => {

  const { data, error } = await supabase
    .from("tasks")
    .select(`
            id,
            task_name,
            description,
            is_urgent,
            due_date,
            task_specific_date,
            is_recurring,
            recurring_frequency,
            rooms(room_name),          
            users!assigned_to_user_id(user_name), 
            status(description),
            task_desirability_level(level,points),          
            created_at,
            updated_at
        `)
    .eq('assigned_to_user_id', userId);

  if (error) {
    console.error("Error fetching tasks assigned to user:", error);
    throw error;
  }
  return data;
}

//get sum of points for assigned user from task_desirability_level and tasks table
// and status_id should be 4
exports.selectTotalPointsForUser = async (userId) => {

  const { data, error } = await supabase
    .from("tasks")
    .select(`
            task_desirability_level(points)
        `)
    .eq('assigned_to_user_id', userId)
    .eq('status_id', 4);

  if (error) {
    console.error("Error fetching total points for user:", error);
    throw error;
  }

  // Calculate the sum of points
  const totalPoints = data.reduce((sum, task) => sum + task.task_desirability_level.points, 0);

  return totalPoints;
}

/*const task = {
    task_name: "Clean Fridge",
    description: "This is for Kitchen",
    is_urgent: false,
    due_date: "2025-06-10",
    task_specific_date: null,
    is_recurring: false,
    recurring_frequency: null,
    room_id: 1,
    created_by_user_id: 1, // Assuming user ID 1 exists
    assigned_to_user_id: 6, // Assuming user ID 2 exists
    status_id: 1, // Assuming status ID 1 exists
    task_desirability_level_id: 1 // Assuming desirability level ID 1 exists
};  */

