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
