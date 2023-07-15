import { Dispatch, ReactNode, SetStateAction, useState } from "react";

import { SongsIF } from "../Main";
import { Button } from "@/common";

interface SlidePropsType {
  songs: SongsIF[];
  cover: string;
  onChangeSong: (type: string) => void;
  rotateInt: number;
  setRotateInt: Dispatch<SetStateAction<number>>;
}

interface SlideTransformPropsType {
  children: ReactNode;
  className: string;
  rotate: number;
  translate: string;
}

const SlideTransform = (props: SlideTransformPropsType) => {
  const { children, className } = props;
  const { rotate, translate } = props;
  const transform = `rotate(${rotate}deg) ${translate}`;

  return (
    <div className={className} style={{ transform }}>
      {children}
    </div>
  );
};

const Slide = (props: SlidePropsType) => {
  const { rotateInt, setRotateInt } = props;
  const { songs, onChangeSong } = props;
  const { cover } = props;

  const averageInt = Math.ceil(360 / 4);

  const onRotateSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as EventTarget;
    const { name } = target as HTMLButtonElement;

    switch (name) {
      case Slide.TYPE.NEXT:
        setRotateInt((state) => state - 1);
        break;
      case Slide.TYPE.PREV:
        setRotateInt((state) => state + 1);
        break;
      default:
        break;
    }

    onChangeSong(name);
  };

  return (
    <div className="slide-container">
      <SlideTransform
        className="slide-box"
        rotate={rotateInt * averageInt}
        translate="translateY(-50%)"
      >
        {Array.from({ length: 4 }).map((song, index) => (
          <SlideTransform
            key={index}
            className="slide-item"
            rotate={index * averageInt}
            translate="translate(1300px)"
          >
            <img src={cover} className="slide-item-cover" />
          </SlideTransform>
        ))}
      </SlideTransform>
      <Button
        className="slide-btn next"
        name={Slide.TYPE.NEXT}
        label=""
        onClick={onRotateSlide}
      />
      <Button
        className="slide-btn prev"
        name={Slide.TYPE.PREV}
        label=""
        onClick={onRotateSlide}
      />
    </div>
  );
};

Slide.TYPE = {
  NEXT: "next",
  PREV: "prev",
};

export default Slide;
