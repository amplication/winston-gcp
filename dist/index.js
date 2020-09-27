"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
exports.__esModule = true;
exports.createLogger = exports.format = exports.LEVEL_TO_SEVERITY = exports.CloudLoggingSeverity = exports.WinstonLevel = void 0;
var winston = require("winston");
var WinstonLevel;
(function (WinstonLevel) {
    WinstonLevel["Emergency"] = "emerg";
    WinstonLevel["Alert"] = "alert";
    WinstonLevel["Critical"] = "crit";
    WinstonLevel["Error"] = "error";
    WinstonLevel["Warning"] = "warn";
    WinstonLevel["Notice"] = "notice";
    WinstonLevel["Info"] = "info";
    WinstonLevel["Debug"] = "debug";
})(WinstonLevel = exports.WinstonLevel || (exports.WinstonLevel = {}));
var CloudLoggingSeverity;
(function (CloudLoggingSeverity) {
    CloudLoggingSeverity["Emergency"] = "EMERGENCY";
    CloudLoggingSeverity["Alert"] = "ALERT";
    CloudLoggingSeverity["Critical"] = "CRITICAL";
    CloudLoggingSeverity["Error"] = "ERROR";
    CloudLoggingSeverity["Warning"] = "WARNING";
    CloudLoggingSeverity["Notice"] = "NOTICE";
    CloudLoggingSeverity["Info"] = "INFO";
    CloudLoggingSeverity["Debug"] = "DEBUG";
})(CloudLoggingSeverity = exports.CloudLoggingSeverity || (exports.CloudLoggingSeverity = {}));
exports.LEVEL_TO_SEVERITY = (_a = {},
    _a[WinstonLevel.Emergency] = CloudLoggingSeverity.Emergency,
    _a[WinstonLevel.Alert] = CloudLoggingSeverity.Alert,
    _a[WinstonLevel.Critical] = CloudLoggingSeverity.Critical,
    _a[WinstonLevel.Error] = CloudLoggingSeverity.Error,
    _a[WinstonLevel.Warning] = CloudLoggingSeverity.Warning,
    _a[WinstonLevel.Notice] = CloudLoggingSeverity.Notice,
    _a[WinstonLevel.Info] = CloudLoggingSeverity.Info,
    _a[WinstonLevel.Debug] = CloudLoggingSeverity.Debug,
    _a);
/**
 * Creates Cloud Logging Winston format.
 * The format transformation maps sWinston "level" log property to the Cloud Logging compatible "severity" log property.
 */
exports.format = function () {
    return winston.format(function (info) {
        info.severity = exports.LEVEL_TO_SEVERITY[info.level];
        return info;
    })();
};
/**
 * Creates a new Winston logger with JSON and Cloud Logging formats.
 * If transports are not provided defaults to Console transport.
 * @returns Winston logger
 */
function createLogger(options) {
    var _a;
    var formats = [exports.format(), winston.format.json()];
    if (options === null || options === void 0 ? void 0 : options.format) {
        formats.unshift(options === null || options === void 0 ? void 0 : options.format);
    }
    return winston.createLogger(__assign(__assign({}, options), { format: (_a = winston.format).combine.apply(_a, formats) }));
}
exports.createLogger = createLogger;
