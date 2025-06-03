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
        console.log(body);
        expect(body).toHaveLength(7);
        body.forEach((task) => {
          expect(task).toHaveProperty("id");
          expect(task).toHaveProperty("created_at");
          expect(task).toHaveProperty("task_name");
          expect(task).toHaveProperty("description");
          expect(task).toHaveProperty("is_urgent");
          expect(task).toHaveProperty("due_date");
          expect(task).toHaveProperty("task_specific_date");
          expect(task).toHaveProperty("is_recurring");
          expect(task).toHaveProperty("recurring_frequency");
          expect(task).toHaveProperty("room_id");
          expect(task).toHaveProperty("created_by_user_id");
          expect(task).toHaveProperty("assigned_to_user_id");
          expect(task).toHaveProperty("status_id");
          expect(task).toHaveProperty("task_complete_image_id");
          expect(task).toHaveProperty("updated_at");
          expect(task).toHaveProperty("task_image_id");
          expect(task).toHaveProperty("task_desirability_level_id");
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
        expect(body).toHaveLength(9);
        body.forEach((room) => {
          expect(room).toMatchObject({
            id: expect.any(Number),
            created_at: expect.any(String),
            room_name: expect.any(String),
            description: null,
          });
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
        expect(body).toHaveLength(4);
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
