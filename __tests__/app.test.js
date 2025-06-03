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
          expect(typeof task.id).toBe("number");
          expect(typeof task.created_at).toBe("string");
          expect(typeof task.task_name).toBe("string");
          expect(typeof task.description).toBe("string");
          expect(typeof task.is_urgent).toBe("boolean");
          expect(typeof task.due_date instanceof Date).toBe();
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
