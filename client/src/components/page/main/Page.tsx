import { useEffect, useState } from "react";
import axios from "axios";

import Visualizer, { ListType } from "./Visualizer";

const Page = () => {
  const YOUTUBE_KEY = process.env.REACT_APP_YOUTUBE_KEY;
  const PLAYLIST_KEY = process.env.REACT_APP_PLAYLIST_VIDEO;

  const [list, setList] = useState<ListType>([]);

  const onLoad = async () => {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${YOUTUBE_KEY}`;
    const { data } = await axios.get(url, {
      params: { playlistId: PLAYLIST_KEY, part: "snippet", maxResults: 50 },
    });

    const getVideoIds = (item: any) => {
      const { snippet } = item;
      const videoId = snippet.resourceId.videoId;
      return videoId;
    };

    const videoIds = data.items.map(getVideoIds);

    const getUrls = (id: any) => [
      { get: `http://localhost:8080/stream?url=${id}`, responseType: "" },
      { get: `http://localhost:8080/play?url=${id}`, responseType: "blob" },
    ];

    const urls = videoIds.map(getUrls);

    const responses = await Promise.all(
      urls.map(async (request: any) => {
        const [res1, res2] = await Promise.all(
          request.map((req: any) => {
            return axios.get(req.get, { responseType: req.responseType });
          })
        );

        const { title, thumbnail } = res1.data;
        const audioFile = window.URL.createObjectURL(res2.data);
        return { title, audio: audioFile, cover: thumbnail.url };
      })
    );

    const getSongs = (res: any) => ({
      title: res.title,
      src: res.cover,
      file: res.audio,
    });

    const songs = responses.map(getSongs);
    setList(songs);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    list.length !== 0 && (
      <Visualizer data={list}>
        <Visualizer.Slide />
        <Visualizer.Canvas />
        <Visualizer.Audio />
      </Visualizer>
    )
  );
};

export default Page;
