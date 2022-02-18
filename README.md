# Usage

## Install

```
npm i siws
```

## Client

### 1. Import

```
import { SiwsMessage } from "siws";
```

### 2. Create message

```
const message = new SiwsMessage({
  domain: window.location.host,
  address: walletAddress,
  statement: "Use SIWS to authenticate",
});
```

### 3. Prepare message for signing

```
const preparedMessage = message.prepare()
```

### 4. Sign message with solana

```
const signedMessage = await solana.request({
  method: "signMessage",
  params: {
    message: message.prepare(),
  },
});
```

### 5. Create API token with signed message signature

```
const token = message.token(signedMessage.signature);
```

### 6. Add this as your 'Authorization' header for an API request!

## Server

### 1. Import

```
const { SiwsMessage } = require("siws");
```

### 2. Decode 'Authorization' token sent in header

```
const token = request.header("Authorization");
const decoded = new SiwsMessage({}).decode(token);
```
