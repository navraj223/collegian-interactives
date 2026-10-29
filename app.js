const doorway = document.querySelector('details');
const sound = document.querySelector('#sound');
const status = document.querySelector('#audio-status');
const Audio = window.AudioContext || window.webkitAudioContext;
let audio;

if (Audio) {
  document.querySelector('.sound-option').hidden = false;
  doorway.querySelector('summary').addEventListener('click', async () => {
    if (doorway.open || !sound.checked) return;
    try {
      audio ??= new Audio();
      await audio.resume();
      if (audio.state !== 'running') throw new Error('Audio unavailable');
      const now = audio.currentTime;
      for (const [frequency, delay] of [[659.25, 0], [523.25, 0.42]]) {
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0, now + delay);
        gain.gain.linearRampToValueAtTime(0.12, now + delay + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.8);
        oscillator.connect(gain);
        gain.connect(audio.destination);
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
        oscillator.start(now + delay);
        oscillator.stop(now + delay + 0.85);
      }
      status.textContent = '';
    } catch {
      status.textContent = 'Sound is unavailable. You can still open the door.';
    }
  });
}
