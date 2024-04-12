export const shouldBeLoggedin = (req, res) => {
  res.status(200).json({ message: "Hello, User!" });
};

export const shouldBeAdmin = (req, res) => {
  res.status(200).json({ message: "Hello, Admin!" });
};
