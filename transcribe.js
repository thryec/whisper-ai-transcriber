import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main(inputFile) {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(inputFile),
    model: "whisper-1",
    response_format: "text",
  });

  console.log(transcription);
  fs.writeFileSync(outputFile, transcription);
}
main(inputFile, outputFile);

// If your file is larger than 20MB, you'll need to compress it first
// 5 minutes by default
const extractAudioSegment = async (inputFile, outputFile, duration = 300) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputFile)
      .setStartTime(0)
      .setDuration(duration)
      .output(outputFile)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });
};

extractAudioSegment(inputFile, outputFile, 300);
