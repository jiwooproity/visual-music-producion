import { useEffect, useState } from "react";

import { Audio, Canvas, Slide, Status } from "@/components";
import axios from "axios";

export interface SongsIF {
  audio: string;
  cover: string;
}

const Main = () => {
  const YOUTUBE_KEY = process.env.REACT_APP_YOUTUBE_KEY;
  const PLAYLIST_KEY = process.env.REACT_APP_PLAYLIST_VIDEO;

  const [songs, setSongs] = useState<SongsIF[]>([]);
  const [select, setSelect] = useState<number>(0);
  const [rotateInt, setRotateInt] = useState<number>(0);
  const [audio, setAudio] = useState<string>("");
  const [cover, setCover] = useState<string>("");

  const onLoad = async () => {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${YOUTUBE_KEY}`;
    const params = {
      playlistId: PLAYLIST_KEY,
      part: "snippet",
      maxResults: 50,
    };
    const { data } = await axios.get(url, { params: { ...params } });
    const { items } = data;
    const snippets = items.map((item: any) => item.snippet);
    const videoIds = snippets.map((sni: any) => sni.resourceId.videoId);
    setSongs(videoIds);

    const requests = videoIds.map((id: any) => {
      return [
        { get: `http://localhost:8080/stream?url=${id}`, responseType: "" },
        { get: `http://localhost:8080/play?url=${id}`, responseType: "blob" },
      ];
    });

    const responses = await Promise.all(
      requests.map(async (request: any) => {
        const [res1, res2] = await Promise.all(
          request.map((req: any) => {
            return axios.get(req.get, { responseType: req.responseType });
          })
        );

        const { thumbnail } = res1.data;
        const audioFile = window.URL.createObjectURL(res2.data);
        return { audio: audioFile, cover: thumbnail.url };
      })
    );

    setSongs(responses);
    setAudio(responses[select].audio);
    setCover(responses[select].cover);
  };

  const onChangeSong = (type: string) => {
    let next = select;

    switch (type) {
      case Slide.TYPE.NEXT:
        if (next - 1 < 0) next = songs.length - 1;
        else next -= 1;
        break;
      case Slide.TYPE.PREV:
        if (next + 1 > songs.length - 1) next = 0;
        else next += 1;
        break;
      default:
        break;
    }

    setSelect(next);
    setAudio(songs[next].audio);
    setCover(songs[next].cover);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <>
      <img src={cover} className="main-background" />
      <div className="main-backdrop-filter" />
      <div className="main-container">
        <div className="main-top-area">
          <Slide
            songs={songs}
            cover={cover}
            onChangeSong={onChangeSong}
            rotateInt={rotateInt}
            setRotateInt={setRotateInt}
          />
          <Status />
        </div>
        <div className="main-bottom-area">
          <Canvas />
          <Audio
            audio={audio}
            setRotateInt={setRotateInt}
            onChangeSong={onChangeSong}
          />
        </div>
      </div>
    </>
  );
};

export default Main;
