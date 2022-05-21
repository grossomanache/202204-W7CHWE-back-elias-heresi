const { mockedUser, mockedRegister } = require("../mocks/mocks");
const { registerUser } = require("./usersController");

jest.mock("bcrypt", () => ({
  ...jest.requireActual("bcrypt"),
  hash: () => mockedUser.password,
}));

jest.mock("../../database/models/User", () => ({
  findOne: () => false,
  create: () => jest.fn().mockResolvedValue(mockedRegister),
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
