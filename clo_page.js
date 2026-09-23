const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PAGE_URL = "https://www.artofliving.org/in-en/happiness-program";

const OUTPUT_DIR = path.join(__dirname, "cloned-page");

const FOLDERS = {
  css: path.join(OUTPUT_DIR, "css"),
  js: path.join(OUTPUT_DIR, "js"),
  images: path.join(OUTPUT_DIR, "images"),
  fonts: path.join(OUTPUT_DIR, "fonts"),
  other: path.join(OUTPUT_DIR, "other"),
};

const client = axios.create({
  timeout: 60000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36",
    Accept: "*/*",
  },
});

const downloaded = new Map();

function createFolders() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  Object.values(FOLDERS).forEach((folder) => {
    fs.mkdirSync(folder, { recursive: true });
  });
}

function cleanFilename(name) {
  name = decodeURIComponent(name);

  name = name.split("?")[0].split("#")[0];

  name = name.replace(/[<>:"/\\|?*]/g, "_");

  name = name.trim();

  if (!name) {
    name = "asset";
  }

  return name;
}

function getFilename(url, contentType = "") {
  try {
    const parsed = new URL(url);

    let filename = path.basename(parsed.pathname);

    filename = cleanFilename(filename);

    if (!filename || filename === "." || filename === "..") {
      filename = "asset";
    }

    // If URL has no extension, create one based on content type
    if (!path.extname(filename)) {
      const type = contentType.toLowerCase();

      if (type.includes("javascript")) {
        filename += ".js";
      } else if (type.includes("css")) {
        filename += ".css";
      } else if (type.includes("html")) {
        filename += ".html";
      } else if (type.includes("svg")) {
        filename += ".svg";
      } else if (type.includes("webp")) {
        filename += ".webp";
      } else if (type.includes("png")) {
        filename += ".png";
      } else if (type.includes("jpeg")) {
        filename += ".jpg";
      } else if (type.includes("woff2")) {
        filename += ".woff2";
      } else if (type.includes("woff")) {
        filename += ".woff";
      } else if (type.includes("ttf")) {
        filename += ".ttf";
      }
    }

    return filename;
  } catch {
    return "asset";
  }
}

function uniqueFilename(folder, filename) {
  let fullPath = path.join(folder, filename);

  if (!fs.existsSync(fullPath)) {
    return fullPath;
  }

  const ext = path.extname(filename);
  const base = path.basename(filename, ext);

  let counter = 1;

  while (fs.existsSync(fullPath)) {
    fullPath = path.join(folder, `${base}_${counter}${ext}`);

    counter++;
  }

  return fullPath;
}

function isDataUrl(url) {
  return (
    !url ||
    url.startsWith("data:") ||
    url.startsWith("blob:") ||
    url.startsWith("#") ||
    url.startsWith("javascript:")
  );
}

function absoluteUrl(url, baseUrl) {
  try {
    return new URL(url, baseUrl).href;
  } catch {
    return null;
  }
}

function getFolderForAsset(url, contentType = "") {
  const lowerUrl = url.toLowerCase();
  const lowerType = contentType.toLowerCase();

  if (
    lowerType.includes("javascript") ||
    lowerUrl.includes(".js") ||
    lowerUrl.includes("javascript")
  ) {
    return FOLDERS.js;
  }

  if (lowerType.includes("css") || lowerUrl.includes(".css")) {
    return FOLDERS.css;
  }

  if (
    lowerType.startsWith("image/") ||
    /\.(jpg|jpeg|png|gif|webp|svg|avif|ico)(\?|#|$)/i.test(lowerUrl)
  ) {
    return FOLDERS.images;
  }

  if (
    lowerType.includes("font") ||
    /\.(woff2?|ttf|otf|eot)(\?|#|$)/i.test(lowerUrl)
  ) {
    return FOLDERS.fonts;
  }

  return FOLDERS.other;
}

async function downloadAsset(url, preferredFolder = null) {
  if (isDataUrl(url)) {
    return null;
  }

  if (downloaded.has(url)) {
    return downloaded.get(url);
  }

  try {
    console.log(`Downloading: ${url}`);

    const response = await client.get(url, {
      responseType: "arraybuffer",
      validateStatus: (status) => status >= 200 && status < 400,
    });

    const contentType = response.headers["content-type"] || "";

    const folder = preferredFolder || getFolderForAsset(url, contentType);

    let filename = getFilename(url, contentType);

    // Generate filename if necessary
    if (filename === "asset") {
      const hash = crypto
        .createHash("md5")
        .update(url)
        .digest("hex")
        .substring(0, 10);

      filename = `asset-${hash}`;
    }

    const fullPath = uniqueFilename(folder, filename);

    fs.writeFileSync(fullPath, response.data);

    const relativePath = path
      .relative(OUTPUT_DIR, fullPath)
      .replace(/\\/g, "/");

    downloaded.set(url, relativePath);

    console.log(`  ✓ Saved: ${relativePath}`);

    return relativePath;
  } catch (error) {
    console.log(`  ✗ Failed: ${url}`);

    if (error.response) {
      console.log(`    HTTP ${error.response.status}`);
    } else {
      console.log(`    ${error.message}`);
    }

    downloaded.set(url, null);

    return null;
  }
}

function localPathForHtml(relativePath) {
  return "./" + relativePath.replace(/\\/g, "/");
}

async function downloadCSS(cssUrl) {
  const localPath = await downloadAsset(cssUrl, FOLDERS.css);

  if (!localPath) {
    return null;
  }

  const cssFullPath = path.join(OUTPUT_DIR, localPath);

  try {
    let css = fs.readFileSync(cssFullPath, "utf8");

    // Find url(...) inside CSS
    const urlRegex = /url\(\s*(['"]?)(.*?)\1\s*\)/gi;

    const matches = [...css.matchAll(urlRegex)];

    for (const match of matches) {
      const original = match[0];
      const assetUrl = match[2];

      if (isDataUrl(assetUrl)) {
        continue;
      }

      const absolute = absoluteUrl(assetUrl, cssUrl);

      if (!absolute) {
        continue;
      }

      const assetLocalPath = await downloadAsset(absolute);

      if (assetLocalPath) {
        const cssDir = path.dirname(cssFullPath);

        const targetFullPath = path.join(OUTPUT_DIR, assetLocalPath);

        let replacement = path.relative(cssDir, targetFullPath);

        replacement = replacement.replace(/\\/g, "/");

        css = css.replace(original, `url("${replacement}")`);
      }
    }

    fs.writeFileSync(cssFullPath, css, "utf8");

    return localPath;
  } catch (error) {
    console.log(`CSS processing failed: ${cssUrl}`);

    return localPath;
  }
}

function extractSrcset(value) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => {
      const parts = item.trim().split(/\s+/);

      return parts[0];
    })
    .filter(Boolean);
}

async function processImages($) {
  console.log("\n========== IMAGES ==========\n");

  const elements = $("img").toArray();

  for (const element of elements) {
    const attributes = ["src", "data-src", "data-lazy-src", "data-original"];

    for (const attribute of attributes) {
      const value = $(element).attr(attribute);

      if (!value || isDataUrl(value)) {
        continue;
      }

      const absolute = absoluteUrl(value, PAGE_URL);

      if (!absolute) {
        continue;
      }

      const local = await downloadAsset(absolute, FOLDERS.images);

      if (local) {
        $(element).attr(attribute, localPathForHtml(local));
      }
    }

    const srcset = $(element).attr("srcset");

    if (srcset) {
      const items = extractSrcset(srcset);

      const newItems = [];

      for (const item of items) {
        const absolute = absoluteUrl(item, PAGE_URL);

        if (!absolute) {
          continue;
        }

        const local = await downloadAsset(absolute, FOLDERS.images);

        if (local) {
          newItems.push(localPathForHtml(local));
        }
      }

      if (newItems.length) {
        $(element).attr("srcset", newItems.join(", "));
      }
    }
  }

  // <picture><source>
  const sources = $("source").toArray();

  for (const element of sources) {
    const src = $(element).attr("src");

    if (src && !isDataUrl(src)) {
      const absolute = absoluteUrl(src, PAGE_URL);

      if (absolute) {
        const local = await downloadAsset(absolute, FOLDERS.images);

        if (local) {
          $(element).attr("src", localPathForHtml(local));
        }
      }
    }

    const srcset = $(element).attr("srcset");

    if (srcset) {
      const items = extractSrcset(srcset);
      const newItems = [];

      for (const item of items) {
        const absolute = absoluteUrl(item, PAGE_URL);

        if (!absolute) {
          continue;
        }

        const local = await downloadAsset(absolute, FOLDERS.images);

        if (local) {
          newItems.push(localPathForHtml(local));
        }
      }

      if (newItems.length) {
        $(element).attr("srcset", newItems.join(", "));
      }
    }
  }
}

async function processScripts($) {
  console.log("\n========== JAVASCRIPT ==========\n");

  const scripts = $("script[src]").toArray();

  for (const element of scripts) {
    const src = $(element).attr("src");

    const absolute = absoluteUrl(src, PAGE_URL);

    if (!absolute) {
      continue;
    }

    const local = await downloadAsset(absolute, FOLDERS.js);

    if (local) {
      $(element).attr("src", localPathForHtml(local));
    }
  }
}

async function processStylesheets($) {
  console.log("\n========== CSS ==========\n");

  const links = $('link[rel="stylesheet"]').toArray();

  for (const element of links) {
    const href = $(element).attr("href");

    if (!href) {
      continue;
    }

    const absolute = absoluteUrl(href, PAGE_URL);

    if (!absolute) {
      continue;
    }

    const local = await downloadCSS(absolute);

    if (local) {
      $(element).attr("href", localPathForHtml(local));
    }
  }
}

async function processFontsFromCSS() {
  // Fonts are downloaded while processing CSS
  // because CSS can contain:
  //
  // @font-face {
  //   src: url(...)
  // }
}

async function processFavicon($) {
  console.log("\n========== FAVICON ==========\n");

  const links = $("link").toArray();

  for (const element of links) {
    const rel = ($(element).attr("rel") || "").toString().toLowerCase();

    if (!rel.includes("icon")) {
      continue;
    }

    const href = $(element).attr("href");

    if (!href) {
      continue;
    }

    const absolute = absoluteUrl(href, PAGE_URL);

    if (!absolute) {
      continue;
    }

    const local = await downloadAsset(absolute, FOLDERS.other);

    if (local) {
      $(element).attr("href", localPathForHtml(local));
    }
  }
}

async function processOpenGraphImages($) {
  console.log("\n========== META IMAGES ==========\n");

  $('meta[property="og:image"]').each(async function () {
    const content = $(this).attr("content");

    if (!content) {
      return;
    }

    const absolute = absoluteUrl(content, PAGE_URL);

    if (!absolute) {
      return;
    }

    const local = await downloadAsset(absolute, FOLDERS.images);

    if (local) {
      $(this).attr("content", localPathForHtml(local));
    }
  });
}

async function main() {
  console.log("==================================================");
  console.log(" ART OF LIVING PAGE DOWNLOADER");
  console.log("==================================================");

  console.log(`\nPage: ${PAGE_URL}`);

  createFolders();

  console.log(`\nOutput: ${OUTPUT_DIR}\n`);

  console.log("Downloading main HTML page...");

  let response;

  try {
    response = await client.get(PAGE_URL);
  } catch (error) {
    console.error("\nCould not download the page.");

    console.error(error.message);

    return;
  }

  const html = response.data;

  const $ = cheerio.load(html, {
    decodeEntities: false,
  });

  await processStylesheets($);

  await processScripts($);

  await processImages($);

  await processFavicon($);

  await processOpenGraphImages($);

  // Save HTML
  const htmlPath = path.join(OUTPUT_DIR, "index.html");

  fs.writeFileSync(htmlPath, $.html(), "utf8");

  console.log("\n==================================================");

  console.log(" DOWNLOAD COMPLETED");

  console.log("==================================================");

  console.log(`\nHTML:\n${htmlPath}`);

  console.log("\nFolder structure:");

  console.log(`
cloned-page/
│
├── index.html
│
├── css/
│   ├── *.css
│   └── CSS assets
│
├── js/
│   └── *.js
│
├── images/
│   ├── *.jpg
│   ├── *.jpeg
│   ├── *.png
│   ├── *.webp
│   ├── *.svg
│   └── ...
│
├── fonts/
│   └── fonts
│
└── other/
    └── other assets
`);

  console.log("\nFiles downloaded: " + downloaded.size);

  console.log("\nOpen this file in your browser:");

  console.log(htmlPath);
}

main();
