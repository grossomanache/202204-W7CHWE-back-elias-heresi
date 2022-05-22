const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { app } = require("..");
const connectDB = require("../../database");
const User = require("../../database/models/User");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a post request, directed to the 'users/register' url", () => {
  describe("When it receives a request with a new user", () => {
    test("Then it should respond with a 201 status and and object containing the user's information", async () => {
      const { body } = await request(app)
        .post("/users/register")
        .send({ username: "test", name: "test", password: "test" })
        .expect(201);
      expect(body.user).toHaveProperty("username", "test");
    });
  });
});
