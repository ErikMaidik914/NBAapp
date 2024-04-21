const request = require("supertest");
const app = require("../app");

describe("API Tests", () => {
  let userId;

  test("GET /api/users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.statussCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("POST /api/users", async () => {
    const newUer = {
      name: "test",
      team: "test",
      pictureUrl: "test",
      age: 20,
    };
    const respose = (await request(app).post("/api/users")).send(newUser);
    expect(response.statusCode).toEqual(200);
    userId = response.body.id;
  });

  test("GET /api/users/:id", async () => {
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.statussCode).toEqual(200);
    expect(response.body.name).toEqual("test");
    expect(response.body.team).toEqual("test");
    expect(response.body.pictureUrl).toEqual("test");
    expect(response.body.age).toEqual(20);
  });

  test("DELETE /api/users/:id", async () => {
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.statusCode).toEqual(200);
  });
});
