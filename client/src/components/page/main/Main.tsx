import { RotateAlbum, Visualizer } from "@/components";

import "./main.less";
import rollin_sample from "@/assets/files/rollin.flac";

const Main = () => {
  return (
    <div className="main-container">
      <RotateAlbum />
      <Visualizer file={rollin_sample} />
    </div>
  );
};

export default Main;
