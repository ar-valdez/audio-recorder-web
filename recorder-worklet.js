// recorder-worklet.js
// AudioWorkletProcessor that forwards mono channel data to main thread
class WavRecorderProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input && input[0]) {
      const ch0 = input[0];
      const buf = new Float32Array(ch0.length);
      buf.set(ch0);
      this.port.postMessage({ type: 'chunk', samples: buf }, [buf.buffer]);
    }
    if (outputs[0] && outputs[0][0]) {
      outputs[0][0].fill(0);
    }
    return true;
  }
}
registerProcessor('wav-recorder-processor', WavRecorderProcessor);
