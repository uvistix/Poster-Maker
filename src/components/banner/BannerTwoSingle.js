import PropTypes from "prop-types";
import clsx from "clsx"

const BannerTwoSingle = ({ data, spaceBottomClass }) => {
  return (
    <div className={clsx("single-banner", spaceBottomClass)}>
        <img src={process.env.PUBLIC_URL + data.image} alt="" style={{maxWidth: "350px"}}/>
    </div>
  );
};

BannerTwoSingle.propTypes = {
  data: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string
};

export default BannerTwoSingle;
