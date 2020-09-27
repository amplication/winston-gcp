# `winston-cloud-logging`

[Cloud Logging](https://cloud.google.com/logging) compatible logging with [Winston](https://github.com/winstonjs/winston/).

```
npm install winston-cloud-logging
```

## Examples

### Use the format in a logger

```javascript
const winston = require("winston");
const winstonCloudLogging = require("winston-cloud-logging");

const logger = winston.createLogger({
  format: winston.combine(
    // rest of the logger formats to be used
    winstonCloudLogging.format(),
    winston.format.json()
  ),
  // rest of the logger options
});
```
