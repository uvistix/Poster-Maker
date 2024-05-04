import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SEO from "../components/seo";
import LayoutOne from "../layouts/LayoutOne";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import domToImage from "dom-to-image";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../authContext/AuthContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  let { pathname } = useLocation();
  const [aditionalInfo, setAdditionalInfo] = useState("");
  const [gradiant, setGradiant] = useState("#87CEEB,  #4682B4");
  const [textColor, setTextColor] = useState("#000000");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const copiedCartItems = [...cartItems];
  const sortedCartItems = copiedCartItems.sort((a, b) => a.price - b.price);
  const { user, userData } = useAuth();

  useEffect(() => {
    localStorage.setItem("redirectUrl", window.location.pathname);
  }, []);

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        setLoading(true);
        if (user && userData) {
          const userSubscriptionExpiry = userData.subscriptionExpiry;

          const isSubscriptionActive =
            userSubscriptionExpiry &&
            new Date() < new Date(userSubscriptionExpiry);
          if (isSubscriptionActive) {
            return;
          } else {
            return navigate("/subscriptions");
          }
        }
      } catch (error) {
        alert(
          "Error checking subscription status! Please check your Internet connection and try again"
        );
      } finally {
        setLoading(false);
      }
    };
    checkSubscriptionStatus();
  }, [user, userData, navigate]);

  const [offerName, setOfferName] = useState("Wednesday Offer");

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      // IDs of the three div elements to capture
      const divIds = ["vegetablesOne", "vegetablesTwo", "vegetablesThree"];

      let counter = 1;
      let scale = 2;
      // Loop through each div ID and capture the content
      for (const divId of divIds) {
        const divElement = document.getElementById(divId);

        if (divElement) {
          const dataUrl = await domToImage.toPng(divElement, {
            width: divElement.clientWidth * scale,
            height: divElement.clientHeight * scale,
            style: {
              transform: "scale(" + scale + ")",
              transformOrigin: "top left",
            },
          });

          // Create a link and trigger download
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${counter}.png`;
          link.click();

          counter++;
        }
      }
    } catch (error) {
      console.error("Error capturing images:", error);
      alert("Error printing images, reload page");
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  const gradientOptions = [
    { label: "Brand Color (3 colors)", value: "#32A22E, #f2e713, #EE2D39" },
    { label: "Rose Quartz (2 colors)", value: "#FFB6C1, #FF69B4" },
    { label: "Sky Blue (2 colors)", value: "#87CEEB, #4682B4" },
    { label: "Emerald (2 colors)", value: "#3D9970, #2ECC71" },
    { label: "Sunflower (2 colors)", value: "#F39C12, #E74C3C" },
    { label: "Peter River (2 colors)", value: "#3498DB, #2980B9" },
    { label: "Forest Green (3 colors)", value: "#32CD32, #008000, #006400" },
    { label: "Dark Orchid (3 colors)", value: "#9932CC, #8A2BE2, #4B0082" },
    { label: "Gold (3 colors)", value: "#FFD700, #FFA500, #FF8C00" },
    { label: "Saddle Brown (3 colors)", value: "#8B4513, #A0522D, #CD853F" },
    { label: "Sea Green (3 colors)", value: "#2E8B57, #3CB371, #20B2AA" },
    {
      label: "Medium Turquoise (3 colors)",
      value: "#48D1CC, #00CED1, #20B2AA",
    },
    {
      label: "Dark Olive Green (3 colors)",
      value: "#556B2F, #8FBC8F, #98FB98",
    },
    { label: "Fire Brick (3 colors)", value: "#800000, #8B0000, #B22222" },
    { label: "Saffron (3 colors)", value: "#FFC300, #FF5733, #FF8C00" },
    { label: "Blue Turquoise (3 colors)", value: "#5DADE2, #85C1E9, #3498DB" },
    { label: "Amethyst (3 colors)", value: "#6C3483, #913D88, #9B59B6" },
    { label: "Indian Red (3 colors)", value: "#E74C3C, #EC7063, #F1948A" },
    { label: "Wet Asphalt (3 colors)", value: "#3498DB, #2980B9, #34495E" },
    { label: "Carrot (3 colors)", value: "#F39C12, #E67E22, #D35400" },
    { label: "Tomato (4 colors)", value: "#FF6347, #FF4500, #FFD700, #FF8C00" },
    {
      label: "Blue Violet (4 colors)",
      value: "#8A2BE2, #9370DB, #BA55D3, #8B008B",
    },
    {
      label: "DarkOrange (4 colors)",
      value: "#FF8C00, #FFD700, #FFFF00, #00FA9A",
    },
    {
      label: "Royal Blue (4 colors)",
      value: "#1E90FF, #4169E1, #6495ED, #00BFFF",
    },
    {
      label: "Dark Turquoise (4 colors)",
      value: "#00CED1, #20B2AA, #008080, #5F9EA0",
    },
    {
      label: "Slate Blue (4 colors)",
      value: "#6A5ACD, #7B68EE, #8A2BE2, #9400D3",
    },
    {
      label: "Crimson (4 colors)",
      value: "#DC143C, #FF69B4, #FFB6C1, #FFC0CB",
    },
    {
      label: "Shades of Sea (4 colors)",
      value: "#3498DB, #2980B9, #16A085, #2ECC71",
    },
    {
      label: "Sunflower Gradient (4 colors)",
      value: "#F4D03F, #FAD02E, #F9BF3B, #F2B705",
    },
    {
      label: "Contrast Sea (4 colors)",
      value: "#3498DB, #2980B9, #16A085, #27AE60",
    },
    {
      label: "Sandy Beach (4 colors)",
      value: "#F5B041, #FAD02E, #F9BF3B, #F2B705",
    },
    {
      label: "Royal Purple (4 colors)",
      value: "#9B59B6, #8E44AD, #6C3483, #913D88",
    },
    {
      label: "Purple Shades (4 colors)",
      value: "#8E44AD, #9B59B6, #5E35B1, #673AB7",
    },
    {
      label: "Coral (5 colors)",
      value: "#FF6347, #FF4500, #FFD700, #FF8C00, #DAA520",
    },
    {
      label: "Brown (5 colors)",
      value: "#8B4513, #A0522D, #CD853F, #D2691E, #DEB887",
    },
    {
      label: "Green (5 colors)",
      value: "#556B2F, #8FBC8F, #98FB98, #00FA9A, #32CD32",
    },
    {
      label: "Steel Blue (5 colors)",
      value: "#1E90FF, #4169E1, #6495ED, #00BFFF, #87CEEB",
    },
    {
      label: "Slate Blue (5 colors)",
      value: "#6A5ACD, #7B68EE, #8A2BE2, #9400D3, #9932CC",
    },
    {
      label: "Dark Orchid (5 colors)",
      value: "#9932CC, #8A2BE2, #4B0082, #9370DB, #8B008B",
    },
    {
      label: "Gold (5 colors)",
      value: "#FFD700, #FFA500, #FF8C00, #B8860B, #DAA520",
    },
    {
      label: "Pink (5 colors)",
      value: "#FFB6C1, #FF69B4, #DB7093, #FF1493, #C71585",
    },
    {
      label: "Golden Yellow (5 colors)",
      value: "#F4D03F, #FAD02E, #F9BF3B, #F2B705, #F5B041",
    },
    {
      label: "Colorful Ocean (5 colors)",
      value: "#3498DB, #2980B9, #16A085, #27AE60, #2ECC71",
    },
    {
      label: "Rosy Pink (5 colors)",
      value: "#E74C3C, #EC7063, #F1948A, #F5B7B1, #FADBD8",
    },
    {
      label: "Rainbow (6 colors)",
      value: "#FF6347, #FF4500, #FFD700, #FF8C00, #DAA520, #DC143C",
    },
    {
      label: "Ocean Sunset (6 colors)",
      value: "#3498DB, #2980B9, #16A085, #27AE60, #2ECC71, #3498DB",
    },
    {
      label: "Sunflower Harmony (6 colors)",
      value: "#F5B041, #FAD02E, #F9BF3B, #F2B705, #F5B041, #F7DC6F",
    },
    {
      label: "Endless Sea (7 colors)",
      value: "#3498DB, #2980B9, #16A085, #27AE60, #2ECC71, #3498DB, #2980B9",
    },
    {
      label: "Golden Fields (7 colors)",
      value: "#F4D03F, #FAD02E, #F9BF3B, #F2B705, #F5B041, #F7DC6F, #F8C471",
    },
    {
      label: "Ocean Waves (8 colors)",
      value:
        "#3498DB, #2980B9, #16A085, #27AE60, #2ECC71, #3498DB, #2980B9, #16A085",
    },
  ];

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="JustPrintings - Products to Posters, Effortlessly"
      />
      <LayoutOne headerTop="visible" visible={loading}>
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Print", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="checkout-area pt-50 pb-100">
          <div className="container">
            {sortedCartItems && sortedCartItems.length >= 1 ? (
              <div>
                <div className="discount-code-wrapper mb-50">
                  <div className="title-wrap">
                    <h4 className="cart-bottom-title section-bg-gray">
                      Offer Details
                    </h4>
                    <div className=" row d-flex justify-content-between">
                      <div className="discount-code col-md-2">
                        <p>Select Offer Date</p>
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="dd/MM/yyyy"
                        />
                      </div>
                      <div className="discount-code col-md-3">
                        <p>Enter Offer Name</p>
                        <input
                          type="text"
                          name="name"
                          value={offerName}
                          onChange={(e) => setOfferName(e.target.value)}
                        />
                      </div>

                      <div className="discount-code col-md-3">
                        <p>Enter additional message (optional)</p>
                        <input
                          type="text"
                          name="name"
                          onChange={(e) => setAdditionalInfo(e.target.value)}
                        />
                      </div>

                      <div className="discount-code col-md-2 ">
                        <p>Select Style</p>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) => setGradiant(e.target.value)}
                        >
                          {/* <option defaultValue>Select Style</option> */}
                          {gradientOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="discount-code col-md-2">
                        <p>Text Color</p>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) => setTextColor(e.target.value)}
                        >
                          <option defaultValue>Select Color</option>
                          <option value="#000000">Black</option>
                          <option value="#FFFFFF">White</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="desktop-width-container">
                  <div id="vegetablesOne">
                    <div
                      className="border border-4 rounded p-2"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${gradiant})`,
                      }}
                    >
                      <div className="text-center border-bottom shadow-sm p-3 mb-3">
                        <img
                          src={userData.logo}
                          alt={userData.name}
                          style={{ maxWidth: "250px", maxHeight: "150px" }}
                          className="mb-3"
                        />

                        {/* <h1
                        className="uppercase mb-1"
                        style={{ color: textColor }}
                      >
                        {name}
                      </h1> */}
                        <h1
                          className="uppercase mb-1 "
                          style={{ color: textColor }}
                        >
                          {offerName}
                        </h1>
                        <h3
                          style={{ color: textColor }}
                          className="font-monospace"
                        >
                          {formattedDate}
                          {". "}
                          {userData.fromTimings &&
                            new Intl.DateTimeFormat("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                            }).format(userData?.fromTimings)}
                          {" - "}
                          {userData.toTimings &&
                            new Intl.DateTimeFormat("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                            }).format(userData?.toTimings)}
                        </h3>
                        <h3 style={{ color: textColor }} className=" fs-5">
                          <i
                            className="fa fa-whatsapp me-1"
                            aria-hidden="true"
                          />
                          {userData.number && `+91-${userData.number} `}
                          {userData.numberTwo
                            ? `/ +91-${userData.numberTwo}`
                            : ""}
                        </h3>
                        <h4 style={{ color: textColor }}>{userData.address}</h4>
                        {userData.additionalMessage && (
                          <h5
                            style={{ color: textColor }}
                            className="fst-italic"
                          >
                            {userData.additionalMessage}
                          </h5>
                        )}
                        {aditionalInfo && (
                          <h4 style={{ color: textColor }}>{aditionalInfo}</h4>
                        )}
                      </div>

                      <div className="row justify-content-center">
                        {sortedCartItems &&
                          sortedCartItems.slice(0, 24).map((cartItem, key) => (
                            <div className="col-2 mb-4 card-group" key={key}>
                              <ProductCard
                                cartItem={cartItem}
                                gradiant={gradiant}
                                textColor={textColor}
                              />
                            </div>
                          ))}
                      </div>

                      <div className=" text-center border-top  p-2">
                        <h5 style={{ color: textColor }}>
                          {formattedDate}. {userData.tandc}
                        </h5>
                      </div>
                    </div>
                  </div>

                  {sortedCartItems && sortedCartItems.length >= 25 && (
                    <div id="vegetablesTwo">
                      <div
                        className="border border-4 rounded p-2"
                        style={{
                          backgroundImage: `linear-gradient(to right, ${gradiant})`,
                        }}
                      >
                        <div className="row justify-content-center ">
                          {sortedCartItems &&
                            sortedCartItems
                              .slice(24, 60)
                              .map((cartItem, key) => (
                                <div
                                  className="col-2 mb-4 card-group"
                                  key={key}
                                >
                                  <ProductCard
                                    cartItem={cartItem}
                                    gradiant={gradiant}
                                    textColor={textColor}
                                  />
                                </div>
                              ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {sortedCartItems && sortedCartItems.length >= 61 && (
                    <div id="vegetablesThree">
                      <div
                        className="border border-4 rounded p-2"
                        style={{
                          backgroundImage: `linear-gradient(to right, ${gradiant})`,
                        }}
                      >
                        <div className="row justify-content-center">
                          {sortedCartItems &&
                            sortedCartItems
                              .slice(60, 96)
                              .map((cartItem, key) => (
                                <div
                                  className="col-2 mb-4 card-group"
                                  key={key}
                                >
                                  <ProductCard
                                    cartItem={cartItem}
                                    gradiant={gradiant}
                                    textColor={textColor}
                                  />
                                </div>
                              ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {sortedCartItems &&
                    sortedCartItems.length >= 97 &&
                    userData.subscriptionPlan === "Standard Plan" && (
                      <div id="vegetablesThree">
                        <div
                          className="border border-4 rounded p-2"
                          style={{
                            backgroundImage: `linear-gradient(to right, ${gradiant})`,
                          }}
                        >
                          <div className="row justify-content-center">
                            {sortedCartItems &&
                              sortedCartItems
                                .slice(96, 132)
                                .map((cartItem, key) => (
                                  <div
                                    className="col-2 mb-4 card-group"
                                    key={key}
                                  >
                                    <ProductCard
                                      cartItem={cartItem}
                                      gradiant={gradiant}
                                      textColor={textColor}
                                    />
                                  </div>
                                ))}
                          </div>
                        </div>
                      </div>
                    )}

                  {sortedCartItems &&
                    sortedCartItems.length >= 133 &&
                    userData.subscriptionPlan === "Standard Plan" && (
                      <div id="vegetablesThree">
                        <div
                          className="border border-4 rounded p-2"
                          style={{
                            backgroundImage: `linear-gradient(to right, ${gradiant})`,
                          }}
                        >
                          <div className="row justify-content-center">
                            {sortedCartItems &&
                              sortedCartItems
                                .slice(132, 168)
                                .map((cartItem, key) => (
                                  <div
                                    className="col-2 mb-4 card-group"
                                    key={key}
                                  >
                                    <ProductCard
                                      cartItem={cartItem}
                                      gradiant={gradiant}
                                      textColor={textColor}
                                    />
                                  </div>
                                ))}
                          </div>
                        </div>
                      </div>
                    )}
                </div>

                <div className="your-order-area">
                  <div className="place-order mt-50">
                    <button
                      className="btn-hover"
                      type="submit"
                      onClick={handlePlaceOrder}
                    >
                      Print Poster
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to print poster <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/products"}>
                        Add products to print
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

export default Checkout;
