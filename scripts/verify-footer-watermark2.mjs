import { chromium } from "playwright";

for (const width of [768, 390]) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollBy(0, 100000));
  await page.waitForTimeout(600);

  const info = await page.evaluate(() => {
    const p = document.querySelector("footer p.text-center.uppercase");
    const rect = p.getBoundingClientRect();
    return { textWidth: rect.width, viewportWidth: window.innerWidth, overflowing: rect.width > window.innerWidth };
  });
  console.log(`width=${width}:`, info);
  await page.screenshot({ path: `scripts/__fw-${width}.png` });
  await browser.close();
}
