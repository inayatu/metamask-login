const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/metamask-login", (err, suc) => {
  if (err) {
    console.log("[-] Error in DB connection ", err);
  } else {
    console.log("[+] DB connected");
  }
});
