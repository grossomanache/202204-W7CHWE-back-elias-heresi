const { mockedUser, mockedRegister, mockedLogin } = require("../mocks/mocks");
const { registerUser, loginUser } = require("./usersController");

const expectedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJwYWMiLCJpYXQiOjE2NTMxNjUxNzl9.JmE1DCHI8c5LIdfSclkMEp_Y8xOVI6dsyVqwWtIeyuE";

jest.mock("bcrypt", () => ({
  ...jest.requireActual("bcrypt"),
  hash: () => mockedUser.password,
  compare: () => jest.fn().mockResolvedValueOnce(true),
}));

jest.mock("../../database/models/User", () => ({
  findOne: jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true),
  create: jest.fn().mockResolvedValue(mockedRegister),
}));

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: () => expectedToken,
}));

describe("Given the registerUser controller", () => {
  describe("When instantiated with the new user {name: Larry, username: larry, password: the-boy}", () => {
    test("Then a response with status 201 and an object with a message will be received", async () => {
      const req = { body: mockedRegister };
      const expectedStatus = 201;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();

      await registerUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalled();
    });
  });
});

describe("Given the loginUser function", () => {
  describe("When instantiated with a request containing a correct username and password", () => {
    test("Then a response with the status 200, containing a token will be received", async () => {
      const req = { body: mockedLogin };
      const expectedStatus = 200;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenLastCalledWith({ token: expectedToken });
    });
  });
});
