const express = require("express");
// const helmet = require("helmet");
// const cors = require("cors");
const bcrypt = require('bcryptjs');

const usersRouter = require("./router/user-router.js");

const server = express();

// server.use(helmet());
server.use(express.json());
// server.use(cors());

server.use("/api/user", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up, down, up, down" });
});

module.exports = server;
