// recorder-worklet.js — posts stereo float32 chunks to the main thread
class WavRecorderProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._bufferSize = 2048; // messaging chunk size (samples per channel)
    this._left = new Float32Array(this._bufferSize);
    this._right = new Float32Array(this._bufferSize);
    this._offset = 0;
  }

  process(inputs, outputs, parameters) {
    // One input, up to N channels
    const input = inputs[0];
    if (!input || input.length === 0) return true;

    const chL = input[0] || new Float32Array(128);
    const chR = input[1] || chL; // duplicate if only one channel supplied by device/OS

    const frames = chL.length;
    let i = 0;
    while (i < frames) {
      const space = this._bufferSize - this._offset;
      const chunk = Math.min(space, frames - i);
      this._left.set(chL.subarray(i, i + chunk), this._offset);
      this._right.set(chR.subarray(i, i + chunk), this._offset);
      this._offset += chunk;
      i += chunk;

      if (this._offset >= this._bufferSize) {
        this.port.postMessage({
          type: 'chunk',
          left: this._left,
          right: this._right
        });
        // allocate fresh buffers (transfer is not used here for simplicity)
        this._left = new Float32Array(this._bufferSize);
        this._right = new Float32Array(this._bufferSize);
        this._offset = 0;
      }
    }

    return true; // keep alive
  }
}

registerProcessor('wav-recorder-processor', WavRecorderProcessor);
