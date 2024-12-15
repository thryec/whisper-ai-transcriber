import { createReadStream, writeFileSync } from "fs";
import OpenAI from "openai";

// Configure OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Standalone transcription function
const transcribeAudio = async (audioFilePath, outputPath = null) => {
  try {
    console.log("Starting transcription...");
    const audioStream = createReadStream(audioFilePath);

    const { text: transcriptionText } =
      await openai.audio.transcriptions.create({
        file: audioStream,
        model: "whisper-1",
        response_format: "text",
      });

    // Save transcript if output path is provided
    if (outputPath) {
      writeFileSync(outputPath, transcriptionText);
      console.log(`Transcription saved to: ${outputPath}`);
    }

    return transcriptionText;
  } catch (error) {
    console.error("Error during transcription:", error.message);
    throw error;
  }
};

// Example usage:
// If you want to run it directly from command line
if (process.argv[2]) {
  const [, , inputFile, outputFile] = process.argv;
  transcribeAudio(inputFile, outputFile || `${inputFile}_transcript.txt`).catch(
    (error) => {
      console.error("Transcription failed:", error.message);
      process.exit(1);
    }
  );
}

// Export for use in other files
export default transcribeAudio;
