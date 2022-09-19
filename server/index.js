const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const app = express();

const port = 8088;

const corsOptions = {
  origin: "http://localhost:3000",
};

const dbPath = path.resolve(__dirname, "./products.json");
const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

app.use(cors(corsOptions));
app.use(morgan("combined"));

app.use(express.static(path.resolve(__dirname, "public")));

const verifyAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token !== "at-1234") {
    throw new Error("UnauthorizedError");
  }
  next();
};

app.get("/user/:id", verifyAuth, (req, res) => {
  res.json({
    name: "quentin",
    lastname: "sahal",
    age: 31,
  });
});

app.get("/products", (req, res) => {
  const query = req.query;
  if (Object.keys(query).length === 0) {
    res.json({ products: db });
    return;
  }

  const products = db.filter((p) => {
    let isMatch = false;

    if (query.brand) {
      isMatch = Boolean(p.brand.match(new RegExp(query.brand, "gi")));
    }

    if (query.name) {
      isMatch = Boolean(p.name.match(new RegExp(query.name, "gi")));
    }

    if (query.year) {
      isMatch = p.year === Number(query.year);
    }

    if (query.color) {
      isMatch = Boolean(p.color.match(new RegExp(query.color, "gi")));
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
