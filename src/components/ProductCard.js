import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "../store/slices/cart-slice";

const ProductCard = ({ cartItem, gradiant, textColor }) => {
  const dispatch = useDispatch();

  const handleImageError = (itemId, productName) => {
    if (
      window.confirm(
        `Error! ${productName} image not found! Do you want to remove it from the print cart or reload the page?`
      )
    ) {
      const removeItem = window.confirm(
        "Do you want to remove the item from the cart?"
      );
      if (removeItem) {
        dispatch(deleteFromCart(itemId));
      } else {
        window.location.reload();
      }
    }
  };

  return (
    <div className="card shadow-sm text-center">
      <div
        className={"d-flex justify-content-around rounded mb-2"}
        style={{
          backgroundImage: `linear-gradient(to right, ${gradiant})`,
          color: textColor,
        }}
      >
        {cartItem.mrp == cartItem.price ? (
          <div className="fw-bold p-1" style={{ whiteSpace: "nowrap" }}>
            <span className="fs-6">{cartItem.price}% OFF</span> <br /> on MRP
          </div>
        ) : (
          <Fragment>
            {cartItem.mrp &&
            cartItem.mrp !== 0 &&
            cartItem.mrp > cartItem.price ? (
              <div className="p-1" style={{ whiteSpace: "nowrap" }}>
                SAVE <br />₹{" "}
                <span className="fw-bold fs-6">
                  {cartItem.mrp - cartItem.price}
                </span>
              </div>
            ) : null}

            {cartItem.mrp &&
            cartItem.mrp != 0 &&
            cartItem.mrp > cartItem.price ? (
              <div className="border-end border-1  border-light"></div>
            ) : null}

            <div className="p-1" style={{ whiteSpace: "nowrap" }}>
              {cartItem.mrp &&
              cartItem.mrp !== 0 &&
              cartItem.mrp > cartItem.price ? (
                <span
                  className={
                    cartItem.price === 0
                      ? "text-decoration-none"
                      : "text-decoration-line-through"
                  }
                  style={{ fontSize: 13 }}
                >
                  MRP ₹ {cartItem.mrp}
                  {cartItem.category != "Other" ? `/${cartItem.unit}` : null}
                </span>
              ) : null}

              <div className="fw-bold" style={{ whiteSpace: "nowrap" }}>
                {cartItem.price === 0 ? (
                  <span className="fs-6">Buy 1 Get 1</span>
                ) : cartItem.mrp && cartItem.mrp !== 0 ? (
                  <>
                    SP ₹ <span className="fs-6">{cartItem.price}</span>
                    {cartItem.category != "Other" ? `/${cartItem.unit}` : null}
                  </>
                ) : (
                  <>
                    Special Price <br />
                    <span className="fs-6">₹ {cartItem.price}</span>
                    {cartItem.category != "Other" ? `/${cartItem.unit}` : null}
                  </>
                )}
              </div>
            </div>
          </Fragment>
        )}
      </div>

      <img
        src={cartItem.image}
        alt={cartItem.name}
        style={{
          width: "150px",
          height: "150px",
          margin: "auto",
        }}
        onError={() => handleImageError(cartItem.cartItemId, cartItem.name)}
      />
      <h5 className="card-title uppercase lh-base fw-bold">{cartItem.name}</h5>
    </div>
  );
};

export default ProductCard;
