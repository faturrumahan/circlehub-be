import winston, { format, transports } from "winston"

const levels: Record<string, number> = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const colors: Record<string, string> = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
}

winston.addColors(colors)

const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  format.colorize({ all: true }),
  format.printf((info) => `${info.timestamp} ${info.level}:\n${info.message}`),
)

const logTransports = [
  new transports.Console(),
  new transports.File({ filename: "logs/error.log", level: "error" }),
  new transports.File({ filename: "logs/all.log" }),
]

const loggerWinston = winston.createLogger({
  level: "debug",
  levels,
  format: logFormat,
  transports: logTransports,
})

export default loggerWinston
