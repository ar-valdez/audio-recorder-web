# TalkingSick Audio Recorder

- Records stereo WAV audio (16-bit PCM), with a 10-second maximum.
- The plain site URL opens a form for manual entry: `https://ar-valdez.github.io/audio-recorder-web/`.
- A participant-specific path prefills the form. Example: `https://ar-valdez.github.io/audio-recorder-web/S666_M_37` (User ID, gender, age).
- Accepted gender values are `M`, `F`, or `X`; `Male`, `Female`, and `Other` are also accepted. User IDs use one letter and three digits; age must be 0–120.
- Recordings use `userID_G_AGE_audio_dd_mm_yyyy_hh_mm_ss.wav` and upload to the configured Google Apps Script endpoint.
- `404.html` is the GitHub Pages fallback that allows participant-specific paths to load. Keep it in sync with `index.html`.
- The workflow publishes `index.html`, `404.html`, `recorder-worklet.js`, `.nojekyll`, and supporting project files to the public Pages repository.
- Deploy `Code.gs` separately as a Google Apps Script Web App. The web page posts recordings to its `WEB_APP_URL`.
