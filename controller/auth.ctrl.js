const jwt = require("jsonwebtoken");
const { bufferToHex, toChecksumAddress } = require("ethereumjs-util");
const { recoverPersonalSignature } = require("eth-sig-util");

const User = require("../models/user.model");

exports.verifySignature = async (req, res) => {
  const { signature, publicAddress } = req.body;
  if (!signature || !publicAddress)
    return res.status(400).json({
      status: "failed",
      message: "Request should have signature and publicAddress",
    });

  const user = await User.findOne({ publicAddress: publicAddress });
  if (!user)
    return res.status(400).json({
      status: "failed",
      message: "No user found",
    });

  // Verify the signature
  const signMessage = `Vorbit verification-${user.nonce}`;

  const msgBufferHex = bufferToHex(Buffer.from(signMessage, "utf8"));
  const address = recoverPersonalSignature({
    data: msgBufferHex,
    sig: signature,
  });

  // The signature verification is successful if the address found with
  // sigUtil.recoverPersonalSignature matches the initial publicAddress
  if (address.toLowerCase() !== publicAddress.toLowerCase())
    return res.status(401).send({
      status: "failed",
      message: "Signature verification failed",
    });

  // Create & save new nonce
  user.nonce = Math.floor(Math.random() + Date.now());
  user.save();

  // Create JWT token
  jwt.sign(
    { publicAddress: publicAddress },
    "supersecretekey2093nasf",
    {
      expiresIn: "1h",
    },
    (err, token) => {
      if (err) {
        return res.status(400).send({
          status: "failed",
          message: "Error in JWT token creation",
        });
      } else {
        return res.json({
          status: "success",
          data: { token, user },
        });
      }
    }
  );
};
