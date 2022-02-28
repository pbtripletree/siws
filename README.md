# Usage

## Install

```
npm i siws
```

## Client

#### 1. Import

```
import { SiwsMessage } from "siws";
```

#### 2. Create message

```
const message = new SiwsMessage({
  domain: window.location.host,
  address: walletAddress,
  statement: "Use SIWS to authenticate",
});
```

#### 3. Prepare message for signing

```
const preparedMessage = message.prepare()
```

#### 4. Sign message with solana

```
const signedMessage = await solana.signMessage(preparedMessage);
```

#### 5. Create API token with signed message signature

```
const token = message.token(signedMessage.signature);
```

#### 6. Add this as your 'Authorization' header for an API request!

<br>

## Server

#### 1. Import

```
const { SiwsMessage } = require("siws");
```

#### 2a. Decode 'Authorization' token sent in header

```
const token = request.header("Authorization");
const siwsMessage = new SiwsMessage({}).decode(token);
```

#### 2b. If successful, your decoded message should look like the following

```
{
  domain: 'localhost:3000',
  address: '<address>',
  statement: 'Use SIWS to authenticate',
  message: 'localhost:3000 wants you to sign in with your Solana account:\n' +
    '<address>\n' +
    '\n' +
    'Use SIWS to authenticate.\n' +
    '\n' +
    'Nonce: <nonce>\n' +
    'Issued At: Fri Feb 18 2022 4:20:00 GMT-0700 (Mountain Standard Time)',
  signature: '<signature>'
}
```

#### 3. Validate the decoded token (will return a boolean)

```
const validated = siwsMessage.validate();
```

#### 4. If `validated === true`, you can trust that the address in the decoded message was the message signer
