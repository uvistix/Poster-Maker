import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const PostersGalleryOneSingle = ({ data }) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div>
            <div>
              <img
                className="animated img-fluid"
                src={process.env.PUBLIC_URL + data.image}
                alt=""
                height={"auto"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostersGalleryOneSingle.propTypes = {
  data: PropTypes.shape({}),
};

export default PostersGalleryOneSingle;
