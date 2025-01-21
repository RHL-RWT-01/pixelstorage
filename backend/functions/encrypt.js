const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const Jimp = require("jimp"); // Using Jimp for image manipulation
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "default_secret";

const router = express.Router();

// Set up multer to handle image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * Encrypt message and hide it inside the image using LSB steganography.
 */
router.post("/encrypt", upload.single("image"), async (req, res) => {
  try {
    const { message } = req.body;
    const imageBuffer = req.file.buffer;

    // Encrypt the message with AES-256-CBC
    const cipher = crypto.createCipher("aes-256-cbc", SECRET_KEY);
    let encryptedMessage = cipher.update(message, "utf8", "hex");
    encryptedMessage += cipher.final("hex");

    // Convert encrypted message into binary
    let binaryMessage = "";
    for (let i = 0; i < encryptedMessage.length; i++) {
      binaryMessage += parseInt(encryptedMessage[i], 16)
        .toString(2)
        .padStart(4, "0");
    }

    // Load the image using Jimp for pixel manipulation
    const image = await Jimp.read(imageBuffer);

    let messageIndex = 0;
    // Loop through the image pixels and hide the message in the least significant bit of the red channel
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      if (messageIndex < binaryMessage.length) {
        const red = image.bitmap.data[idx];
        const binaryPixel = binaryMessage[messageIndex];

        // Set the least significant bit of the red channel to the binary message bit
        image.bitmap.data[idx] =
          (image.bitmap.data[idx] & 0xfe) | parseInt(binaryPixel);
        messageIndex++;
      }
    });

    // Save the modified image to disk
    const outputPath = path.join(__dirname, "encrypted-image.png");
    await image.writeAsync(outputPath);

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
