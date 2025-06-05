const endpointsJSON = require("../endpoints.json");
const request = require("supertest");
const app = require("../app.js");

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJSON);
      });
  });
});

describe("Error Handling General", () => {
  test("404: accessing a non-existant route", () => {
    return request(app)
      .get("/api/incorrectendpoint")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Error Not Found" });
      });
  });
});

describe("GET /api/tasks", () => {
  test("200: responds with an array containing all tasks objects", () => {
    return request(app)
      .get("/api/tasks")
      .expect(200)
      .then(({ body }) => {
        body.forEach((task) => {
          expect(task).toHaveProperty("id");
          expect(task).toHaveProperty("task_name");
          expect(task).toHaveProperty("description");
          expect(task).toHaveProperty("is_urgent");
          expect(task).toHaveProperty("due_date");
          expect(task).toHaveProperty("task_specific_date");
          expect(task).toHaveProperty("is_recurring");
          expect(task).toHaveProperty("recurring_frequency");
          expect(task).toHaveProperty("created_at");
          expect(task).toHaveProperty("updated_at");
          expect(task).toHaveProperty("users");
          expect(task).toHaveProperty("rooms");
          expect(task).toHaveProperty("status");
          expect(task).toHaveProperty("task_desirability_level");
        });
      });
  });
});

describe("GET /api/rooms", () => {
  test("200: responds with an array containing all rooms objects", () => {
    return request(app)
      .get("/api/rooms")
      .expect(200)
      .then(({ body }) => {
        body.forEach((room) => {
          expect(room).toHaveProperty("id");
          expect(room).toHaveProperty("room_name");
        });
      });
  });
});

describe("POST /api/rooms", () => {
  test("201: creates a new room", async () => {
    const res = await request(app)
      .post("/api/rooms")
      .send({
        room_name: "Garage",
        description: "Room for the car",
      })
      .expect(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.room_name).toBe("Garage");
    expect(res.body.description).toBe("Room for the car");
  });

  test("400: missing room_name returns error", async () => {
    await request(app)
      .post("/api/rooms")
      .send({ description: "No name" })
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ msg: "Missing room_name in request body" });
      });
  });
});

describe("GET /api/users", () => {
  test("200: responds with an array containing all users objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        body.forEach((user) => {
          expect(user).toHaveProperty("user_name");
        });
      });
  });
});

describe("GET /api/tasks/:userId", () => {
  test("200: responds with an array of all tasks assigned for that specific user", () => {
    return request(app)
      .get("/api/tasks/3")
      .expect(200)
      .then(({ body }) => {
        body.forEach((task) => {
          expect(task).toHaveProperty("users");
        });
      });
  });
  test("404: responds err message if user has no tasks assigned", () => {
    return request(app)
      .get("/api/tasks/99999")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "No tasks found for user" });
      });
  });
});

describe("GET /api/points/:userId", () => {
  test("200: responds with an object of total points for that user", () => {
    return request(app)
      .get("/api/points/7")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("UserId");
        expect(body).toHaveProperty("Total Points");
      });
  });
});

describe.skip("POST /api/tasks", () => {
  test("201: responds with posted task", () => {
    return request(app)
      .post("/api/tasks")
      .send({
        task_name: "delete test",
        description: "This is for Kitchen",
        is_urgent: false,
        due_date: "2025-06-10",
        task_specific_date: null,
        is_recurring: false,
        recurring_frequency: null,
        room_id: 1,
        created_by_user_id: 1,
        status_id: 2,
        task_desirability_level_id: 1,
      })
      .expect(201);
  });
});

describe.skip("DELETE /api/tasks/:taskId", () => {
  test("204: deletes a task", () => {
    return request(app).delete("/api/tasks/28").expect(204);
  });
});

describe("PATCH /api/tasks/:taskId/status", () => {
  test("200: updates the task status and returns the updated task", async () => {
    // Use a valid taskId from your seed/test db. Replace 1 if necessary!
    const response = await request(app)
      .patch("/api/tasks/1/status")
      .send({ status_id: 2 })
      .expect(200);

    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("status_id", 2);
    expect(response.body).toHaveProperty("task_name");
    expect(response.body).toHaveProperty("created_at");
  });

  test("400: returns error if status_id missing from body", async () => {
    await request(app)
      .patch("/api/tasks/1/status")
      .send({})
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ msg: "Missing status_id in request body" });
      });
  });

  test("404: returns error if task does not exist", async () => {
    await request(app)
      .patch("/api/tasks/99999/status")
      .send({ status_id: 2 })
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ msg: "Task not found" });
      });
  });

  test("400: returns error if status_id does not exist", async () => {
    await request(app)
      .patch("/api/tasks/1/status")
      .send({ status_id: 9999 })
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ msg: "Invalid status_id" });
      });
  });
});
describe.only("PATCH /api/tasks/:taskId", ()=>{
  test("400: updates the assigned userId to new userId", ()=>{
    return request(app)
    .patch("/api/tasks/3")
    .send({assigned_to_user_id: 3})
    .expect(400)
    // .then(({data})=>{
    //   expect(data.assigned_to_user_id).toBe(6)
    // })
  })
})
