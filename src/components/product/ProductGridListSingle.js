import PropTypes from "prop-types";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { addToCart, deleteFromCart } from "../../store/slices/cart-slice";

const ProductGridListSingle = ({ product, cartItem, spaceBottomClass }) => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className={clsx("product-wrap", spaceBottomClass)}>
        <div className="product-img border rounded shadow-sm d-flex justify-content-center">
          <img
            className="default-img custom-responsive-image"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="product-content text-center">
          <button
            onClick={() =>
              cartItem !== undefined && cartItem.quantity > 0
                ? dispatch(deleteFromCart(cartItem.cartItemId))
                : dispatch(addToCart(product))
            }
            className={
              cartItem !== undefined && cartItem.quantity > 0
                ? "btn btn-danger"
                : "btn btn-primary"
            }
            style={{
              backgroundColor:
                cartItem !== undefined && cartItem.quantity > 0
                  ? "#404040"
                  : "#A749FF",
              borderColor:
                cartItem !== undefined && cartItem.quantity > 0
                  ? "#404040"
                  : "#A749FF",
            }}
          >
            {" "}
            <i className="pe-7s-cart"></i>{" "}
            {cartItem !== undefined && cartItem.quantity > 0
              ? "Remove"
              : "Add to Print"}
          </button>
        </div>
        <div className="product-content text-center">
          <h3>{product.name}</h3>
          <div>
            {product?.mrp && product.mrp == product.price ? (
              <Fragment>
                <span className="fs-6">{product.price}% OFF</span> on MRP
              </Fragment>
            ) : (
              <Fragment>
                {product.mrp &&
                product.mrp !== 0 &&
                product.mrp > product.price ? (
                  <>
                    MRP: <span className="fs-6">{product.mrp}</span>
                    {" - "}
                  </>
                ) : null}

                {product.price === 0 ? (
                  <>
                    <span className="fs-6">Buy 1 Get 1</span>{" "}
                  </>
                ) : (
                  <>
                    SP: <span className="fs-6">{product.price}</span>
                    {product.category != "Other" ? `/${product.unit}` : null}
                  </>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.shape({}),
};

export default ProductGridListSingle;
