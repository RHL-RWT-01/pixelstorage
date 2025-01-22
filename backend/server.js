const express = require("express");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const port = process.env.PORT || 5000;

// Importing routes (ensure the path is correct)
const { signup } = require("./routes/signup");
const { login } = require("./routes/login");
const { encrypt } = require("./functions/encrypt");
const { decrypt } = require("./functions/decrypt");

app.use(cors());

app.post("/api/user/signup", signup);
app.post("/api/user/login", login);

// Ensure the correct handlers are provided
app.post("/encrypt", encrypt);
app.post("/decrypt", decrypt);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
