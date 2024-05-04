import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Logo = ({ imageUrl, logoClass }) => {
  return (
    <div className={clsx(logoClass)}>
      <Link to={process.env.PUBLIC_URL + "/"}>
        {/* <img alt="" src={process.env.PUBLIC_URL + imageUrl} width={200}/> */}
      <p className="fw-bold fs-4" style={{color:"#A749FF"}}>Just<span style={{color: "#404040"}}>Printings</span></p>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string
};

export default Logo;
