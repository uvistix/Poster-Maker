import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SEO from "../components/seo";
import LayoutOne from "../layouts/LayoutOne";
import { deleteFromCart, deleteAllFromCart } from "../store/slices/cart-slice";
import "react-datepicker/dist/react-datepicker.css";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import { useSubscription } from "../authContext/SubscriptionProvider";

const Cart = () => {
  const { isSubscribed, loading } = useSubscription();
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("redirectUrl", window.location.pathname);
  }, []);

  return (
    <Fragment>
      <SEO
        titleTemplate="Cart"
        description="JustPrintings - Products to Posters, Effortlessly"
      />

      <LayoutOne headerTop="visible" visible={loading}>
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Cart", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive ">
                      <table className="table  shadow-sm align-middle text-center">
                        <thead>
                          <tr>
                            <th>Sl. No</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>MRP</th>
                            <th>Price</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, key) => {
                            return (
                              <tr key={key}>
                                <td>
                                  <Fragment>{key + 1}</Fragment>
                                </td>
                                <td>
                                  <img
                                    className="img-fluid"
                                    src={cartItem.image}
                                    alt={cartItem.name}
                                    style={{
                                      maxWidth: "50px",
                                      maxHeight: "50px",
                                    }}
                                  />
                                </td>

                                <td>
                                  <Fragment>{cartItem.name}</Fragment>
                                </td>
                                <td>
                                  <Fragment>{cartItem.category}</Fragment>
                                </td>
                                <td>
                                  <Fragment>
                                    {cartItem.price === 0
                                      ? "Buy 1 Get 1"
                                      : `${
                                          cartItem.mrp && cartItem.mrp !== 0
                                            ? cartItem.mrp
                                            : 0
                                        }/${cartItem.unit}`}
                                  </Fragment>
                                </td>
                                <td>
                                  <Fragment>
                                    {cartItem.price === 0
                                      ? "Buy 1 Get 1"
                                      : `${cartItem.price}/${cartItem.unit}`}
                                  </Fragment>
                                </td>

                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                      dispatch(
                                        deleteFromCart(cartItem.cartItemId)
                                      )
                                    }
                                    style={{
                                      backgroundColor: "#404040",
                                      borderColor: "#404040",
                                    }}
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={process.env.PUBLIC_URL + "/products"}>
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => dispatch(deleteAllFromCart())}>
                          Clear Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="grand-totall">
                      <h4 className="grand-totall-title">
                        Total{" "}
                        <span>{cartItems && cartItems.length} Products</span>
                      </h4>
                      {isSubscribed ? (
                        <>
                          <Link to={process.env.PUBLIC_URL + "/checkout"}>
                            Proceed to Print
                          </Link>
                        </>
                      ) : (
                        <>
                          <div>
                            <Link
                              to={process.env.PUBLIC_URL + "/subscriptions"}
                            >
                              Subscribe to Print
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/products"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Cart;
