const { generalError, notFoundError } = require("./errors");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given the generalError middleware", () => {
  describe("When instantiated with an error with code 999 and message 'Full error'", () => {
    test("Then a response with status 999 and message: Full error will be returned", () => {
      const expectedStatus = 999;
      const expectedMessage = "Full error";
      const expectedBody = { error: true, message: expectedMessage };
      const inputtedError = {
        code: expectedStatus,
        message: expectedMessage,
      };
      generalError(inputtedError, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedBody);
    });
  });
});

describe("Given the notFoundError middleware", () => {
  describe("When instantiated with a response", () => {
    test("Then it should call the response json method with the message 'Endpoint not found'", () => {
      const expectedStatus = 404;

      notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});
