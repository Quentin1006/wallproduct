import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser"
import fs from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client"
import * as url from 'url';

import Store from "./store.mjs";

const app = express();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const prisma = new PrismaClient({
  log: [{
    emit: 'event',
    level: 'query',
  }],
})

prisma.$on('query', (e) => {
  console.log("------------------------------")
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
  console.log("------------------------------")
})

const tokenStore = new Store({ expirationTimeInMin: 1 })

const port = 8088;

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
};

const db = {}

app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, "public")));

const sleep = (time) => new Promise(resolve => { setTimeout(resolve, time) })

const verifyAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!tokenStore.verifyToken(token)) {
    throw new Error("UnauthorizedError");
  }
  next();
};

app.get("/authorize", async (req, res) => {
  
  const htmlContent = await fs.readFile(path.resolve(__dirname, "views/authorize.html"), "utf8")
  res.set({"Content-Type": "text/html; charset=UTF-8"})
  
  res.status(200).send(htmlContent)
})

app.post("/authorize", async (req, res) => { 
  try {
    const { login, pwd } = req.body
  const tokenInfos = tokenStore.authorize(login, pwd)
  res.json(tokenInfos)
  } catch(err) {
    res.status(401).send({error: true, reason: "UNAUTHORIZED"})
  }
  
})

app.get("/users", verifyAuth, async (req, res) => {
  
  await sleep(3500)
  const users = JSON.parse(await fs.readFile(path.resolve(__dirname, "./users.json"), "utf-8"));

  res.json(users)
});

app.get("/v2/users", verifyAuth, async (req, res) => {
  console.log("reaching v2")
  const users = await prisma.user.findMany({})
  res.json(users)
});

app.get("/users/:id", verifyAuth, async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.findFirst({ where: { id}})
  res.json(user)
});

app.get("/products", async (req, res) => {
  // await sleep(4000)
  const { search, brand, year, color } = req.query;
  const searchWhere = search ? { OR: [{ name: { contains: search, mode: "insensitive" }}, { brand: { contains: search, mode: "insensitive" }}]} : {}
  
  
  const products = await prisma.product.findMany({
    where: 
      { ...searchWhere, brand: { startsWith: brand, mode: "insensitive" }, year: { gte: Number(year || 0) }, color: { equals: color}}
  })
  res.json({products})

});

function error(err, req, res, next) {
  console.error(err.stack);

  if (err.message === "UnauthorizedError") {
    res.status(401).send({
      message: "UnauthorizedError",
    });
  } else {
    res.json({ message: "Internal Server Error", status: "500" });
  }
}

app.use(error);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
