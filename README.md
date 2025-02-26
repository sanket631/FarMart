# Log Extractor  

## Introduction  
The Log Extractor is a Node.js script designed to quickly extract log entries for a given date from a large log file. It is optimized to handle extremely large files efficiently without consuming excessive memory.  

## How It Works  
- Reads the log file **line by line** using a streaming approach.  
- **Matches** lines that start with the specified date (`YYYY-MM-DD`).  
- **Writes** the filtered logs to an output file without loading everything into memory.  

## Usage  
To extract logs for a specific date, run:  
```sh
node log_extractor.js "logs_2024.log" 2024-12-01
