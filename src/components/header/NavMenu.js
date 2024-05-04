import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "../../authContext/AuthContext";

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
  const { user, userData } = useAuth();

  return (
    <div
      className={clsx(
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      )}
    >
      <nav>
        <ul>
          {user && userData.userType==="admin" && 
          <li>
            <Link to={process.env.PUBLIC_URL + "/admin-dashboard"}>Dashboard</Link>
          </li>
          }
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>Home</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to={process.env.PUBLIC_URL + "/add-product"}>
                  Manage Products
                </Link>
              </li>
              <li className="mega-menu-title">
                <Link to={process.env.PUBLIC_URL + "/products"}>Products</Link>
              </li>
            </>
          )}
         
          <li>
            <Link to={process.env.PUBLIC_URL + "/about"}>About</Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>Contact</Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/subscriptions"}>Subscriptions</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
};

export default NavMenu;
