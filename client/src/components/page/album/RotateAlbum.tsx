import { EventHandler, useState } from "react";

import "./rotateAlbum.less";
import changed from "@/assets/images/cover/changed.png";
import rollin from "@/assets/images/cover/rollin.png";
import chimatbaram from "@/assets/images/cover/chimatbaram.png";
import goodbye from "@/assets/images/cover/goodbye.png";
import highheel from "@/assets/images/cover/highheel.png";
import redsun from "@/assets/images/cover/redsun.png";
import weride from "@/assets/images/cover/weride.png";
import youhu from "@/assets/images/cover/youhu.png";

import { DefaultButton } from "@/common";
import { RotateStyle } from "@/components";

const images = [
  { src: changed },
  { src: rollin },
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

const RotateAlbum = () => {
  const [rotateIdx, setRotateIdx] = useState<number>(0);
  const [selectIdx, setSelectIdx] = useState<number>(0);

  const averRotate = Math.ceil(360 / images.length);

  const isSelect = (index: number, active: string) => {
    return selectIdx === index ? active : "";
  };

  const onRotate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const direction = target.dataset.type;

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
  };

  return (
    <>
      {images.map((image, index) => (
        <img
          className={`album-background ${isSelect(index, "select")}`}
          src={image.src}
        />
      ))}
      <div className="album-background-filter"></div>
      <div className="album-container">
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
              <img
                className={`album-cover ${isSelect(index, "select")}`}
                src={image.src}
                width={500}
                height={500}
              />
              <div className={`album-lp ${isSelect(index, "select")}`} />
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
