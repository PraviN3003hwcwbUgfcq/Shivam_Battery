// Builds the site's logo files from the logo images in brand/.
// Usage: node scripts/make-logo.mjs
//
// Sources:
//   brand/logo-source.webp       – the "S" mark on its own
//   brand/logo-full-source.webp  – mark with the "shivam battery" wordmark underneath
//
// Outputs:
//   public/images/logo/logo-navy.png, logo-white.png         – mark, transparent background
//   public/images/logo/wordmark-navy.png, wordmark-white.png – "shivam battery" text, transparent
//   public/favicon.png, public/apple-touch-icon.png          – white mark on a navy tile

import { mkdir } from 'node:fs/promises'
import sharp from 'sharp'

const MARK_SOURCE = 'brand/logo-source.webp'
const FULL_SOURCE = 'brand/logo-full-source.webp'
// The wordmark sits below this line in the full logo image.
const WORDMARK_TOP = 560

const NAVY = { r: 0x02, g: 0x0e, b: 0x60 }
const WHITE = { r: 255, g: 255, b: 255 }

// Flattened, trimmed copy of the source (or a horizontal band of it).
async function cutOut(source, top = 0) {
  let img = sharp(source).flatten({ background: '#ffffff' })
  if (top) {
    const { width, height } = await sharp(source).metadata()
    img = img.extract({ left: 0, top, width, height: height - top })
  }
  // sharp can't extract and trim in one pipeline, so trim separately.
  const band = await img.png().toBuffer()
  return sharp(band).trim({ background: '#ffffff', threshold: 30 }).png().toBuffer()
}

// Turn the dark artwork into an alpha mask, so it can be drawn in any colour.
async function mask(input, resize) {
  const { data, info } = await sharp(input)
    .resize({ ...resize, background: '#ffffff' })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const alpha = Buffer.alloc(info.width * info.height)
  for (let i = 0; i < alpha.length; i++) {
    // Pixels darker than the paper become opaque; soft edges stay anti-aliased.
    const ink = (235 - data[i]) / (235 - 40)
    alpha[i] = Math.round(Math.min(1, Math.max(0, ink)) * 255)
  }
  return { alpha, width: info.width, height: info.height }
}

async function tinted({ alpha, width, height }, color) {
  const rgba = Buffer.alloc(width * height * 4)
  for (let i = 0; i < alpha.length; i++) {
    rgba[i * 4] = color.r
    rgba[i * 4 + 1] = color.g
    rgba[i * 4 + 2] = color.b
    rgba[i * 4 + 3] = alpha[i]
  }
  return sharp(rgba, { raw: { width, height, channels: 4 } }).png()
}

async function appIcon(markImage, size, file) {
  const inner = Math.round(size * 0.62)
  const mark = await (await tinted(await mask(markImage, { width: inner, height: inner, fit: 'contain' }), WHITE)).toBuffer()
  const radius = Math.round(size * 0.22)
  const tile = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#020e60"/></svg>`,
  )
  await sharp(tile).composite([{ input: mark, gravity: 'center' }]).png().toFile(file)
}

await mkdir('public/images/logo', { recursive: true })

const markImage = await cutOut(MARK_SOURCE)
const markMask = await mask(markImage, { width: 256, height: 256, fit: 'contain' })
await (await tinted(markMask, NAVY)).toFile('public/images/logo/logo-navy.png')
await (await tinted(markMask, WHITE)).toFile('public/images/logo/logo-white.png')

// 96px tall = sharp at the 24–32px it is shown at, on high-density screens.
const wordImage = await cutOut(FULL_SOURCE, WORDMARK_TOP)
const wordMask = await mask(wordImage, { height: 96 })
await (await tinted(wordMask, NAVY)).toFile('public/images/logo/wordmark-navy.png')
await (await tinted(wordMask, WHITE)).toFile('public/images/logo/wordmark-white.png')

await appIcon(markImage, 64, 'public/favicon.png')
await appIcon(markImage, 180, 'public/apple-touch-icon.png')
console.log(`Logo files written. Wordmark: ${wordMask.width}x${wordMask.height}px`)
