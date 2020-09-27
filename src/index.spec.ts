import { format, WinstonLevel, CloudLoggingSeverity } from ".";

const EXAMPLE_MESSAGE = "Example message";

describe("format", () => {
  test("formats log info correctly", () => {
    const info = { level: WinstonLevel.Error, message: EXAMPLE_MESSAGE };
    expect(format().transform(info)).toBe(info);
    // @ts-ignore
    expect(info.severity).toBe(CloudLoggingSeverity.Error);
  });
});
