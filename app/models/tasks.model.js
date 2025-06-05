const { createClient } = require("@supabase/supabase-js");
const { supabase_url, supabase_key } = require("../../db/connection");
const supabase = createClient(supabase_url, supabase_key);

async function selectAllTasksForGroup(groupName) {
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
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
    `,
    )
    .eq("users.group_name", groupName)
    .order("due_date", { ascending: true })
    .order("task_specific_date", { ascending: true });

  if (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
  return data;
}

async function addTask(task) {
  const { data, error } = await supabase.from("tasks").insert(task).select("*");
  if (error) {
    console.error("Error adding task:", error);
    throw error;
  }
  return data;
}

async function selectTasksAssignedToUser(userId) {
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
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
    `,
    )
    .eq("assigned_to_user_id", userId)
    .order("due_date", { ascending: true })
    .order("task_specific_date", { ascending: true });

  if (error) {
    console.error("Error fetching tasks assigned to user:", error);
    throw error;
  }
  return data;
}

async function selectTotalPointsForUser(userId) {
  const { data, error } = await supabase
    .from("tasks")
    .select(`task_desirability_level(points)`)
    .eq("assigned_to_user_id", userId)
    .eq("status_id", 4);

  if (error) {
    console.error("Error fetching total points for user:", error);
    throw error;
  }

  const totalPoints = data.reduce(
    (sum, task) => sum + task.task_desirability_level.points,
    0,
  );

  return totalPoints;
}

async function updateAssignedUser(taskId, newAssignedUserId) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ assigned_to_user_id: newAssignedUserId })
    .eq("id", taskId);

  if (error) {
    console.error("Error updating assigned user:", error);
    throw error;
  }
  return data;
}

async function selectTasksForRoom(roomId) {
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
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
    `,
    )
    .eq("room_id", roomId)
    .order("due_date", { ascending: true })
    .order("task_specific_date", { ascending: true });

  if (error) {
    console.error("Error fetching tasks for room:", error);
    throw error;
  }
  return data;
}

async function selectAllIncompleteTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
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
    `,
    )
    .eq("status_id", 5);

  if (error) {
    console.error("Error fetching incomplete tasks:", error);
    throw error;
  }
  return data;
}

async function selectTasksByStatusId(statusId) {
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
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
    `,
    )
    .eq("status_id", statusId)
    .order("due_date", { ascending: true })
    .order("task_specific_date", { ascending: true });
  if (error) {
    console.error("Error fetching tasks by status ID:", error);
    throw error;
  }
  return data;
}

async function selectTaskById(taskId) {
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
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
    `,
    )
    .eq("id", taskId)
    .single();

  if (error) {
    console.error("Error fetching task by ID:", error);
    throw error;
  }
  return data;
}

async function updateTaskStatus(taskId, newStatusId) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status_id: newStatusId })
    .eq("id", taskId)
    .select("*");

  if (error) {
    console.error("Error updating task status:", error);
    throw error;
  }

  if (newStatusId === 4) {
    createNewTask(taskId);
  }
  return data;
}

async function createNewTask(taskId) {
  const completedTask = await selectTaskById(taskId);
  const dueDate = new Date(completedTask.due_date);
  dueDate.setDate(dueDate.getDate() + completedTask.recurring_frequency);

  const newTask = {
    task_name: completedTask.task_name,
    description: completedTask.description,
    is_urgent: completedTask.is_urgent,
    due_date: dueDate.toISOString().split("T")[0],
    task_specific_date: null,
    is_recurring: completedTask.is_recurring,
    recurring_frequency: completedTask.recurring_frequency,
    room_id: completedTask.room_id,
    created_by_user_id: completedTask.created_by_user_id,
    status_id: 1,
    task_desirability_level_id: 1,
  };

  await addTask(newTask);
}

async function deleteTaskById(taskId) {
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);

  if (error) {
    console.error("Error deleting task by ID:", error);
    throw error;
  }
  return data;
}

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
  deleteTaskById,
};
