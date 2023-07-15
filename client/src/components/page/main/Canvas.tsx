import { useEffect, useRef, useState } from "react";

const Canvas = () => {
  const FFT_SIZE = 4096;
  const INTERVAL = 110;

  const visualRef = useRef();
  const [offset, setOffset] = useState({ WIDTH: 1400, HEIGHT: 600 });
  const [context, setContext] = useState<CanvasRenderingContext2D>(null);
  const [freqArr, setFreqArr] = useState<Uint8Array>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode>(null);
  const [audioContext, setAudioContext] = useState<AudioContext>(null);

  const CanvasInit = () => {
    let x = 0;
    let r = 80;
    let g = 20;
    let b = 220;
    const { WIDTH, HEIGHT } = offset;
    context.clearRect(0, 0, WIDTH, HEIGHT);

    for (let frame = 0; frame < INTERVAL; frame++) {
      r = r + 10;
      if (r > 255) {
        r = 255;
      }

      g = g + 2;
      if (g > 255) {
        g = 255;
      }

      b = b - 1;
      if (b < 0) {
        b = 255;
      }

      context.fillStyle = "rgba(" + r + "," + g + "," + b + ", " + 0.5 + ")";
      context.beginPath();

      const upHeight = HEIGHT - 122;
      const downHeight = HEIGHT - 120;

      const lineWidth = WIDTH / INTERVAL - 4;

      const upRounding = [25, 25, 0, 0];
      const downRounding = [0, 0, 25, 25];

      context.roundRect(x, upHeight, lineWidth, 2, upRounding);
      context.fill();
      context.closePath();

      context.fillStyle = "rgba(" + r + "," + g + "," + b + ", " + 0.8 + ")";
      context.beginPath();
      context.roundRect(x, downHeight, lineWidth, 2, downRounding);
      context.fill();
      context.closePath();

      context.closePath();

      x = x + WIDTH / INTERVAL;
    }
  };

  const CanvasDraw = () => {
    if (context) {
      let x = 0;
      let r = 80;
      let g = 20;
      let b = 220;
      let barHeight = 2;
      const { WIDTH, HEIGHT } = offset;
      context.clearRect(0, 0, WIDTH, HEIGHT);
      analyser.getByteFrequencyData(freqArr);

      for (let frame = 0; frame < INTERVAL; frame++) {
        let num = frame;

        barHeight = (freqArr[num] - 128) * 1;
        if (barHeight <= 1) barHeight = 2;

        r = r + 10;
        if (r > 255) {
          r = 255;
        }

        g = g + 2;
        if (g > 255) {
          g = 255;
        }

        b = b - 1;
        if (b < 0) {
          b = 255;
        }

        context.fillStyle = "rgba(" + r + "," + g + "," + b + ", " + 0.5 + ")";
        context.beginPath();

        const upHeight = HEIGHT - barHeight - 120;
        const downHeight = HEIGHT - 120;

        const lineWidth = WIDTH / INTERVAL - 4;

        const upRounding = [25, 25, 0, 0];
        const downRounding = [0, 0, 25, 25];

        context.roundRect(x, upHeight, lineWidth, barHeight, upRounding);
        context.fill();
        context.closePath();

        context.fillStyle = "rgba(" + r + "," + g + "," + b + ", " + 0.8 + ")";
        context.beginPath();
        context.roundRect(
          x,
          downHeight,
          lineWidth,
          barHeight / 8 > 1 ? barHeight / 8 : 2,
          downRounding
        );
        context.fill();
        context.closePath();

        x = x + WIDTH / INTERVAL;
      }

      requestAnimationFrame(CanvasDraw);
    }
  };

  useEffect(() => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    audio.addEventListener("play", CanvasDraw);
    return () => audio.addEventListener("play", CanvasDraw);
  }, [audioContext]);

  useEffect(() => {
    if (context) {
      const canvas = context.canvas;
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;
      setOffset({ WIDTH, HEIGHT });

      let audio = document.getElementById("audio") as HTMLAudioElement;
      audio.volume = 0.3;

      let audioContext = new AudioContext() as AudioContext;
      let analyser = audioContext.createAnalyser();
      analyser.fftSize = FFT_SIZE;

      let oscillator = audioContext.createOscillator();
      oscillator.connect(audioContext.destination);

      let source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      source.connect(audioContext.destination);

      let freqArr: any = new Uint8Array(analyser.frequencyBinCount);
      setFreqArr(freqArr);
      setAnalyser(analyser);
      setAudioContext(audioContext);
      CanvasInit();
    }
  }, [context]);

  useEffect(() => {
    const canvas = visualRef.current as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    setContext(context);
  }, []);

  return (
    <div className="canvas-container">
      <canvas
        id="visualizer"
        ref={visualRef}
        width={1400}
        height={600}
      ></canvas>
    </div>
  );
};

export default Canvas;
