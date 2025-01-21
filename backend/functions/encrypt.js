const express = require("express");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp"); // Optional for image manipulation
const crypto = require("crypto");
const dotenv = require("dotenv");
const fs = require("fs");
const router = express.Router();
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "default_secret";

router.post("/encrypt", multer().single("image"), async (req, res) => {
  try {
    const { message } = req.body;
    const imageBuffer = req.file.buffer;

    // Encrypt the message
    const cipher = crypto.createCipher("aes-256-cbc", SECRET_KEY);
    let encrypted = cipher.update(message, "utf8", "hex");
    encrypted += cipher.final("hex");

    // Hide the encrypted message in the image (LSB technique - simplified example)
    const outputPath = path.join(__dirname, "encrypted-image.png");
    // Here you would call your steganography logic to embed encrypted message in image.
    await fs.promises.writeFile(outputPath, imageBuffer); // Placeholder

    res.status(200).json({
      message: "Message encrypted and embedded in the image",
      imagePath: outputPath,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
