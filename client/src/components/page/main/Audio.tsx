import { useContext, useEffect, useRef } from "react";

import { VisualizerContext } from "./Visualizer";

const Audio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { list, index, setPlay } = useContext(VisualizerContext);

  useEffect(() => {
    setPlay(false);
  }, [index]);

  return <audio id="audio" ref={audioRef} src={list[index].file}></audio>;
};

export default Audio;
