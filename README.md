# Whisper Transcription Tool

A Node.js tool that transcribes audio files to text using OpenAI's Whisper API. This tool provides a simple interface for transcribing pre-compressed audio files into text format.

## Prerequisites

- Node.js 14.0 or higher
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/audio-transcription-tool.git
cd audio-transcription-tool
```

2. Install dependencies:
```bash
npm install
```

3. Create a `package.json` file with ES modules support:
```json
{
  "name": "audio-transcription-tool",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "openai": "^4.0.0"
  }
}
```

4. Add your OpenAI API key to the script by replacing `'your-api-key-here'` in `transcribe.js` with your actual API key.

## Usage

### As a Module

Import and use in your JavaScript file:

```javascript
import transcribeAudio from './transcribe.js';

// Use with automatic file saving
await transcribeAudio('path/to/audio.mp3', 'output.txt');

// Or just get the transcription text
const text = await transcribeAudio('path/to/audio.mp3');
```

### Command Line

Run directly from command line:

```bash
# With specified output file
node transcribe.js path/to/audio.mp3 output.txt

# With auto-generated output filename
node transcribe.js path/to/audio.mp3
```

### Background Processing

To keep the script running after closing the terminal:

```bash
# Using nohup (Linux/Mac)
nohup node transcribe.js path/to/audio.mp3 output.txt > output.log &

# Using screen (Linux/Mac)
screen -S transcription
node transcribe.js path/to/audio.mp3 output.txt
# Press Ctrl+A then D to detach
# Use 'screen -r transcription' to reattach

# Using pm2 (cross-platform)
npm install -g pm2
pm2 start transcribe.js -- path/to/audio.mp3 output.txt
```

## Audio File Requirements

- Recommended format: MP3
- File size limit: 25MB
- If your file is larger, you'll need to compress it first
- Recommended audio settings for speech:
  - Bitrate: 64k
  - Sample rate: 16kHz
  - Channels: Mono

## Expected Processing Time

Processing time varies based on:
- File size
- Internet connection speed
- OpenAI API load

Typical processing times:
- 1-hour audio file: 5-15 minutes
- Times may vary based on API load and connection speed

