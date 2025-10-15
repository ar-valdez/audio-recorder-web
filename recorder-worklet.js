// recorder-worklet.js
class WavRecorderProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0];
    if (input && input[0]) {
      const ch0 = input[0];
      const buf = new Float32Array(ch0.length);
      buf.set(ch0);
      this.port.postMessage({ type: 'chunk', samples: buf }, [buf.buffer]);
    }
    return true;
  }
}
registerProcessor('wav-recorder-processor', WavRecorderProcessor);
