export function playBeep(context) {
  const playSound = () => {
    const o = context.createOscillator();
    const g = context.createGain();
    o.connect(g);
    o.type = 'sine';
    g.connect(context.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);
  };

  playSound();
  setTimeout(playSound, 700);
  setTimeout(playSound, 900);
}
