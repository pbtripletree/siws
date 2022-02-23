const crypto = require("crypto");
const bs58 = require("bs58");
const nacl = require("tweetnacl");

class SiwsMessage {
  constructor({ domain, address, statement, message, signature }) {
    this.domain = domain;
    this.address = address;
    this.statement = statement;
    this.message = message;
    this.signature = signature;
  }

  prepare() {
    const nonce = crypto.randomBytes(16).toString("base64");
    const timestamp = new Date();
    const message = `${this.domain} wants you to sign in with your Solana account:\n${this.address}\n\n${this.statement}.\n\nNonce: ${nonce}\nIssued At: ${timestamp}`;
    this.message = message;
    return new TextEncoder().encode(message);
  }

  token(signature) {
    this.signature = bs58.encode(signature);
    const tokenData = new Buffer.from(JSON.stringify(this));
    return tokenData.toString("base64");
  }

  decode(token) {
    let tokenObject = Buffer.from(token, "base64");
    const siwsMessage = JSON.parse(tokenObject.toString("utf8"));
    this.domain = siwsMessage.domain;
    this.address = siwsMessage.address;
    this.statement = siwsMessage.statement;
    this.signature = siwsMessage.signature;
    this.message = siwsMessage.message;
    return this;
  }

  validate() {
    const messageBytes = new TextEncoder().encode(this.message);

    const publicKeyBytes = bs58.decode(this.address);
    const signatureBytes = bs58.decode(this.signature);

    const result = nacl.sign.detached.verify(
      messageBytes,
      signatureBytes,
      publicKeyBytes
    );
    return result;
  }
}

module.exports = {
  SiwsMessage,
};
