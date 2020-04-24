const express = require("express");
// const helmet = require("helmet");
// const cors = require("cors");
const bcrypt = require('bcryptjs');
const session = require('express-session');

const knexSessionStore = require('connect-session-knex')(session);

const usersRouter = require("./router/user-router.js");
const authRouter = require("./auth/auth-router.js");

const server = express();

const sessionConfig = {
  name: 'logged-in-user',
  secret: 'myspeshulsecret',
  cookie: {
    maxAge: 3600 * 1000,
    secure: false, // should be true in production
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore(
    {
      knex: require("./data/dbConfig.js"),
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 3600 * 1000
    }
  )
}

// global middleware
// server.use(helmet());
server.use(express.json());
// server.use(cors());
server.use(session(sessionConfig));

const restricted = require('./auth/restricted-middleware.js');

server.use(session(sessionConfig));

server.use("/api/user", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up, down, up, down" });
});

module.exports = server;
