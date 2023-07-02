import { useEffect, useState } from "react";

import "./visualizer.less";
import changed from "@/assets/images/cover/changed.png";
import rollin from "@/assets/images/cover/rollin.png";
import chimatbaram from "@/assets/images/cover/chimatbaram.png";
import goodbye from "@/assets/images/cover/goodbye.png";
import highheel from "@/assets/images/cover/highheel.png";
import redsun from "@/assets/images/cover/redsun.png";
import weride from "@/assets/images/cover/weride.png";
import youhu from "@/assets/images/cover/youhu.png";

const slides = [
  { src: changed },
  { src: rollin },
  { src: chimatbaram },
  { src: goodbye },
  { src: highheel },
  { src: redsun },
  { src: weride },
  { src: youhu },
];

const Visualizer = () => {
  const [slideList, setSlideList] = useState([]);
  const [averRotate, setAverRotate] = useState<number>(0);
  const [rotateIndex, setRotateIndex] = useState<number>(0);
  const [selectIndex, setSelectIndex] = useState<number>(0);

  const onCheckIndex = ({ index }: { index: number }) => {
    return selectIndex === index;
  };

  const onNext = () => {
    if (selectIndex <= 0) setSelectIndex(slideList.length - 1);
    else setSelectIndex((state) => state - 1);
    setRotateIndex((state) => state + 1);
  };

  useEffect(() => {
    const getSlide = slides;
    setSlideList(getSlide);
    setAverRotate(Math.ceil(360 / getSlide.length));
  }, []);

  return (
    <div className="visualizer-container">
      <div
        className="visualizer-slide-box"
        style={{
          transform: `rotate(${rotateIndex * averRotate}deg) translateY(-50%)`,
        }}
      >
        {slideList.map((item, index) => (
          <div
            key={index}
            className={`visualizer-slide-item`}
            style={{
              zIndex: `${onCheckIndex({ index }) ? "999" : ""}`,
              transform: `rotate(${index * averRotate}deg)  translate(1200px)`,
            }}
          >
            <img
              className={`visualizer-slide-cover${
                onCheckIndex({ index }) ? " select" : ""
              }`}
              src={item.src}
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>
      <button className="visualizer-button" onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default Visualizer;
