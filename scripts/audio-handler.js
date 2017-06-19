import constants from './constants';

const { YELLOW, BLUE, RED, GREEN } = constants;
const { DO, FA, SI, MI } = constants;
const WAVE_TYPE = 'square';
const soundFrequencies = {
  [RED]: DO,
  [BLUE]: FA,
  [YELLOW]: SI,
  [GREEN]: MI
};

export default class AudioHandler {
  constructor() {
    this.context = new AudioContext();
    this.volume = this.context.createGain();

    this.volume.connect(this.context.destination);
    this.oscillatorType = WAVE_TYPE;
  }

  playNote(color) {
    const oscillator = this.createNoteOscillator(color);

    oscillator.start(this.context.currentTime);
    oscillator.stop(this.context.currentTime + 0.5);
  }

  createNoteOscillator(color) {
    const oscillator = this.context.createOscillator();

    oscillator.type = this.oscillatorType;
    oscillator.frequency.value = soundFrequencies[color];
    oscillator.connect(this.volume);
    return oscillator;
  }
}
