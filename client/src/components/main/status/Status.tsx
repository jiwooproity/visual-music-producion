import { useEffect, useState } from "react";

const Status = () => {
  const [currentMin, setCurrentMin] = useState<string>("00 : 00");
  const [totalMin, setTotalMin] = useState<string>("00 : 00");
  const [percent, setPercent] = useState<number>(0);

  const convNaN = (time: number) => {
    return isNaN(time) ? "00" : time;
  };

  useEffect(() => {
    let interval: any = null;

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
      <div className="status-progress-bar">
        <div className="status-bar" style={{ width: `${percent}%` }} />
      </div>
      <div className="status-time-box">
        <span className="status-time">{`${currentMin} / ${totalMin}`}</span>
      </div>
    </div>
  );
};

export default Status;
