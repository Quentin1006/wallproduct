import { PrismaClient } from '@prisma/client'
import { faker } from "@faker-js/faker"
import path from "path"

import { encodeImageToBlurhash } from "./create-hash-from-image.js"

import * as url from 'url';

faker.seed(123);

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const SERVER_DOMAIN = "http://localhost:8088"
const MAX_SIZE_STR = 8
const MIN_SIZE_STR = 5

const MAX_NAME_NB = 15
const MIN_NAME_NB = 5

const BRANDS = ["Apple", "Sony", "Google", "Samsung", "Xiaomi"]
const COLORS = ["white", "red", "blue", "black"]

const prisma = new PrismaClient()

const genRandNb = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
}

const generateRandomName = () => {
  const vowels = "aeiou"
  const consonnant = "bdfhlmrst"
  const strSize = genRandNb(MIN_SIZE_STR, MAX_SIZE_STR)

  let name = ""
  for (let i = 0; i < strSize; i++) {

    const vowelOrCons = genRandNb(0, 10) > 3 ? vowels : consonnant
    const rand = genRandNb(0, vowelOrCons.length - 1)
    const randLetter = vowelOrCons[rand]
    name += randLetter
  }

  const randNb = genRandNb(MIN_NAME_NB, MAX_NAME_NB)
  return (name += ` ${randNb}`)
}

async function populateUsers () {
  for (let i = 0; i < 5000; i++) {
  
    const sex = faker.name.sex()
    const firstName = faker.name.firstName(sex)
    const lastName = faker.name.lastName()
    const email = `${faker.internet.email(firstName, lastName)}`.toLowerCase()
  
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email: email,
        first_name: firstName,
        last_name: lastName,
        gender: sex
      },
    })
    }
} 

async function populateProducts () {
  await prisma.product.deleteMany({}).catch(err => console.log({ err }))
  for (let i = 0; i < 200; i++) {
    const name = generateRandomName()
    const randNbForBrand = genRandNb(0, BRANDS.length - 1)
    const brand = BRANDS[randNbForBrand]
    const randNbForYear = genRandNb(2018, 2023)
    const randNbForColor = genRandNb(0, COLORS.length - 1)
    const randNbForPrice = genRandNb(650, 1800)
    const daysSinceLaunch = genRandNb(0, 600)
    const sold = genRandNb(300, 30000)
    const hash = await encodeImageToBlurhash(path.resolve(__dirname, `../../public/image_${i}.webp`))

    await prisma.product.upsert({
      where: { name_brand: { brand, name}},
      update: {},
      create: {
        name,
        brand,
        year: randNbForYear,
        color: COLORS[randNbForColor],
        price: randNbForPrice,
        link: `${SERVER_DOMAIN}/image_${i}.webp`,
        daysSinceLaunch,
        sold,
        hash,
      }
    })
  }

}

async function populateContents () {
  await prisma.content.deleteMany({}).catch(err => console.log({ err }))
  const user = await prisma.user.findFirst({})
  await prisma.content.create({
    data: {
      text: "hello",
      authorId: user.id,
      keywords: {
        connectOrCreate: [{
          where: {
            name: "keyA"
          },
          create: {
            name: "keyA"
          }
        }, {
          where: {
            name: "keyB"
          },
          create: {
            name: "keyB"
          }
        }]
        
      }
    }
  })

}

export async function main() {
  Promise.all([
    populateUsers(),
    populateProducts(),
  ]).then(async () => {
    await populateContents()
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
}
  