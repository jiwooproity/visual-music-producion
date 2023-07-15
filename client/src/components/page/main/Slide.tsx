import { useContext } from "react";

import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import "swiper/scss";
import lp_image from "./test/lp.png";
import { VisualizerContext } from "./Visualizer";
import Status from "./Status";

const Slide = () => {
  // const SPACE_BETWEEN = 0;
  // const SLIDES_PERVIEW = 1;
  const { list, setIndex, setTitle } = useContext(VisualizerContext);

  const options: SwiperProps = {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 300,
      modifier: 1,
      slideShadows: true,
    },
    navigation: {
      nextEl: ".status-next-button",
      prevEl: ".status-prev-button",
    },
    pagination: true,
    // spaceBetween: SPACE_BETWEEN,
    slidesPerView: 3,
    loopedSlides: 2,
    loop: true,
    modules: [EffectCoverflow, Pagination, Navigation],
    onSlideChange(swiper) {
      setIndex(swiper.realIndex);
      setTitle(list[swiper.realIndex].title);
    },
  };

  return (
    <VisualizerContext.Consumer>
      {(state) => (
        <div className="slide-container">
          <div className="slide-background-backdrop" />
          {state.list.map((song, idx) => (
            <div
              key={idx}
              className={`slide-background ${
                idx === state.index ? "active" : ""
              }`}
            >
              <img src={song.src} />
            </div>
          ))}
          <div className="slide-wrapper">
            <div className="swiper-container">
              <Swiper {...options}>
                {state.list.map((song, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="image-wrapper">
                      <div className="active-backdrop" />
                      <img className="lp-image" src={lp_image} />
                      <img src={song.src} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="slide-wrapper">
            <Status />
          </div>
        </div>
      )}
    </VisualizerContext.Consumer>
  );
};

export default Slide;
