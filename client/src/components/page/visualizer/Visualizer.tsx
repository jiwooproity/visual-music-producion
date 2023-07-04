import { useEffect, useRef, useState } from "react";
import "./visualizer.less";

import rollin_sample from "@/assets/files/rollin.flac";

import { RotateAlbum } from "@/components";

let WIDTH = 0;
let HEIGHT = 0;
let bigBars = 0;
let barHeight = 0;
let defaultRadius = 0;

const fftSize = 4096;
const INTERVAL = 128;

let r = 0;
let g = 0;
let b = 0;
let a = 0;
let x = 0;

const Visualizer = () => {
  const canvasRef = useRef(null);
  const effectRef = useRef(null);
  const [context, setContext] = useState<CanvasRenderingContext2D>(null);
  const [efContext, setEfContext] = useState<CanvasRenderingContext2D>(null);
  const [audioContext, setAudioContext] = useState<AudioContext>(null);
  const [audioFile, setAudioFile] = useState<string>("");
  const [freqArr, setFreqArr] = useState([]);
  const [analyser, setAnalyser] = useState(null);

  const effectDraw = () => {
    defaultRadius = HEIGHT + 100;

    let gradient = efContext.createRadialGradient(
      window.innerWidth / 2,
      window.innerHeight / 2,
      800 - bigBars * 100,
      window.innerWidth / 2,
      window.innerHeight / 2,
      2400
    );

    gradient.addColorStop(1, "rgba(48, 61, 125, 0.8)");
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.02)");

    efContext.fillStyle = gradient;
    efContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
  };

  const visualizerInit = () => {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    r = 80;
    g = 20;
    b = 220;
    a = 0.5;
    x = 0;

    for (let i = 0; i < INTERVAL; i++) {
      r = r + 10;
      if (r > 255) r = 255;
      g = g + 1;
      if (g > 255) g = 255;
      b = b - 2;
      if (b < 0) b = 0;

      context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      context.beginPath();
      context.roundRect(
        x,
        HEIGHT - 90,
        WIDTH / INTERVAL - 4,
        2,
        [25, 25, 25, 25]
      );
      context.fill();

      x = x + WIDTH / INTERVAL;
    }
  };

  const visualizerDraw = () => {
    efContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.clearRect(0, 0, WIDTH, HEIGHT);
    bigBars = 0;
    r = 80;
    g = 20;
    b = 220;
    a = 0.5;
    x = 0;

    analyser.getByteFrequencyData(freqArr);

    for (let i = 0; i < INTERVAL; i++) {
      let num = i;

      if (
        (i >= 3 && i <= 7 && barHeight >= 115) ||
        (i === 4 && barHeight >= 95)
      ) {
        bigBars++;
      }

      barHeight = (freqArr[num] - 128) * 1;
      if (barHeight <= 1) barHeight = 2;

      r = r + 10;
      if (r > 255) r = 255;
      g = g + 1;
      if (g > 255) g = 255;
      b = b - 2;
      if (b < 0) b = 0;

      context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      context.beginPath();
      context.roundRect(
        x,
        HEIGHT - barHeight - 88,
        WIDTH / INTERVAL - 4,
        barHeight,
        [25, 25, 0, 0]
      );
      context.fill();
      context.closePath();

      context.beginPath();
      context.roundRect(
        x,
        HEIGHT - 88,
        WIDTH / INTERVAL - 4,
        barHeight / 8,
        [0, 0, 25, 25]
      );
      context.fill();

      x = x + WIDTH / INTERVAL;
    }

    if (bigBars >= 1) effectDraw();
    requestAnimationFrame(visualizerDraw);
  };

  const onResize = () => {
    const efCanvas = efContext.canvas;
    efCanvas.width = window.innerWidth;
    efCanvas.height = window.innerHeight;
  };

  const onPlay = () => {
    audioContext.resume();
    visualizerDraw();
  };

  useEffect(() => {
    if (efContext) {
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }
  }, [efContext]);

  useEffect(() => {
    if (context) {
      const canvas = context.canvas;
      WIDTH = canvas.width;
      HEIGHT = canvas.height;
      barHeight = HEIGHT;

      let audio = document.getElementById("audio") as HTMLAudioElement;
      audio.volume = 0.3;

      let audioContext = new AudioContext() as AudioContext;
      let analyser = audioContext.createAnalyser();
      analyser.fftSize = fftSize;

      let oscillator = audioContext.createOscillator();
      oscillator.connect(audioContext.destination);

      let source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      source.connect(audioContext.destination);

      let freqArr: any = new Uint8Array(analyser.frequencyBinCount);

      setAudioFile(rollin_sample);
      setFreqArr(freqArr);
      setAnalyser(analyser);
      setAudioContext(audioContext);
      visualizerInit();
    }
  }, [context]);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    canvas.width = 1500;
    canvas.height = 600;

    const effect = effectRef.current as HTMLCanvasElement;
    const efContext = effect.getContext("2d");
    effect.width = window.innerWidth;
    effect.height = window.innerHeight;

    setContext(context);
    setEfContext(efContext);
  }, []);

  return (
    <div className="visualizer-container">
      <RotateAlbum />
      <canvas ref={canvasRef} className="visualizer-canvas"></canvas>
      <canvas ref={effectRef} className="effect-canvas"></canvas>
      <audio
        src={audioFile}
        id="audio"
        crossOrigin="anonymous"
        controls
        onPlay={onPlay}
      />
    </div>
  );
};

export default Visualizer;
