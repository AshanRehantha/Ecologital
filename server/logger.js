const winston = require("winston");
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
        ),
        silent: process.env.NODE_ENV === 'production'
    }),
    new DailyRotateFile({
        filename: "application-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "1m",
        maxFiles: "14d",
        dirname: "Logs",
        level: process.env.LOG_LEVEL,
        format: winston.format.combine(
            winston.format.timestamp({
                format: "YYYY/MM/DD HH:mm:ss",
            }),
            winston.format.printf(
                (info) =>
                    `[${info.timestamp}] ${info.level} : ${info.message}`,
            ),
        ),
    }),
  ]
});

module.exports = logger;