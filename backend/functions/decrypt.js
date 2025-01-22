const express = require("express");
const multer = require("multer");
const Jimp = require("jimp"); // Assuming Jimp is used for image processing
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Ensure the uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir); // Create the folder if it doesn't exist
}

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Save uploaded files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Utility to extract message from an image
const extractMessageFromImage = async (imagePath) => {
  try {
    const image = await Jimp.read(imagePath);
    let binaryMessage = "";

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      const red = image.bitmap.data[idx];
      binaryMessage += (red & 1).toString(); // Extract least significant bit
    });

    // Convert binary message to string
    const byteArray = binaryMessage.match(/.{1,8}/g) || [];
    const decodedMessage = byteArray
      .map((byte) => String.fromCharCode(parseInt(byte, 2)))
      .join("");

    return decodedMessage.split("\0")[0]; // Stop at the first null terminator
  } catch (error) {
    console.error("Error extracting message:", error);
    throw new Error("Failed to extract message from the image.");
  }
};

// Decryption route
router.post("/decrypt", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const imagePath = req.file.path;
    const decryptedMessage = await extractMessageFromImage(imagePath);

    // Optionally, delete the image after processing (keeping only the message)
    fs.unlinkSync(imagePath);

    res.status(200).json({
      message: "Message decrypted successfully",
      decryptedMessage: decryptedMessage || "No message found",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
