const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fgBlack: "\x1b[30m",
  fgRed: "\x1b[31m",
  fgGreen: "\x1b[32m",
  fgYellow: "\x1b[33m",
  fgBlue: "\x1b[34m",
  fgMagenta: "\x1b[35m",
  fgCyan: "\x1b[36m",
  fgWhite: "\x1b[37m",

  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
};

const getTimestamp = () => {
  return new Date().toISOString();
};

const logger = {
  info: (message, ...args) => {
    console.log(
      `${colors.fgCyan}[INFO]${colors.reset} ${colors.dim}${getTimestamp()}${colors.reset} ${message}`,
      ...args
    );
  },
  success: (message, ...args) => {
    console.log(
      `${colors.fgGreen}[SUCCESS]${colors.reset} ${colors.dim}${getTimestamp()}${colors.reset} ${message}`,
      ...args
    );
  },
  warn: (message, ...args) => {
    console.warn(
      `${colors.fgYellow}[WARN]${colors.reset} ${colors.dim}${getTimestamp()}${colors.reset} ${message}`,
      ...args
    );
  },
  error: (message, ...args) => {
    console.error(
      `${colors.fgRed}[ERROR]${colors.reset} ${colors.dim}${getTimestamp()}${colors.reset} ${colors.bright}${message}${colors.reset}`,
      ...args
    );
  },
  http: (method, url, status) => {
    const statusColor = status >= 400 ? colors.fgRed : colors.fgGreen;
    console.log(
      `${colors.fgMagenta}[HTTP]${colors.reset} ${colors.dim}${getTimestamp()}${colors.reset} ${colors.bright}${method}${colors.reset} ${url} - ${statusColor}${status}${colors.reset}`
    );
  },
};

module.exports = logger;
