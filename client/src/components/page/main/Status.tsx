import { useContext, useEffect, useState } from "react";
import { VisualizerContext } from "./Visualizer";

const Status = () => {
  let interval: any = null;

  const { title, play, setPlay } = useContext(VisualizerContext);
  const [currentMin, setCurrentMin] = useState<string>("00 : 00");
  const [totalMin, setTotalMin] = useState<string>("00 : 00");
  const [percent, setPercent] = useState<number>(0);

  const convNaN = (time: number) => {
    return isNaN(time) ? "00" : time;
  };

  const onPlay = () => {
    clearInterval(interval);
    const audio = document.getElementById("audio") as HTMLAudioElement;
    audio.play();
    setPlay(true);
  };

  const onPause = () => {
    clearInterval(interval);
    const audio = document.getElementById("audio") as HTMLAudioElement;
    audio.pause();
    setPlay(false);
  };

  useEffect(() => {
    clearInterval(interval);
  }, [play]);

  useEffect(() => {
    const audio = document.getElementById("audio") as HTMLAudioElement;

    interval = setInterval(function () {
      let current = audio.currentTime;
      let cMinutes = String(Math.floor(current / 60)).padStart(2, "0");
      let cSeconds = String(Math.floor(current % 60)).padStart(2, "0");
      setCurrentMin(`${cMinutes} : ${cSeconds}`);

      let total = audio.duration;
      let tMinutes = String(convNaN(Math.floor(total / 60))).padStart(2, "0");
      let tSeconds = String(convNaN(Math.floor(total % 60))).padStart(2, "0");
      setTotalMin(`${tMinutes} : ${tSeconds}`);

      setPercent((audio.currentTime / audio.duration) * 100);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-container">
      <div className="status-title-box">
        <h1 className="status-title">{title}</h1>
      </div>
      <div className="status-progress-bar">
        <div className="status-bar" style={{ width: `${percent}%` }} />
      </div>
      <div className="status-time-box">
        <span className="status-time">{currentMin}</span>
        <span className="status-time">{totalMin}</span>
      </div>
      <div className="status-control-box">
        <button
          className="status-prev-button"
          onClick={() => clearInterval(interval)}
        ></button>
        {play ? (
          <button className="status-pause-button" onClick={onPause}></button>
        ) : (
          <button className="status-play-button" onClick={onPlay}></button>
        )}
        <button
          className="status-next-button"
          onClick={() => clearInterval(interval)}
        ></button>
      </div>
    </div>
  );
};

export default Status;
