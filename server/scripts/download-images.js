const fs = require("fs").promises
const path = require("path")
const fetch = require("node-fetch")

const GENERATE_IMAGE_TIMES = 200

const sleep = async (time) => {
  return new Promise(resolve => { setTimeout(resolve, time)})
}

const downloadImage = async (width = 250, height = 400, format = "webp") => {
  const resp = await fetch(`https://picsum.photos/${width}/${height}.${format}`)
  return await resp.buffer()
}

const storeImage = async (name, format = "webp") => {
  const bufferImage = await downloadImage()
  await fs.writeFile(path.resolve(__dirname, "../public", `${name}.${format}`), bufferImage)
}

const run = async (repeat) => {
  Array.from('x'.repeat(repeat)).forEach(async (val, idx) => {
    await sleep(idx * 100)
    await storeImage(`image_${idx}`)
  })
}

run(GENERATE_IMAGE_TIMES)