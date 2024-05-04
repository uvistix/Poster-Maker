import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { useAuth } from "../../authContext/AuthContext";
import { useNavigate } from "react-router-dom";

const IconGroup = ({ iconWhiteClass }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)}>
      {user ? (
        <>
          <div className="same-style account-setting d-none d-lg-block">
            <button
              className="account-setting-active"
              onClick={(e) => handleClick(e)}
            >
              <i className="pe-7s-user" />
            </button>
            <div className="account-dropdown">
              <ul>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/my-account"}>
                    my account
                  </Link>
                </li>
                <li onClick={() => logout()}>
                  <Link>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="same-style cart-wrap d-block ">
            <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
              <i className="pe-7s-shopbag" />
              <span className="count-style">
                {cartItems && cartItems.length ? cartItems.length : 0}
              </span>
            </Link>
          </div>
        </>
      ) : (
        <button
          className="btn btn-dark btn-md"
          onClick={() => navigate("/login-register")}
        >
          Login
        </button>
      )}
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
