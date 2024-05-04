import PropTypes from "prop-types";
import clsx from "clsx"
import bannerData from "../../data/banner/banner-two.json";
import BannerTwoSingle from "../../components/banner/BannerTwoSingle.js";

const BannerTwo = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row ">
          {bannerData?.map((single, key) => (
            <div className="col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center" key={key}>
              <BannerTwoSingle data={single} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BannerTwo.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerTwo;
