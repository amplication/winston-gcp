import * as winston from "winston";

export enum WinstonLevel {
  Emergency = "emerg",
  Alert = "alert",
  Critical = "crit",
  Error = "error",
  Warning = "warn",
  Notice = "notice",
  Info = "info",
  Debug = "debug",
}

export enum CloudLoggingSeverity {
  Emergency = "EMERGENCY",
  Alert = "ALERT",
  Critical = "CRITICAL",
  Error = "ERROR",
  Warning = "WARNING",
  Notice = "NOTICE",
  Info = "INFO",
  Debug = "DEBUG",
}

export const LEVEL_TO_SEVERITY: Record<string, string> = {
  [WinstonLevel.Emergency]: CloudLoggingSeverity.Emergency,
  [WinstonLevel.Alert]: CloudLoggingSeverity.Alert,
  [WinstonLevel.Critical]: CloudLoggingSeverity.Critical,
  [WinstonLevel.Error]: CloudLoggingSeverity.Error,
  [WinstonLevel.Warning]: CloudLoggingSeverity.Warning,
  [WinstonLevel.Notice]: CloudLoggingSeverity.Notice,
  [WinstonLevel.Info]: CloudLoggingSeverity.Info,
  [WinstonLevel.Debug]: CloudLoggingSeverity.Debug,
};

/**
 * Creates Cloud Logging Winston format.
 * The format transformation maps sWinston "level" log property to the Cloud Logging compatible "severity" log property.
 */
export const format = (): winston.Logform.Format => {
  return winston.format((info) => {
    info.severity = LEVEL_TO_SEVERITY[info.level];
    return info;
  })();
};

/**
 * Creates a new Winston logger with JSON and Cloud Logging formats.
 * If transports are not provided defaults to Console transport.
 * @returns Winston logger
 */
export function createLogger(options?: winston.LoggerOptions): winston.Logger {
  const formats = [format(), winston.format.json()];
  if (options?.format) {
    formats.unshift(options?.format);
  }
  return winston.createLogger({
    ...options,
    format: winston.format.combine(...formats),
  });
}
