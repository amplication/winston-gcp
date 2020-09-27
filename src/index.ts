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

export const LEVEL_TO_SEVERITY: {
  [level in WinstonLevel]: CloudLoggingSeverity;
} = {
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
 * The format transformation maps Winston "level" log property to the Cloud Logging compatible "severity" log property.
 */
export const format = winston.format((info) => {
  if (info.level in LEVEL_TO_SEVERITY) {
    info.severity = LEVEL_TO_SEVERITY[info.level as WinstonLevel];
  }
  return info;
});
