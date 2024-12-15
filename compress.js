import { createReadStream, unlinkSync, existsSync } from "fs";
import { extname } from "path";
import OpenAI from "openai";
import ffmpeg from "fluent-ffmpeg";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Compress audio file to mp3 while maintaining quality
const compressAudio = async (inputFile, outputFile) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputFile)
      .toFormat("mp3")
      // Use a lower bitrate (64k is generally good enough for speech)
      .audioBitrate("64k")
      // Sample rate of 16kHz is sufficient for speech recognition
      .audioFrequency(16000)
      // Convert to mono (single channel)
      .audioChannels(1)
      // Use the libmp3lame codec with quality settings
      .audioCodec("libmp3lame")
      .addOptions([
        // Use constant bitrate for more predictable file sizes
        "-q:a 3",
        // Optimize for voice
        "-compression_level 0",
      ])
      .on("end", resolve)
      .on("error", reject)
      .save(outputFile);
  });
};

const main = async (inputFile) => {
  try {
    // Validate input file
    if (!existsSync(inputFile)) {
      throw new Error("Input file does not exist");
    }

    const ext = extname(inputFile).toLowerCase();
    if (ext !== ".m4a") {
      throw new Error("File must be an M4A file");
    }

    // Create compressed version
    console.log("Compressing audio file...");
    const compressedFile = inputFile.replace(".m4a", "_compressed.mp3");
    await compressAudio(inputFile, compressedFile);
  } catch (error) {
    console.error("Error during transcription:", error.message);
    throw error;
  }
};

// Handle command line arguments
const [, , inputFile] = process.argv;

if (!inputFile) {
  console.error("Please provide an input file path");
  process.exit(1);
}

// Execute transcription
const run = async () => {
  try {
    await main(inputFile);
  } catch (error) {
    console.error("Compression failed:", error.message);
    process.exit(1);
  }
};

run();
