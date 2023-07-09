import { Dispatch, SetStateAction, useState } from "react";

import "./rotateAlbum.less";
import changed from "@/assets/images/cover/changed.png";
import rollin from "@/assets/images/cover/rollin.png";
import chimatbaram from "@/assets/images/cover/chimatbaram.png";
import goodbye from "@/assets/images/cover/goodbye.png";
import highheel from "@/assets/images/cover/highheel.png";
import redsun from "@/assets/images/cover/redsun.png";
import weride from "@/assets/images/cover/weride.png";
import youhu from "@/assets/images/cover/youhu.png";

import { DefaultButton, LazyImage } from "@/common";
import { RotateStyle } from "@/components";

const images = [
  { src: rollin },
  { src: changed },
  { src: chimatbaram },
  { src: goodbye },
  { src: highheel },
  { src: redsun },
  { src: weride },
  { src: youhu },
];

const ButtonType = {
  PREV: "prev",
  NEXT: "next",
};

interface RotateAlbumPropsType {
  selectIdx: number;
  setSelectIdx: Dispatch<SetStateAction<number>>;
  audioEl: HTMLAudioElement;
}

const RotateAlbum = (props: RotateAlbumPropsType) => {
  const { selectIdx, setSelectIdx } = props;
  const { audioEl } = props;

  let timeout: any = null;

  const [rotateIdx, setRotateIdx] = useState<number>(0);
  const [visibleLP, setVisibleLP] = useState<boolean>(true);
  const averRotate = Math.ceil(360 / images.length);

  const isSelect = (index: number, active: string) => {
    return selectIdx === index ? active : "";
  };

  const onRotate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const direction = target.dataset.type;
    audioEl.pause();

    clearTimeout(timeout);
    setVisibleLP(false);

    switch (direction) {
      case ButtonType.PREV:
        if (selectIdx >= images.length - 1) setSelectIdx(0);
        else setSelectIdx((state) => state + 1);
        setRotateIdx((state) => state - 1);
        break;
      case ButtonType.NEXT:
        if (selectIdx <= 0) setSelectIdx(images.length - 1);
        else setSelectIdx((state) => state - 1);
        setRotateIdx((state) => state + 1);
        break;
      default:
        break;
    }

    timeout = setTimeout(() => {
      setVisibleLP(true);
      audioEl.play();
    }, 500);
  };

  return (
    <>
      {images.map((image, index) => (
        <LazyImage
          key={index}
          className={`album-background ${isSelect(index, "select")}`}
          src={image.src}
          alt="LP"
        />
      ))}
      <div className="album-background-filter" />
      <div className="album-container">
        <div className={`album-lp ${visibleLP ? "select" : ""}`} />
        <RotateStyle
          className="album-slide-box"
          rotate={rotateIdx * averRotate}
          translate="translateY(-50%)"
        >
          {images.map((image, index) => (
            <RotateStyle
              key={index}
              className="album-slide-item"
              rotate={index * averRotate}
              translate="translate(1200px)"
              zIndex={isSelect(index, "999")}
            >
              <LazyImage
                className={`album-cover ${isSelect(index, "select")}`}
                src={image.src}
                width="500px"
                height="500px"
                alt="lazy"
              />
            </RotateStyle>
          ))}
        </RotateStyle>
        <DefaultButton
          className="rotate-button prev"
          data={ButtonType.PREV}
          onClick={onRotate}
        />
        <DefaultButton
          className="rotate-button next"
          data={ButtonType.NEXT}
          onClick={onRotate}
        />
      </div>
    </>
  );
};

export default RotateAlbum;
