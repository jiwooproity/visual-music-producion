import { useEffect, useState } from "react";
import "./status.less";

interface StatusPropsType {
  audioEl: HTMLAudioElement;
}

const Status = (props: StatusPropsType) => {
  const { audioEl } = props;

  let interval: any = null;

  const [percent, setPercent] = useState<number>(0);
  const [currentMin, setCurrentMin] = useState<string>("00 : 00");

  const getDurationTime = (duration: number) => {
    const convNaN = (time: number) => {
      return isNaN(time) ? "00" : time;
    };

    let minutes = String(convNaN(Math.floor(duration / 60))).padStart(2, "0");
    let seconds = String(convNaN(Math.floor(duration % 60))).padStart(2, "0");
    return `${minutes} : ${seconds}`;
  };

  useEffect(() => {
    if (audioEl) {
      interval = setInterval(function () {
        let realTime = audioEl.currentTime;
        let currentMinutes = String(Math.floor(realTime / 60)).padStart(2, "0");
        let currentSeconds = String(Math.floor(realTime % 60)).padStart(2, "0");
        setCurrentMin(`${currentMinutes} : ${currentSeconds}`);
        setPercent((audioEl.currentTime / audioEl.duration) * 100);
      }, 500);
    }

    return () => clearInterval(interval);
  }, [audioEl]);

  return (
    <div className="status-container">
      <div className="status-bar">
        <div className="status-percent" style={{ width: `${percent}%` }} />
      </div>
      <div className="status-time-wrapper">
        <span className="status-time">{`${currentMin} `}</span>
        <span className="status-time">
          {audioEl ? `/ ${getDurationTime(audioEl.duration)}` : "00 : 00"}
        </span>
      </div>
    </div>
  );
};

export default Status;
