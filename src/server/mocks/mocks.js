const mockedRegister = {
  name: "Larry",
  username: "larry",
  password: "the-boy",
};

const mockedUser = {
  name: "Larry",
  username: "larry",
  password: "xxx",
  friends: [],
  enemies: [],
};

const mockedLogin = {
  username: "2pac",
  password: "2pac",
};

const mockedRealLogin = {
  username: "2pac",
  password: "$2b$10$hfmGfNFz9s1L1xdJu5thke3NPg8cUOBGhCs/aiwaMcTLTxaQgBesW",
};

const mockedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJwYWMiLCJpYXQiOjE2NTMyMjM5NDF9.KZyZA1nHFfJQ_36pzciwUQ_SFY9pr8y3U1s8QrR-Gyk";

const mockedAuthenticationRequest = {
  headers: { authorization: `Bearer ${mockedToken}` },
};

module.exports = {
  mockedRegister,
  mockedUser,
  mockedLogin,
  mockedRealLogin,
  mockedToken,
  mockedAuthenticationRequest,
};
