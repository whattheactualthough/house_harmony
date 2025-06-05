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


async function selectAllTasksForGroup(groupName) {
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
    .eq('users.group_name', groupName)
    .order('due_date', { ascending: true })
    .order('task_specific_date', { ascending: true });

  if (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
  return data;
}


async function addTask(task) {

  const { data, error } = await supabase
    .from("tasks")
    .insert(task);

  if (error) {
    console.error("Error adding task:", error);
    throw error;
  }
  return data;
}


async function selectTasksAssignedToUser(userId) {

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
    .eq('assigned_to_user_id', userId)
    .order('due_date', { ascending: true })
    .order('task_specific_date', { ascending: true });

  if (error) {
    console.error("Error fetching tasks assigned to user:", error);
    throw error;
  }
  return data;
}

//get sum of points for assigned user from task_desirability_level and tasks table
// and status_id should be 4

async function selectTotalPointsForUser(userId) {

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


// update assigned_to_user_id in tasks table

async function updateAssignedUser(taskId, newAssignedUserId) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ assigned_to_user_id: newAssignedUserId })
    .eq('id', taskId);

  if (error) {
    console.error("Error updating assigned user:", error);
    throw error;
  }
  return data;
}


//get tasks for a specific room

async function selectTasksForRoom(roomId) {
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
    .eq('room_id', roomId)
    .order('due_date', { ascending: true })
    .order('task_specific_date', { ascending: true });

  if (error) {
    console.error("Error fetching tasks for room:", error);
    throw error;
  }
  return data;
}

//get incomplete tasks if the status id is 5 

async function selectAllIncompleteTasks() {
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
    .eq('status_id', 5); // status ID 5 indicates incomplete tasks

  if (error) {
    console.error("Error fetching incomplete tasks:", error);
    throw error;
  }
  return data;
}

//get tasks by status id

async function selectTasksByStatusId(statusId) {
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
    .eq('status_id', statusId)
    .order('due_date', { ascending: true })
    .order('task_specific_date', { ascending: true });
  if (error) {
    console.error("Error fetching tasks by status ID:", error);
    throw error;
  }
  return data;
}

//get tasks by Id

async function selectTaskById(taskId) {
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
            room_id,
            created_by_user_id,
            rooms(room_name),
            users!created_by_user_id(user_name),          
            status(description),
            task_desirability_level(level,points),          
            created_at,
            updated_at
        `)
    .eq('id', taskId)
    .single(); // Use single() to get a single object instead of an array

  if (error) {
    console.error("Error fetching task by ID:", error);
    throw error;
  }
  return data;
}

///update status of a task by id

async function updateTaskStatus(taskId, newStatusId) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status_id: newStatusId })
    .eq('id', taskId);

  if (error) {
    console.error("Error updating task status:", error);
    throw error;
  }

  if (newStatusId === 4) {
    //add new task based on data from the completed task
    // and set due_date to recurring_frequency
    createNewTask(taskId)

  }// status ID 4 is "Completed"
  return data;
}

async function createNewTask(taskId) {
  // Create a new task object based on the completed task
  const completedTask = await selectTaskById(taskId);
  //add 7 days to the due date of the completed task
  const dueDate = new Date(completedTask.due_date);
  dueDate.setDate(dueDate.getDate() + completedTask.recurring_frequency);
  console.log("Due Date for new task:", dueDate);

  const newTask = {
    task_name: completedTask.task_name,
    description: completedTask.description,
    is_urgent: completedTask.is_urgent,
    due_date: dueDate.toISOString().split('T')[0], // Format to YYYY-MM-DD    
    task_specific_date: null, // Resetting specific date for new task
    is_recurring: completedTask.is_recurring,
    recurring_frequency: completedTask.recurring_frequency,
    room_id: completedTask.room_id,
    created_by_user_id: completedTask.created_by_user_id,
    status_id: 1, // Assuming status ID 1 is "Pending"
    task_desirability_level_id: 1 // up for grabs
  };
  console.log("New Task Object:", newTask);
  // Insert the new task into the database
  addTask(newTask)
    .then((result) => {
      console.log("New task created successfully:", result);
    })
    .catch((error) => {
      console.error("Error creating new task:", error);
    });

}

//delete task by id
async function deleteTaskById(taskId) {
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq('id', taskId);

  if (error) {
    console.error("Error deleting task by ID:", error);
    throw error;
  }
  return data;
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

module.exports = {
  addTask,
  selectAllTasksForGroup,
  selectTasksAssignedToUser,
  selectTotalPointsForUser,
  updateAssignedUser,
  selectTasksForRoom,
  selectAllIncompleteTasks,
  selectTasksByStatusId,
  selectTaskById,
  updateTaskStatus,
  deleteTaskById
};