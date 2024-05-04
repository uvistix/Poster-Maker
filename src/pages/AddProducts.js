import React, { useEffect, useState, useRef, Fragment } from "react";
import { db, storage } from "../firebaseConfig/FirebaseConfig";
import LayoutOne from "../layouts/LayoutOne";
import SEO from "../components/seo";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../authContext/AuthContext";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, addToCart } from "../store/slices/cart-slice";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const ProductForm = () => {
  const { user, userData } = useAuth();
  let { pathname } = useLocation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("0");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [editedPrice, setEditedPrice] = useState([]);
  const [editedMrp, setEditedMrp] = useState([]);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("redirectUrl", window.location.pathname);
  }, []);

  useEffect(() => {
    setLoading(true);

    try {
      const productsData = userData.productsData || {};
      const productArray = Object.entries(productsData)
        .map(([productId, productData]) => ({
          id: productId,
          ...productData,
        }))
        .sort(
          (a, b) =>
            new Date(b.createdAt.toDate()) - new Date(a.createdAt.toDate())
        );

      setProductsData(productArray);
    } catch (error) {
      console.error("Error fetching or processing products data:", error);
    } finally {
      setLoading(false);
    }
  }, [userData, user.uid]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage && selectedImage.size > 1024 * 1024) {
      alert("Image size must be less than 1MB");
      e.target.value = null;
      return;
    }
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      name,
      price,
      mrp,
      category,
      unit,
      image: null,
      createdAt: new Date(),
      id: uuidv4(),
    };

    try {
      const currentProductsData = userData.productsData || {};
      const numberOfItems = Object.keys(currentProductsData).length;

      const maxItems = userData.maxItems ?? 0;

      if (numberOfItems >= maxItems) {
        alert(`Cannot upload more than ${maxItems} items`);
        return;
      }

      const customImageName = `${uuidv4()}_${image.name}`;
      const imageRef = storage.ref(
        `productImages/${user.uid}/${customImageName}`
      );

      await imageRef.put(image);
      const imageUrl = await imageRef.getDownloadURL();

      productData.image = imageUrl;

      const userDocRef = db.collection(`users`).doc(user.uid);

      currentProductsData[productData.id] = productData;

      setEditedPrice([]);
      setEditedMrp([]);

      await userDocRef.update({
        productsData: currentProductsData,
      });

      clearInputFields();
      inputRef.current.value = null;
      console.log("Product data successfully stored in Firebase!");
    } catch (error) {
      console.error("Error storing product data:", error);
      alert("Error storing product data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId, imageUrl) => {
    try {
      setLoading(true);

      const userDocRef = db.collection("users").doc(user.uid);
      const currentProductsData = userData?.productsData || {};

      delete currentProductsData[productId];

      await userDocRef.update({
        productsData: currentProductsData,
      });

      if (imageUrl) {
        const imageRef = storage.refFromURL(imageUrl);
        await imageRef.delete();
      }

      setEditedPrice([]);
      setEditedMrp([]);

      const cartItemIdToDelete = cartItems.find(
        (item) => item.id === productId
      )?.cartItemId;

      if (cartItemIdToDelete) {
        dispatch(deleteFromCart(cartItemIdToDelete));
      }
      console.log("Product data successfully deleted from Firebase!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearInputFields = () => {
    setName("");
    setPrice("");
    setMrp("0");
    setCategory("");
    setUnit("");
  };

  const handlePriceChange = async (productId, newPrice) => {
    try {
      setLoadingPrice(true);

      const userDocRef = db.collection("users").doc(user.uid);
      const userData = (await userDocRef.get()).data();
      const currentProductsData = userData?.productsData || {};

      // Update the price in the product data
      currentProductsData[productId].price = parseFloat(newPrice);

      // Update the user's document with the modified productsData
      await userDocRef.update({
        productsData: currentProductsData,
      });

      const cartItemToUpdate = cartItems.find((item) => item.id === productId);

      if (cartItemToUpdate) {
        const updatedCartItem = {
          ...cartItemToUpdate,
          price: parseFloat(newPrice),
        };

        dispatch(deleteFromCart(cartItemToUpdate.cartItemId));
        dispatch(addToCart(updatedCartItem));
        console.log(updatedCartItem);
      }

      console.log("Product price successfully updated!");
    } catch (error) {
      console.error("Error updating product price:", error);
      alert("Error updating product price:", error);
    } finally {
      setLoadingPrice(false);
    }
  };

  const handleMrpChange = async (productId, newMrp) => {
    try {
      setLoadingPrice(true);

      const userDocRef = db.collection("users").doc(user.uid);
      const userData = (await userDocRef.get()).data();
      const currentProductsData = userData?.productsData || {};

      // Update the price in the product data
      currentProductsData[productId].mrp = parseFloat(newMrp);

      // Update the user's document with the modified productsData
      await userDocRef.update({
        productsData: currentProductsData,
      });

      const cartItemToUpdate = cartItems.find((item) => item.id === productId);

      if (cartItemToUpdate) {
        const updatedCartItem = {
          ...cartItemToUpdate,
          mrp: parseFloat(newMrp),
        };

        dispatch(deleteFromCart(cartItemToUpdate.cartItemId));
        dispatch(addToCart(updatedCartItem));
        console.log(updatedCartItem);
      }

      console.log("Product price successfully updated!");
    } catch (error) {
      console.error("Error updating product price:", error);
      alert("Error updating product price:", error);
    } finally {
      setLoadingPrice(false);
    }
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Fragment>
      <SEO
        titleTemplate="About Products"
        description="JustPrintings - Products to Posters, Effortlessly"
      />
      <LayoutOne headerTop="visible" visible={loading}>
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Add Products", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="container my-3 border border-1 p-3 rounded shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter product name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-md-1">
                <label htmlFor="mrp" className="form-label">
                  MRP
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="mrp"
                  name="mrp"
                  value={mrp}
                  required
                  onChange={(e) => setMrp(e.target.value)}
                />
              </div>

              <div className="col-md-1">
                <label htmlFor="price" className="form-label">
                  S. Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={price}
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* Variation */}
              <div className="col-md-2">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  value={category}
                  required
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Variation */}
              <div className="col-md-1">
                <label htmlFor="unit" className="form-label">
                  Unit
                </label>
                <select
                  className="form-select"
                  id="unit"
                  name="unit"
                  value={unit}
                  required
                  onChange={(e) => setUnit(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="KG">KG</option>
                  <option value="PC">PC</option>
                  <option value="BOX">BOX</option>
                  <option value="PCK">PCK</option>
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <label htmlFor="image" className="form-label px-1">
                  ||
                </label>
                <label
                  htmlFor="image"
                  className="form-label"
                  onClick={() => {
                    window.open(
                      "https://drive.google.com/drive/folders/1xgit9zW_Okb5dwO26hXKmtQppeerLIOe?usp=sharing",
                      "_blank"
                    );
                  }}
                  style={{ cursor: "pointer", color: "#A749FF" }}
                >
                  Download Images
                </label>

                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  ref={inputRef}
                  onChange={handleImageChange}
                />
              </div>

              <div className="col-md-2">
                <label
                  className="form-label"
                  onClick={openModal}
                  style={{ cursor: "pointer", color: "#A749FF" }}
                >
                  Learn!
                </label>
                <button
                  type="submit"
                  className="btn btn-primary  d-flex justify-content-center form-control"
                  disabled={loading}
                  style={{
                    backgroundColor: "#A749FF",
                    borderColor: "#A749FF",
                  }}
                >
                  Add Product
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="container my-3 border border-1 p-3 rounded shadow-sm">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive ">
                {productsData && productsData.length > 1 ? (
                  <table className="table table-bordered text-center align-middle">
                    <>
                      <thead className="p-1">
                        <tr>
                          <th>Sl. No</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>MRP</th>
                          <th>S. Price</th>
                          <th>Category</th>
                          <th>Unit</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productsData.map((product, index) => (
                          <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: "50px", height: "50px" }}
                              />
                            </td>
                            <td className="text-capitalize">{product.name}</td>

                            <td>
                              <div className="d-flex">
                                <input
                                  type="number"
                                  // className="form-control"
                                  value={
                                    editedMrp[index] !== undefined
                                      ? editedMrp[index]
                                      : product.mrp === undefined
                                      ? 0
                                      : product.mrp
                                  }
                                  onChange={(e) => {
                                    setEditedMrp((prevEditedMrp) => {
                                      const newEditedMrp = [...prevEditedMrp];
                                      newEditedMrp[index] = e.target.value;
                                      return newEditedMrp;
                                    });
                                  }}
                                  className="custom-responsive-input-field"
                                />
                                {editedMrp[index] !== undefined &&
                                  parseFloat(editedMrp[index]) !==
                                    parseFloat(product.mrp) && (
                                    <button
                                      className="btn btn-primary ms-2"
                                      onClick={() =>
                                        handleMrpChange(
                                          product.id,
                                          editedMrp[index]
                                        )
                                      }
                                      disabled={loadingPrice}
                                      style={{
                                        backgroundColor: "#A749FF",
                                        borderColor: "#A749FF",
                                      }}
                                    >
                                      Update
                                    </button>
                                  )}
                              </div>
                            </td>

                            <td>
                              <div className="d-flex">
                                <input
                                  type="number"
                                  value={
                                    editedPrice[index] !== undefined
                                      ? editedPrice[index]
                                      : product.price
                                  }
                                  onChange={(e) => {
                                    setEditedPrice((prevEditedPrice) => {
                                      const newEditedPrice = [
                                        ...prevEditedPrice,
                                      ];
                                      newEditedPrice[index] = e.target.value;
                                      return newEditedPrice;
                                    });
                                  }}
                                  className="custom-responsive-input-field"
                                />
                                {editedPrice[index] !== undefined &&
                                  parseFloat(editedPrice[index]) !==
                                    parseFloat(product.price) && (
                                    <button
                                      className="btn btn-primary ms-2"
                                      onClick={() =>
                                        handlePriceChange(
                                          product.id,
                                          editedPrice[index]
                                        )
                                      }
                                      disabled={loadingPrice}
                                      style={{
                                        backgroundColor: "#A749FF",
                                        borderColor: "#A749FF",
                                      }}
                                    >
                                      Update
                                    </button>
                                  )}
                              </div>
                            </td>

                            <td>{product.category}</td>
                            <td>{product.unit}</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() =>
                                  handleDelete(product.id, product.image)
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
                        ))}
                      </tbody>
                    </>
                  </table>
                ) : (
                  <div className="row m-5 p-5">
                    <div className="col-lg-12">
                      <div className="item-empty-area text-center mt-5">
                        <div className="item-empty-area__text">
                          No Products Data, Add Now!
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary mt-3"
                          disabled={loading}
                          style={{
                            backgroundColor: "#A749FF",
                            borderColor: "#A749FF",
                          }}
                          onClick={() => {
                            window.open(
                              "https://drive.google.com/drive/folders/1xgit9zW_Okb5dwO26hXKmtQppeerLIOe?usp=sharing",
                              "_blank"
                            );
                          }}
                        >
                          Download Images
                        </button>
                        <div className="mt-2">
                          <button className="btn btn-dark" onClick={setIsOpen}>
                            Learn
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="p-5 m-5 text-center">
            <h2 className="mb-3">Lets Learn!</h2>

            <table className="table table-bordered text-center align-middle ">
              <>
                <thead className="p-1">
                  <tr>
                    <th>Examples</th>
                    <th>Option 1</th>
                    <th>Option 2</th>
                    <th>Option 3</th>
                    <th>Option 4</th>
                    <th>Option 5</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-bold">MRP</td>
                    <td>570</td>
                    <td>0</td>
                    <td>0</td>
                    <td>10</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">SPrice</td>
                    <td>499</td>
                    <td>499</td>
                    <td>0</td>
                    <td>0</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Results</td>
                    <td>
                      <span className="text-decoration-line-through">
                        MRP 570
                      </span>
                      , SP ₹499
                    </td>
                    <td>SP ₹499</td>
                    <td>Buy 1, Get 1</td>
                    <td>MRP ₹10, Buy 1 Get 1</td>
                    <td>20% OFF on MRP</td>
                  </tr>
                </tbody>
              </>
            </table>

            <button onClick={closeModal} className="btn btn-dark">
              Close
            </button>
          </div>
        </Modal>
      </LayoutOne>
    </Fragment>
  );
};

export default ProductForm;
