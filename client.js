import { readFileSync } from "node:fs";
import { WebTransport } from "@fails-components/webtransport";
import { X509Certificate } from "crypto";

const cert = readFileSync("./cert.pem");

const client = new WebTransport("https://localhost:3001/echo", {
  serverCertificateHashes: [
    {
      algorithm: "sha-256",
      value: Buffer.from(
        new X509Certificate(cert).fingerprint256
          .split(":")
          .map((el) => parseInt(el, 16))
      ),
    },
  ],
});

client.closed
  .then(() => {
    console.log("Connection closed");
  })
  .catch((err) => {
    console.error("Connection errored", err);
  });

console.log("Waiting for client to be ready");
await client.ready;
console.log("Client ready");

await client.createBidirectionalStream();
console.log("Client created stream");
