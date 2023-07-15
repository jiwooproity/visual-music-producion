import { useEffect, useRef, useState } from "react";

const Canvas = () => {
  const fftSize = 4096;
  const INTERVAL = 128;
  const canvasRef = useRef();
  const [offset, setOffset] = useState({ WIDTH: 1600, HEIGHT: 600 });
  const [context, setContext] = useState<CanvasRenderingContext2D>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext>(null);
  const [analyser, setAnalyser] = useState(null);
  const [freqArr, setFreqArr] = useState([]);

  const CanvasInit = () => {
    let x = 0;
    const { WIDTH, HEIGHT } = offset;
    context.clearRect(0, 0, WIDTH, HEIGHT);

    for (let frame = 0; frame < INTERVAL; frame++) {
      context.fillStyle = "rgba(255, 255, 255, 0.5)";
      context.beginPath();

      const lineHeight = HEIGHT - 88;
      const lineWidth = WIDTH / INTERVAL - 4;
      const rounding = [25, 25, 25, 25];
      context.roundRect(x, lineHeight, lineWidth, 2, rounding);
      context.fill();

      x = x + WIDTH / INTERVAL;
    }
  };

  const CanvasDraw = () => {
    let x = 0;
    let barHeight = 0;
    const { WIDTH, HEIGHT } = offset;
    context.clearRect(0, 0, WIDTH, HEIGHT);
    analyser.getByteFrequencyData(freqArr);

    for (let frame = 0; frame < INTERVAL; frame++) {
      let num = frame;

      barHeight = (freqArr[num] - 128) * 1;
      if (barHeight <= 1) barHeight = 2;

      context.fillStyle = "rgba(255, 255, 255, 0.5)";
      context.beginPath();

      const upHeight = HEIGHT - barHeight - 88;
      const downHeight = HEIGHT - 88;

      const lineWidth = WIDTH / INTERVAL - 4;

      const upRounding = [25, 25, 0, 0];
      const downRounding = [0, 0, 25, 25];

      context.roundRect(x, upHeight, lineWidth, barHeight, upRounding);
      context.fill();
      context.closePath();

      context.fillStyle = "rgba(255, 255, 255, 0.5)";
      context.beginPath();
      context.roundRect(x, downHeight, lineWidth, barHeight / 8, downRounding);
      context.fill();
      context.closePath();

      x = x + WIDTH / INTERVAL;
    }

    requestAnimationFrame(CanvasDraw);
  };

  useEffect(() => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    audio.addEventListener("play", CanvasDraw);
    return () => audio.removeEventListener("play", CanvasDraw);
  }, [audioCtx]);

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
      analyser.fftSize = fftSize;

      let oscillator = audioContext.createOscillator();
      oscillator.connect(audioContext.destination);

      let source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      source.connect(audioContext.destination);

      let freqArr: any = new Uint8Array(analyser.frequencyBinCount);
      setFreqArr(freqArr);
      setAnalyser(analyser);
      setAudioCtx(audioContext);
      CanvasInit();
    }
  }, [context]);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    setContext(context);
  }, []);

  return (
    <div className="canvas-container">
      <canvas
        id="visualizer"
        ref={canvasRef}
        width={1200}
        height={600}
      ></canvas>
    </div>
  );
};

export default Canvas;
