const fs = require("fs");
const path = require("path");

const MAX_SIZE_STR = 8;
const MIN_SIZE_STR = 5;

const MAX_NAME_NB = 15;
const MIN_NAME_NB = 5;

const BRANDS = ["Apple", "Sony", "Google", "Samsung", "Xiaomi"];
const COLORS = ["white", "red", "blue", "black"];

const genRandNb = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const generateRandomName = () => {
  const letters = "abcdefghijklmnopqrstuv";
  const strSize = genRandNb(MIN_SIZE_STR, MAX_SIZE_STR);

  let name = "";
  for (let i = 0; i < strSize; i++) {
    const rand = genRandNb(0, letters.length - 1);
    const randLetter = letters[rand];
    name += randLetter;
  }

  const randNb = genRandNb(MIN_NAME_NB, MAX_NAME_NB);
  return (name += ` ${randNb}`);
};

const main = () => {
  const products = [];
  for (let i = 0; i < 200; i++) {
    const randNbForBrand = genRandNb(0, BRANDS.length - 1);
    const randNbForYear = genRandNb(2018, 2023);
    const randNbForColor = genRandNb(0, COLORS.length - 1);
    const randNbForPrice = genRandNb(650, 1800);
    products.push({
      name: generateRandomName(),
      brand: BRANDS[randNbForBrand],
      year: randNbForYear,
      color: COLORS[randNbForColor],
      price: randNbForPrice,
      link: `http://localhost:8088/image_${i}.webp`,
    });
  }
  fs.writeFileSync(
    path.resolve(__dirname, "./products.json"),
    JSON.stringify(products, null, 2)
  );
};

main();
