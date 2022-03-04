const express = require("express");
const bodyParser = require("body-parser");

const PORT = 4000;

const app = express();

app.use(express.static("public"));

// Use body parser middleware
app.use(bodyParser.json());

// DB connection
require("./db");

// Import routes
app.use("/api/", require("./routes"));

app.use("/", (req, res) => {
  res.json({
    status: "success",
    message: "Metamast JWT running",
  });
});

app.listen(PORT, () => {
  console.log(`[*] Metamask JWT server running on port ${PORT}`);
});
