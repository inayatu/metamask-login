const router = require("express").Router();

const userCtrl = require("../controller/user.ctrl");
const authCtrl = require("../controller/auth.ctrl");

// User routes
router.route("/users").post(userCtrl.createUser).get(userCtrl.getAllUsers);
router
  .route("/users/:publicAddress")
  .get(userCtrl.getSingleUser)
  .put(userCtrl.updateUser)
  .delete(userCtrl.deleteUser);

// Auth routes
router.route("/auth").post(authCtrl.verifySignature);

module.exports = router;
