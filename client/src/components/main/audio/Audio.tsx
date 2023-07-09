import { Dispatch, SetStateAction, useEffect } from "react";

import Slide from "../slide/Slide";

interface AudioPropsType {
  audio: string;
  setRotateInt: Dispatch<SetStateAction<number>>;
  onChangeSong: (type: string) => void;
}

const Audio = (props: AudioPropsType) => {
  const { setRotateInt, onChangeSong } = props;
  const { audio } = props;

  const onEndedAudio = () => {
    setRotateInt((state) => state - 1);
    onChangeSong(Slide.TYPE.NEXT);
  };

  useEffect(() => {
    if (audio) {
      const audio = document.getElementById("audio") as HTMLAudioElement;
      audio.play();
    }
  }, [audio]);

  return <audio src={audio} id="audio" onEnded={onEndedAudio} />;
};

export default Audio;
