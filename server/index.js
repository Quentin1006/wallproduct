const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser')
const fs = require("fs");
const path = require("path");
const Store = require("./store");

const app = express();

const tokenStore = new Store({ expirationTimeInMin: 10 })

const port = 8088;

const corsOptions = {
  origin: "http://localhost:3000",
};

const dbPath = path.resolve(__dirname, "./products.json");
const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

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
  const htmlContent = await fs.promises.readFile(path.resolve(__dirname, "views/authorize.html"), "utf8")
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
  const users = JSON.parse(await fs.promises.readFile(path.resolve(__dirname, "./users.json"), "utf-8"));

  res.json(users)
});

app.get("/users/:id", verifyAuth, async (req, res) => {
  
  await sleep(3500)
  res.json({
    name: "Quentin",
    lastname: "SAHAL",
    age: 31,
  });
});

app.get("/products", async (req, res) => {
  await sleep(300)
  const query = req.query;
  if (Object.keys(query).length === 0) {
    res.json({ products: db });
    return;
  }

  const products = db.filter((p) => {
    let isMatch = false;
    let hasFailedFilter = false

    if(query.search) {
      isMatch = !hasFailedFilter && Boolean(p.brand.match(new RegExp(query.search, "gi")));
      hasFailedFilter = !isMatch
    }

    if (query.brand) {
      const brandsSelected = query.brand.split(",")
      isMatch = !hasFailedFilter && brandsSelected.some((brand) => Boolean(p.brand.match(new RegExp(brand, "gi"))))
      hasFailedFilter = !isMatch
    }

    if (query.name) {
      isMatch = !hasFailedFilter && Boolean(p.name.match(new RegExp(query.name, "gi")));
      hasFailedFilter = !isMatch
    }

    if (query.year) {
      isMatch = !hasFailedFilter && p.year === Number(query.year);
      hasFailedFilter = !isMatch
    }

    if (query.color) {
      isMatch = !hasFailedFilter && Boolean(p.color.match(new RegExp(query.color, "gi")));
      hasFailedFilter = !isMatch
    }

    return isMatch;
  });
  res.json({ products });
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
