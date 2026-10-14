"""Gemini TTS through OpenRouter → mp3. The key comes from the OR_KEY environment variable only."""
import json, os, sys, subprocess, urllib.request
def speak(text, voice, style, out):
    body = {"model":"google/gemini-3.8-flash-tts","voice":voice,"response_format":"pcm","input":text,"instructions":style}
    req = urllib.request.Request("https://openrouter.ai/api/v1/audio/speech", data=json.dumps(body).encode(),
          headers={"Authorization":"Bearer "+os.environ["OR_KEY"],"Content-Type":"application/json"})
    try:
        pcm = urllib.request.urlopen(req, timeout=240).read()
    except urllib.error.HTTPError as e:
        raise SystemExit(f"HTTP {e.code}: {e.read()[:500]!r}")
    subprocess.run(["ffmpeg","-y","-loglevel","error","-f","s16le","-ar","24000","-ac","1","-i","-",
                    "-af","silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,loudnorm=I=-16:TP=-1.5",
                    "-ar","44100","-b:a","96k",out], input=pcm, check=True)
    return len(pcm)
if __name__ == "__main__":
    n = speak(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]); print(sys.argv[4], n, "bytes pcm")
