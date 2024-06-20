import express from "express";
import { User, usersInMemory } from "../db/users";
import crypto from "crypto";

const SECRET = "we:robots"; // ofc none would upload something like a secret to github, but this is just an example now.
const hashPassword = (password: string): string => {
  return crypto.createHmac("sha256", password).update(SECRET).digest("hex");
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const newUser: User = {
      email: req.body.email,
      password: hashPassword(req.body.password), // hash the password to be able to check if it matches the one in the db
    };

    if ([...usersInMemory].some((user) => user.email === newUser.email)) {
      return res.status(409).send("Email already in use");
    }

    usersInMemory.add(newUser);
    res.status(201).send("User created successfully");
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const userToLogin: User = {
      email: req.body.email,
      password: hashPassword(req.body.password),
    };

    console.log(userToLogin);
    console.log(usersInMemory);

    if (
      ![...usersInMemory].some(
        (user) =>
          user.email === userToLogin.email &&
          user.password === userToLogin.password
      )
    ) {
      return res.status(400).send("Bad credentials");
    }

    res.status(200).send(userToLogin.email);
  } catch (error) {
    return res.sendStatus(400);
  }
};
