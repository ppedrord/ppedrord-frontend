import fs from "fs";
import path from "path";

const processingBase = [
  {
    source: path.resolve("./node_modules/@fontsource/roboto/300.css"),
    destination: path.resolve("./src/assets/fonts/300.css"),
  },
  {
    source: path.resolve("./node_modules/@fontsource/roboto/400.css"),
    destination: path.resolve("./src/assets/fonts/400.css"),
  },
  {
    source: path.resolve("./node_modules/@fontsource/roboto/500.css"),
    destination: path.resolve("./src/assets/fonts/500.css"),
  },
  {
    source: path.resolve("./node_modules/@fontsource/roboto/700.css"),
    destination: path.resolve("./src/assets/fonts/700.css"),
  },
];

function fileToBase64(filePath) {
  const fileContent = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  let mimeType;

  switch (ext) {
    case ".woff2":
      mimeType = "font/woff2";
      break;
    case ".woff":
      mimeType = "font/woff";
      break;
    case ".ttf":
      mimeType = "font/ttf";
      break;
    case ".otf":
      mimeType = "font/otf";
      break;
    default:
      throw new Error(`Unsupported font format: ${ext}`);
  }

  return `data:${mimeType};base64,${fileContent.toString("base64")}`;
}

function processCssFile(sourceFile, destinationFile) {
  let cssContent = fs.readFileSync(sourceFile, "utf-8");

  const fontRegex = /url\(['"]?(\.\/[^)]+\.(woff2?|ttf|otf))['"]?\)/g;

  cssContent = cssContent.replace(fontRegex, (match, relativePath) => {
    const fontPath = path.resolve(path.dirname(sourceFile), relativePath);
    if (!fs.existsSync(fontPath)) {
      console.warn(`Font file not found: ${fontPath}`);
      return match;
    }

    const base64Font = fileToBase64(fontPath);
    return `url('${base64Font}')`;
  });

  fs.writeFileSync(destinationFile, cssContent, "utf-8");
  console.log(`Processed: ${sourceFile}`);
}

function process(base) {
  base.forEach((file) => {
    processCssFile(file.source, file.destination);
  });
}

try {
  process(processingBase);
  console.log("All CSS files processed successfully.");
} catch (error) {
  console.error("Error:", error.message);
}
