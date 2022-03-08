# Secure APIs / Login with Metamask 

Simple App to showcase how to login via MetaMask and secure APIs with JWT Token.

### How it works?
1. User logins in Metamask
2. Send Metamask public address to backend and check if it already exists
3. If public address is found, send the nonce(randomly generated number saved against the user) to frontend. 
4. Sign a message with the provided nonce via Metamask and it will give a signature in response
5. Send the signature to backend and from backend verify the signature.
6. Once the signature has been verified, generate a JWT and send back it in response. Change the nonce as well in the DB.

### Installation

```bash
npm insall
```
