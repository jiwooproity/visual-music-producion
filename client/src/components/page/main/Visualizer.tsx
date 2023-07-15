import { useMemo, useState, Dispatch, SetStateAction } from "react";
import { ReactNode, createContext } from "react";

import Slide from "./Slide";
import Canvas from "./Canvas";
import Audio from "./Audio";

import rollin from "./test/rollin_cover.png";
import weride from "./test/weride_cover.png";
import chimatbaram from "./test/chimatbaram_cover.png";
import goodbye from "./test/goodbye.png";
import whistle from "./test/whistle_cover.png";
import changed from "./test/changed_cover.png";
import redsun from "./test/redsun_cover.png";

import rollin_song from "./test/rollin.flac";
import weride_song from "./test/we_ride.flac";
import chimatbaram_song from "./test/chimatbaram.flac";
import goodbye_song from "./test/goodbye.flac";
import whistle_song from "./test/whistle.flac";
import changed_song from "./test/changed.flac";
import redsun_song from "./test/red_sun.flac";

export type ListType = { src: string; title: string; file: string }[];

type VisualizerProps = {
  children: ReactNode;
  data: ListType;
};

interface VisualizerContextTypes {
  list: ListType;
  setList: Dispatch<SetStateAction<ListType>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  play: boolean;
  setPlay: Dispatch<SetStateAction<boolean>>;
}

export const VisualizerContext = createContext<VisualizerContextTypes>({
  list: [],
  setList: () => {},
  title: "",
  setTitle: () => {},
  index: 0,
  setIndex: () => {},
  play: false,
  setPlay: () => {},
});

const Visualizer = (props: VisualizerProps) => {
  const { data, children } = props;

  const [index, setIndex] = useState<number>(0);
  const [title, setTitle] = useState<string>(data[index].title);
  const [play, setPlay] = useState<boolean>(false);
  const [list, setList] = useState([...data]);

  const contextMemo = () => ({
    list,
    setList,
    title,
    setTitle,
    index,
    setIndex,
    play,
    setPlay,
  });
  const context = useMemo(contextMemo, [
    list,
    setList,
    title,
    setTitle,
    index,
    setIndex,
    play,
    setPlay,
  ]);

  return (
    <VisualizerContext.Provider value={context}>
      {children}
    </VisualizerContext.Provider>
  );
};

Visualizer.Slide = Slide;
Visualizer.Canvas = Canvas;
Visualizer.Audio = Audio;

export default Visualizer;
