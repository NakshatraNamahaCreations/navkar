import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, "..", "public", "8k Res");
const OUT_DIR = path.join(__dirname, "..", "public", "frames-8k-jpg");
const TOTAL_FRAMES = 240;
const TARGET_WIDTH = 1600;
const JPEG_QUALITY = 78;

function srcPathFor(n) {
  const padded3 = `frame ${String(n).padStart(3, "0")}.png`;
  const unpadded = `frame ${n}.png`;
  const jpgVariant = `frame ${n}.jpg`;
  const padded3Jpg = `frame ${String(n).padStart(3, "0")}.jpg`;
  for (const name of [padded3, unpadded, jpgVariant, padded3Jpg]) {
    const p = path.join(SRC_DIR, name);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const missing = [];
  let converted = 0;

  for (let n = 1; n <= TOTAL_FRAMES; n++) {
    const outName = `frame_${String(n).padStart(3, "0")}.jpg`;
    const outPath = path.join(OUT_DIR, outName);
    const src = srcPathFor(n);

    if (!src) {
      missing.push(n);
      continue;
    }

    await sharp(src)
      .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toFile(outPath);
    converted++;
  }

  for (const n of missing) {
    let neighbor = null;
    for (let d = 1; d < TOTAL_FRAMES; d++) {
      const lo = n - d;
      const hi = n + d;
      if (lo >= 1 && srcPathFor(lo)) {
        neighbor = lo;
        break;
      }
      if (hi <= TOTAL_FRAMES && srcPathFor(hi)) {
        neighbor = hi;
        break;
      }
    }
    if (neighbor == null) {
      console.error(`No neighbor found for missing frame ${n}`);
      continue;
    }
    const neighborOut = path.join(OUT_DIR, `frame_${String(neighbor).padStart(3, "0")}.jpg`);
    const outPath = path.join(OUT_DIR, `frame_${String(n).padStart(3, "0")}.jpg`);
    fs.copyFileSync(neighborOut, outPath);
    console.log(`Filled missing frame ${n} by duplicating frame ${neighbor}`);
  }

  console.log(`Converted: ${converted}, Missing (filled via duplicate): ${missing.join(", ") || "none"}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
