import { Link } from "react-router-dom";
import { useAuth } from "../../../authContext/AuthContext";

const MobileNavMenu = () => {
  const { user, userData } = useAuth();

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
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
              <li className="mega-menu-title">
                <Link to={process.env.PUBLIC_URL + "/my-account"}>My Account</Link>
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
  );
};

export default MobileNavMenu;
