"use strict";
exports.__esModule = true;
var winston = require("winston");
var triple_beam_1 = require("triple-beam");
var _1 = require(".");
var EXAMPLE_MESSAGE = "Example message";
describe("format", function () {
    test("formats log info correctly", function () {
        var info = { level: _1.WinstonLevel.Error, message: EXAMPLE_MESSAGE };
        expect(_1.format().transform(info)).toBe(info);
        // @ts-ignore
        expect(info.severity).toBe(_1.CloudLoggingSeverity.Error);
    });
});
describe("createLogger", function () {
    test("creates logger", function () {
        var _a;
        var logMock = jest.fn(function (info, callback) {
            callback();
        });
        var transport = new winston.transports.Console();
        // @ts-ignore
        transport.log = logMock;
        var logger = _1.createLogger({
            transports: [transport]
        });
        logger.info(EXAMPLE_MESSAGE);
        expect(logMock).toBeCalledWith((_a = {
                message: EXAMPLE_MESSAGE,
                level: _1.WinstonLevel.Info,
                severity: _1.CloudLoggingSeverity.Info
            },
            _a[triple_beam_1.LEVEL] = _1.WinstonLevel.Info,
            _a[triple_beam_1.MESSAGE] = JSON.stringify({
                message: EXAMPLE_MESSAGE,
                level: _1.WinstonLevel.Info,
                severity: _1.CloudLoggingSeverity.Info
            }),
            _a), expect.any(Function));
    });
});
