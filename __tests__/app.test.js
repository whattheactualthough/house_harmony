const endpointsJSON = require("../endpoints.json");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("");
const testData = require("");
const app = require("../app");
require("jest-sorted");
/* Set up your beforeEach & afterAll functions here */
beforeEach(() => {
  return seed();
});
afterAll(() => {
  return db.end();
});
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
        expect(body).toHaveLength(/* number of tasks in test array*/);
        body.forEach((task) => {
          expect(task).toMatchObject({
            created_at: expect.any(String),
            task_name: expect.any(String),
            description: expect.any(String),
            is_urgent: expect.any(Boolean),
            due_date: expect.any(String),
            points: expect.any(Number),
            tasks_specific_date: expect.any(String),
            is_recurring: expect.any(Boolean),
            recurring_frequency: expect.any(Number),
            room_id: expect.any(Number),
            created_by_user_id: expect.any(Number),
            assigned_to_user_id: expect.any(Number),
            status_id: expect.any(Number),
            image_id: expect.any(Number),
            updated_at: expect.any(Number),
          });
        });
      });
  });
});
describe("GET /api/images", () => {
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
  test("200: responds with an array containing all images objects", () => {
    return request(app)
      .get("/api/rooms")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(/* number of tasks in test array*/);
        body.forEach((room) => {
          expect(room).toMatchObject({
            created_at: expect.any(String),
            room_name: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});
describe("GET /api/status", () => {
  test("200: responds with an array containing all images objects", () => {
    return request(app)
      .get("/api/status")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(/* number of tasks in test array*/);
        body.forEach((status) => {
          expect(status).toMatchObject({
            created_at: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});
describe("GET /api/users", () => {
  test("200: responds with an array containing all images objects", () => {
    return request(app)
      .get("/api/user")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(/* number of tasks in test array*/);
        body.forEach((user) => {
          expect(user).toMatchObject({
            created_at: expect.any(String),
            user_name: expect.any(String),
            group_name: expect.any(String),
            img_url: expect.any(String),
            is_admin: expect.any(String),
          });
        });
      });
  });
});
