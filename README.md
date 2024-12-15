# Audio Compression and Transcription Tool

A Node.js tool that compresses audio files and transcribes them using OpenAI's Whisper API. This tool processes large audio files that need to be transcribed while maintaining good speech recognition quality.

## Features

- Audio compression from M4A to MP3 format
- Optimized compression settings for speech recognition
- Audio transcription using OpenAI's Whisper API
- Support for processing audio segments for large files
- Output transcription to text file

## Prerequisites

- Node.js (v14 or higher recommended)
- FFmpeg
- OpenAI API key

## Installation

1. Install FFmpeg:
   - **macOS**:
     ```bash
     # Using Homebrew
     brew install ffmpeg
     ```
   
   - **Linux (Ubuntu/Debian)**:
     ```bash
     sudo apt update
     sudo apt install ffmpeg
     ```

   Verify FFmpeg installation:
   ```bash
   ffmpeg -version
   ```

2. Clone this repository:
   ```bash
   git clone <repository-url>
   cd audio-transcription-tool
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the project root:
   ```bash
   touch .env
   ```

5. Add your OpenAI API key to the `.env` file:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## Usage

### Compressing Audio

The compression script converts M4A files to optimized MP3 format:

```bash
node compress.js path/to/your/audio.m4a
```

This will create a compressed MP3 file with the suffix "_compressed" in the same directory.

### Transcribing Audio

To transcribe a compressed audio file:

```bash
node transcribe.js path/to/your/compressed.mp3
```

For large files (>20MB), you can use the segment extraction feature by modifying the duration parameter in `transcribe.js`:

```javascript
extractAudioSegment("input.mp3", "output_segment.mp3", 300); // 300 seconds = 5 minutes
```

## Configuration

### Compression Settings

The audio compression is optimized for speech recognition with the following settings:
- Bitrate: 64k
- Sample Rate: 16kHz
- Channels: Mono
- Codec: libmp3lame
- Quality: 3 (good quality while maintaining small file size)

You can modify these settings in `compress.js` if needed.

### Transcription Settings

The transcription uses OpenAI's "whisper-1" model with text output format. You can modify the model or response format in `transcribe.js` if needed.

