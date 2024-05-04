import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import postersSliderData from "../../data/hero-sliders/posters-gallery-one.json";
import PostersGalleryOneSingle from "../../components/hero-slider/PostersGalleryOneSingle.js";
import clsx from "clsx";
import PropTypes from "prop-types";

const params = {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  navigation: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
};

const PostersGallery = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      //   className="slider-area"
      className={clsx("support-area", spaceTopClass, spaceBottomClass)}
    >
      <div className="slider-active nav-style-1">
        {postersSliderData && (
          <Swiper options={params}>
            {postersSliderData.map((single, key) => (
              <SwiperSlide key={key}>
                <PostersGalleryOneSingle data={single} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

PostersGallery.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default PostersGallery;
