import { useState } from "react";

import "./main.less";

import rollin_sample from "@/assets/files/rollin.flac";
import changed_sample from "@/assets/files/changed.flac";
import chimatbaram_sample from "@/assets/files/chimatbaram.flac";
import goodbye_sample from "@/assets/files/goodbye.flac";
import highheel_sample from "@/assets/files/hightheel.flac";
import redsun_sample from "@/assets/files/red_sun.flac";
import weride_sample from "@/assets/files/we_ride.flac";
import youhu_sample from "@/assets/files/youhu.flac";

import changed from "@/assets/images/cover/changed.png";
import rollin from "@/assets/images/cover/rollin.png";
import chimatbaram from "@/assets/images/cover/chimatbaram.png";
import goodbye from "@/assets/images/cover/goodbye.png";
import highheel from "@/assets/images/cover/highheel.png";
import redsun from "@/assets/images/cover/redsun.png";
import weride from "@/assets/images/cover/weride.png";
import youhu from "@/assets/images/cover/youhu.png";

import { RotateAlbum, Status, Visualizer } from "@/components";

interface SongsIF {
  src: string;
  audio: string;
}

const songs: SongsIF[] = [
  { src: rollin, audio: rollin_sample },
  { src: changed, audio: changed_sample },
  { src: chimatbaram, audio: chimatbaram_sample },
  { src: goodbye, audio: goodbye_sample },
  { src: highheel, audio: highheel_sample },
  { src: redsun, audio: redsun_sample },
  { src: weride, audio: weride_sample },
  { src: youhu, audio: youhu_sample },
];

const Main = () => {
  const [selectIdx, setSelectIdx] = useState<number>(0);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement>(null);

  return (
    <div className="main-container">
      <RotateAlbum
        selectIdx={selectIdx}
        setSelectIdx={setSelectIdx}
        audioEl={audioEl}
      />
      <Status audioEl={audioEl} />
      <Visualizer file={songs[selectIdx].audio} setAudioEl={setAudioEl} />
    </div>
  );
};

export default Main;
