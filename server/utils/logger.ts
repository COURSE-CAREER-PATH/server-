import { createLogger, transports, format } from "winston";

// Define log levels and their corresponding colors
const logLevels = {
  error: "red",
  warn: "yellow",
  info: "green",
  verbose: "cyan",
  debug: "blue",
};

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    // format.colorize(),
    format.errors({ stack: true, }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    // new transports.File({ filename: "combine.log", level: "info" }),
    new transports.Console({ level: "silly" }),
  ],
});

export default logger;
