import * as winston from "winston";
import { LEVEL, MESSAGE } from "triple-beam";
import { format, createLogger, WinstonLevel, CloudLoggingSeverity } from ".";

const EXAMPLE_MESSAGE = "Example message";

describe("format", () => {
  test("formats log info correctly", () => {
    const info = { level: WinstonLevel.Error, message: EXAMPLE_MESSAGE };
    expect(format().transform(info)).toBe(info);
    // @ts-ignore
    expect(info.severity).toBe(CloudLoggingSeverity.Error);
  });
});

describe("createLogger", () => {
  test("creates logger", () => {
    const logMock = jest.fn((info, callback) => {
      callback();
    });
    const transport = new winston.transports.Console();
    // @ts-ignore
    transport.log = logMock;
    const logger = createLogger({
      transports: [transport],
    });
    logger.info(EXAMPLE_MESSAGE);
    expect(logMock).toBeCalledWith(
      {
        message: EXAMPLE_MESSAGE,
        level: WinstonLevel.Info,
        severity: CloudLoggingSeverity.Info,
        [LEVEL]: WinstonLevel.Info,
        [MESSAGE]: JSON.stringify({
          message: EXAMPLE_MESSAGE,
          level: WinstonLevel.Info,
          severity: CloudLoggingSeverity.Info,
        }),
      },
      expect.any(Function)
    );
  });
});
