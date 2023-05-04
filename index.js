import { createServer } from "node:https";
import { readFileSync } from "node:fs";
import { Http3Server } from "@fails-components/webtransport";

const content = readFileSync("./index.html");
const cert = readFileSync("./cert.pem");
const key = readFileSync("./key.pem");

const server = createServer(
  {
    cert,
    key,
  },
  (req, res) => {
    res.end(content);
  }
);

server.listen(3000);

const h3Server = new Http3Server({
  port: 3001,
  host: "0.0.0.0",
  secret: "testsecret",
  cert,
  privKey: key,
});

(async () => {
  try {
    const stream = await h3Server.sessionStream("/echo");
    const sessionReader = stream.getReader();

    while (true) {
      const result = await sessionReader.read();
      if (result.done) {
        console.log("Server is closed");
        break;
      }
      const session = result.value;

      session.closed
        .then(() => {
          console.log("Server session closed");
        })
        .catch((err) => {
          console.error("Server session errored", err);
        });

      console.log("new server session");
      await session.ready;
      console.log("Server session ready");
    }
  } catch (ex) {
    console.error("Server error", ex);
  }
})();

h3Server.startServer();
