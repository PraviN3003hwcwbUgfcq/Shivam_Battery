// Turns raw product photos into consistent, light WebP files for the product cards.
// Usage: node scripts/optimize-images.mjs <input-folder> [output-folder]
// Each file keeps its base name, e.g. exide-car.jpg -> public/images/products/exide-car.webp

import { readdir, mkdir } from 'node:fs/promises'
import { join, parse, resolve } from 'node:path'
import sharp from 'sharp'

const [input, output = 'public/images/products'] = process.argv.slice(2)
if (!input) {
  console.error('Usage: node scripts/optimize-images.mjs <input-folder> [output-folder]')
  process.exit(1)
}

// Same aspect ratio as the card artwork (240 x 196).
const CANVAS = { width: 600, height: 490 }
const BOX = { width: 540, height: 430 }
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }

await mkdir(output, { recursive: true })
const files = (await readdir(input)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))

for (const file of files) {
  const name = parse(file).name
  const trimmed = await sharp(join(input, file))
    .flatten({ background: WHITE })
    .trim({ background: '#ffffff', threshold: 12 })
    .toBuffer()

  const fitted = await sharp(trimmed).resize({ ...BOX, fit: 'inside' }).toBuffer({ resolveWithObject: true })
  const { width, height } = fitted.info
  const left = Math.round((CANVAS.width - width) / 2)
  const top = Math.round((CANVAS.height - height) / 2)

  const out = resolve(output, `${name}.webp`)
  const info = await sharp(fitted.data)
    .extend({ top, bottom: CANVAS.height - height - top, left, right: CANVAS.width - width - left, background: WHITE })
    .webp({ quality: 82 })
    .toFile(out)
  console.log(`${name}.webp  ${Math.round(info.size / 1024)} KB`)
}
