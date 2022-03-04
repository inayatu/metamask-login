const User = require("../models/user.model");

exports.createUser = async (req, res) => {
  const { username, publicAddress } = req.body;
  const user = await User.create({ username, publicAddress });
  res.json({
    status: "success",
    data: { user },
  });
};
exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json({
    status: "success",
    data: { users },
  });
};
exports.getSingleUser = async (req, res) => {
  const publicAddress = req.params.publicAddress;

  if (!publicAddress)
    return res.status(400).json({
      status: "failed",
      message: "publicAddress is required in param",
    });

  const user = await User.findOne({ publicAddress: publicAddress });

  if (user)
    return res.json({
      status: "success",
      data: { user },
    });

  const nonce = Math.floor(Math.random() * Date.now());
  const user_ = await User.create({ publicAddress, nonce });
  return res.json({
    status: "success",
    data: {
      user: user_,
    },
  });
};
exports.updateUser = async (req, res) => {
  res.json({
    status: "success",
    message: `You request ${req.url}`,
  });
};
exports.deleteUser = async (req, res) => {
  res.json({
    status: "success",
    message: `You request ${req.url}`,
  });
};
