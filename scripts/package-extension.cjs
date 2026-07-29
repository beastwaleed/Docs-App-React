const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const distDir = path.join(__dirname, "../dist");
const stagingDir = path.join(__dirname, "../dist-extension");
const zipPath = path.join(__dirname, "../public/docs-app-extension.zip");

if (!fs.existsSync(distDir)) {
  console.error("dist folder does not exist. Run npm run build first.");
  process.exit(1);
}

// 1. Clean previous staging
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
fs.mkdirSync(path.join(stagingDir, "assets"), { recursive: true });

// 2. Copy extension.html as index.html
fs.copyFileSync(path.join(distDir, "extension.html"), path.join(stagingDir, "index.html"));

// 3. Copy and update manifest.json
const manifestPath = path.join(distDir, "manifest.json");
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if (manifest.chrome_url_overrides) {
    manifest.chrome_url_overrides.newtab = "index.html";
  }
  fs.writeFileSync(path.join(stagingDir, "manifest.json"), JSON.stringify(manifest, null, 2));
}

// 4. Copy required extension assets (exclude landing page main-*.js)
const assetsDir = path.join(distDir, "assets");
if (fs.existsSync(assetsDir)) {
  const assets = fs.readdirSync(assetsDir);
  assets.forEach((file) => {
    if (!file.startsWith("main-")) {
      fs.copyFileSync(path.join(assetsDir, file), path.join(stagingDir, "assets", file));
    }
  });
}

// 5. Compress to public/docs-app-extension.zip
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

try {
  execSync(`powershell -Command "Compress-Archive -Path '${stagingDir}\\*' -DestinationPath '${zipPath}' -Force"`);
  console.log("Successfully created pure extension ZIP at public/docs-app-extension.zip");
} catch (e) {
  console.error("Failed to compress extension package", e);
}

// 6. Clean up staging directory
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
