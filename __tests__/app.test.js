const endpointsJSON = require("../endpoints.json");
const request = require("supertest");
const fs = require("fs");
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

describe.skip("GET /api/images", () => {
  test("200: responds with an array containing all images objects", () => {
    return request(app)
      .get("/api/images")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(/* number of tasks in test array*/);
        body.forEach((image) => {
          expect(image).toMatchObject({
            created_at: expect.any(String),
            img_url: expect.any(String),
          });
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
        expect(Array.isArray(body)).toBe(true);
        body.forEach((room) => {
          expect(room).toHaveProperty("id");
          expect(room).toHaveProperty("created_at");
          expect(room).toHaveProperty("room_name");
          // Accept null or string
          expect(
            typeof room.description === "string" || room.description === null,
          ).toBe(true);
        });
      });
  });
});

describe("GET /api/status", () => {
  test("200: responds with an array containing all status objects", () => {
    return request(app)
      .get("/api/status")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(5);
        body.forEach((status) => {
          expect(status).toMatchObject({
            id: expect.any(Number),
            created_at: expect.any(String),
            description: expect.any(String),
          });
        });
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
          expect(user).toMatchObject({
            created_at: expect.any(String),
            user_name: expect.any(String),
            group_name: expect.any(String),
            image_url: expect.any(String),
            is_admin: expect.any(Boolean),
          });
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
          expect(task.users).toMatchObject({ user_name: expect.any(String) });
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
        expect(body).toHaveProperty("UserId", "7");
        expect(body).toHaveProperty("Total Points");
        expect(typeof body["Total Points"]).toBe("number");
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

// ------- PATCH TESTS START HERE --------

describe("PATCH /api/tasks/:taskId/status", () => {
  test("200: updates the task status and returns the updated task", async () => {
    // Use a valid taskId from your seed/test db. Replace 1 if necessary!
    const response = await request(app)
      .patch("/api/tasks/1/status")
      .send({ status_id: 2 }) // use a valid status_id for your db
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

describe("PATCH /api/tasks/:taskId", () => {
  test("400: updates the assigned userId to new userId", () => {
    return request(app)
      .patch("/api/tasks/3")
      .send({ assigned_to_user_id: 3 })
      .expect(400)
    // .then(({data})=>{
    //   expect(data.assigned_to_user_id).toBe(6)
    // })
  })
})
//test("POST /api/images", () => {
describe("POST /api/images", () => {
  test("201: uploads an image and returns the upload data", async () => {
    const imagePath = '/home/kiran/project/house_harmony/app/images/house_harmony.png'
    const image = fs.readFileSync(imagePath);
    return request(app)
      .post("/api/images")
      .attach("image", image, "house_harmony.png")
      .expect(201)
      .then(({ body }) => {
        expect(body).toHaveProperty("path");
        expect(body.path).toBe("house_harmony.png");
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("fullPath");

      });
  })
});

<<<<<<< HEAD
// ------- NEW TESTS FOR FILTER BY ROOM --------

describe("GET /api/tasks/room/:roomId", () => {
  test("200: responds with an array of tasks for a valid roomId", () => {
    return request(app)
      .get("/api/tasks/room/1") // replace 1 with a roomId present in your test DB
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        // If there are tasks in room 1, each should include a `rooms` object
        body.forEach((task) => {
          expect(task).toHaveProperty("rooms");
          expect(task.rooms).toHaveProperty("room_name", expect.any(String));
        });
      });
  });

  test("200: responds with an empty array if no tasks exist for that room", () => {
    return request(app)
      .get("/api/tasks/room/99999") // use an ID that definitely has no tasks
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        expect(body).toEqual([]);
      });
  });
});
=======
>>>>>>> 1cc170915f0f503ad33c571dcddc178cdbd18fdf
