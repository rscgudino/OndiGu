// Subtle Sound Design using Native Web Audio API (zero external mp3 dependencies)
class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ondigu_sound_enabled');
      this.enabled = stored === 'true';
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ondigu_sound_enabled', this.enabled ? 'true' : 'false');
    }
    if (this.enabled) {
      this.initCtx();
      this.playSwitch(true);
    }
    return this.enabled;
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft mechanical click for buttons/sliders
  public playClick() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // AudioContext policy safe fallback
    }
  }

  // Futuristic gentle tick for tabs & sliders
  public playTick() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {
      // Safe fallback
    }
  }

  // Pleasant success chime for completing forms or scanning
  public playSuccess() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 chord

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.035, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
    } catch {
      // Safe fallback
    }
  }

  // Switch sound
  public playSwitch(stateOn: boolean) {
    if (!this.enabled && !stateOn) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(stateOn ? 440 : 550, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(stateOn ? 880 : 330, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Safe fallback
    }
  }

  // Playful Cartoon / Tom & Jerry / Minion Style Launch "BOING-POP"
  public playCartoonBoing() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Rubber cartoon spring ("BOOOING!")
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      // Classic cartoon rubber bend: scoop then spring upward
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(720, now + 0.26);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.44);

      // Spring vibrato / wobble (Hanna-Barbera ruler flick style)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(26, now); // 26 Hz spring wobble
      lfoGain.gain.setValueAtTime(50, now);
      lfoGain.gain.exponentialRampToValueAtTime(1, now + 0.44);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + 0.48);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.46);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.48);

      // 2. High-pitched cartoon squeak / Minion chirp ("Whoop-wee!")
      const chirp = this.ctx.createOscillator();
      const chirpGain = this.ctx.createGain();
      chirp.type = 'sine';
      chirp.frequency.setValueAtTime(820, now + 0.05);
      chirp.frequency.exponentialRampToValueAtTime(1550, now + 0.20);
      chirp.frequency.exponentialRampToValueAtTime(980, now + 0.32);

      chirpGain.gain.setValueAtTime(0.05, now + 0.05);
      chirpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      chirp.connect(chirpGain);
      chirpGain.connect(this.ctx.destination);
      chirp.start(now + 0.05);
      chirp.stop(now + 0.36);

      // 3. Comedic cartoon bubble "POP"
      const pop = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();
      pop.type = 'sine';
      pop.frequency.setValueAtTime(1200, now + 0.22);
      pop.frequency.exponentialRampToValueAtTime(320, now + 0.31);

      popGain.gain.setValueAtTime(0.07, now + 0.22);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      pop.connect(popGain);
      popGain.connect(this.ctx.destination);
      pop.start(now + 0.22);
      pop.stop(now + 0.34);
    } catch {
      // Safe fallback
    }
  }

  // Playful Cartoon Landing ("Squish-Bloop / Wub-wub")
  public playCartoonLand() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Rubber landing "Squish-pop"
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.22);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);

      // 2. Cute comedic double-blip (Minion "Ta-da!")
      const blip = this.ctx.createOscillator();
      const blipGain = this.ctx.createGain();
      blip.type = 'triangle';
      blip.frequency.setValueAtTime(520, now + 0.07);
      blip.frequency.exponentialRampToValueAtTime(880, now + 0.18);

      blipGain.gain.setValueAtTime(0.06, now + 0.07);
      blipGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      blip.connect(blipGain);
      blipGain.connect(this.ctx.destination);
      blip.start(now + 0.07);
      blip.stop(now + 0.24);
    } catch {
      // Safe fallback
    }
  }
}

export const soundFx = new SoundManager();
