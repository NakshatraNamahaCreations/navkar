import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "..", "public", "navkar-global-sourcing-logo.png");
const OUT = path.join(__dirname, "..", "public", "navkar-logo-white.png");

async function main() {
  // crop out the small wordmark/divider beneath the NGS mark + globe before
  // extracting the alpha mask — its thin strokes don't survive the closing pass
  const cropped = await sharp(SRC)
    .extract({ left: 0, top: 0, width: 1254, height: 795 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { data, info } = cropped;
  const { width, height, channels } = info;

  // build a binary mask: 1 = "not pure background" (anything visibly darker than the flat white field)
  const THRESH = 248;
  const mask = new Uint8Array(width * height);
  for (let p = 0, i = 0; i < data.length; i += channels, p++) {
    mask[p] = data[i] < THRESH ? 1 : 0;
  }

  // morphological closing (dilate then erode) with a small square kernel to
  // bridge the hollow emboss outlines into solid filled shapes
  const RADIUS = 4;
  const dilate = (src) => {
    const out = new Uint8Array(width * height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let hit = 0;
        for (let dy = -RADIUS; dy <= RADIUS && !hit; dy++) {
          const ny = y + dy;
          if (ny < 0 || ny >= height) continue;
          for (let dx = -RADIUS; dx <= RADIUS; dx++) {
            const nx = x + dx;
            if (nx < 0 || nx >= width) continue;
            if (src[ny * width + nx]) {
              hit = 1;
              break;
            }
          }
        }
        out[y * width + x] = hit;
      }
    }
    return out;
  };
  const erode = (src) => {
    const out = new Uint8Array(width * height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let all = 1;
        for (let dy = -RADIUS; dy <= RADIUS && all; dy++) {
          const ny = y + dy;
          if (ny < 0 || ny >= height) {
            all = 0;
            break;
          }
          for (let dx = -RADIUS; dx <= RADIUS; dx++) {
            const nx = x + dx;
            if (nx < 0 || nx >= width || !src[ny * width + nx]) {
              all = 0;
              break;
            }
          }
        }
        out[y * width + x] = all;
      }
    }
    return out;
  };

  const closed = erode(dilate(mask));

  const out = Buffer.alloc(width * height * 4);
  for (let p = 0, o = 0; p < mask.length; p++, o += 4) {
    out[o] = 255;
    out[o + 1] = 255;
    out[o + 2] = 255;
    out[o + 3] = closed[p] ? 255 : 0;
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .trim()
    .resize({ width: 800, withoutEnlargement: true })
    .toFile(OUT);

  console.log("Wrote", OUT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
