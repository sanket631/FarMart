import fs from "fs";
import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.argv.length < 3) {
  console.error("Usage: node log_extractor.js <YYYY-MM-DD>");
  process.exit(1);
}

const searchDate = process.argv[2];
const logFilePath = path.join(__dirname, "logs_2024.log");

// Validate date
if (!/^\d{4}-\d{2}-\d{2}$/.test(searchDate)) {
  console.error("Invalid date format. Use YYYY-MM-DD.");
  process.exit(1);
}

if (!fs.existsSync(logFilePath)) {
  console.error(`Error: Log file not found at ${logFilePath}`);
  process.exit(1);
}

const outputDir = path.join(__dirname, "output");
const outputFile = path.join(outputDir, `output_${searchDate}.txt`);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const writeStream = fs.createWriteStream(outputFile, { flags: "w" });

const readStream = fs.createReadStream(logFilePath, { encoding: "utf8" });
const rl = readline.createInterface({ input: readStream });

console.log(`Extracting logs from ${logFilePath} for date: ${searchDate}...`);

rl.on("line", (line) => {
  if (line.startsWith(searchDate)) {
    writeStream.write(line + "\n");
  }
});

rl.on("close", () => {
  writeStream.end();
  console.log(`Logs for ${searchDate} saved to: ${outputFile}`);
});

readStream.on("error", (err) => {
  console.error("Error reading log file:", err.message);
  process.exit(1);
});

writeStream.on("error", (err) => {
  console.error("Error writing output file:", err.message);
  process.exit(1);
});
