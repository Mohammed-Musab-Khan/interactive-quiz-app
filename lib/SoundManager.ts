class SoundManager {
  private isMuted: boolean = false;
  private audioCtx: AudioContext | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("quiz_muted");
      this.isMuted = stored === "true";
    }
  }

  private initCtx() {
    if (!this.audioCtx && typeof window !== "undefined") {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("quiz_muted", String(this.isMuted));
    }
    return this.isMuted;
  }

  getMuteStatus(): boolean {
    return this.isMuted;
  }

  playCorrect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }

    const t = this.audioCtx.currentTime;

    // Play an ascending bell-like tone (C5 then E5)
    this.playTone(523.25, "sine", t, 0.1, 0.15);
    this.playTone(659.25, "sine", t + 0.08, 0.18, 0.15);
  }

  playIncorrect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }

    const t = this.audioCtx.currentTime;

    // Play a descending buzz tone (A3 then F#3)
    this.playTone(220.00, "triangle", t, 0.15, 0.2);
    this.playTone(185.00, "triangle", t + 0.1, 0.2, 0.2);
  }

  playComplete() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }

    const t = this.audioCtx.currentTime;

    // Play short fanfare: C4, E4, G4, C5
    this.playTone(261.63, "sine", t, 0.15, 0.15); // C4
    this.playTone(329.63, "sine", t + 0.15, 0.15, 0.15); // E4
    this.playTone(392.00, "sine", t + 0.3, 0.15, 0.15); // G4
    this.playTone(523.25, "sine", t + 0.45, 0.4, 0.2); // C5
  }

  private playTone(freq: number, type: OscillatorType, start: number, duration: number, volume: number) {
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(volume, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration - 0.01);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(start);
      osc.stop(start + duration);
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  }
}

export const getSoundManager = () => {
  if (typeof window !== "undefined") {
    return new SoundManager();
  }
  return null;
};
