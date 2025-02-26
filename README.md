### **1️⃣ Streaming for Large File Handling**
Instead of loading the entire log file into memory, the script processes the file **line-by-line** using:
- `fs.createReadStream()` → Reads the log file as a stream.
- `readline.createInterface()` → Processes each line efficiently.

This approach prevents **memory overload**, making it suitable for extremely large files.

### **2️⃣ Pattern Matching for Fast Filtering**
- Each log entry starts with a **timestamp (`YYYY-MM-DD HH:MM:SS`)**.
- The script **checks only the first 10 characters** (`YYYY-MM-DD`) of each line to determine if it matches the requested date.
- Matched logs are **written immediately** to an output file to avoid high memory usage.

### **3️⃣ Efficient File Writing**
- Uses `fs.createWriteStream()` to **stream matching logs directly to an output file**.
- This avoids buffering large amounts of data in memory.

---
