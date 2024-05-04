import { Fragment, useState, useEffect, useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../components/seo";
import LayoutOne from "../layouts/LayoutOne";
import { db, storage } from "../firebaseConfig/FirebaseConfig";
import { EmailAuthProvider } from "firebase/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";
import { formatSubscriptionExpiryDate } from "../utils/utils";

const MyAccount = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [tandc, setTandC] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [fromTimings, setFromTimings] = useState(null);
  const [toTimings, setToTimings] = useState(null);
  const [numberTwo, setNumberTwo] = useState("");
  const [logo, setLogo] = useState(null);
  const inputRef = useRef();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let { pathname } = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { user, userData } = useAuth();
  const { formattedDate, remainingTime } = formatSubscriptionExpiryDate(
    userData.subscriptionExpiry
  );

  useEffect(() => {
    localStorage.setItem("redirectUrl", window.location.pathname);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      if (user && userData) {
        try {
          setName(userData.name || "");
          setNumber(userData.number || "");
          setAddress(userData.address || "");
          setTandC(userData.tandc || "");
          setFromTimings(userData.fromTimings.toDate() || new Date());
          setToTimings(userData.toTimings.toDate() || new Date());
          setAdditionalMessage(userData.additionalMessage || "");
          setNumberTwo(userData.numberTwo || "");
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2048 * 2048) {
      alert("Image size must be less than 2 MB");
      e.target.value = null;
      return;
    }
    setLogo(file);
  };

  // Function to upload logo to Firebase Storage
  const uploadImageToStorage = async () => {
    try {
      if (user && logo) {
        const storageRef = storage.ref(`users/${user.uid}/profileImage`);
        const snapshot = await storageRef.put(logo);
        const downloadURL = await snapshot.ref.getDownloadURL();

        return downloadURL;
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      return null;
    }
  };

  const handleFromTimeChange = (time) => {
    setFromTimings(time);
  };
  const handleToTimeChange = (time) => {
    setToTimings(time);
  };

  const handleUpdate = async () => {
    try {
      if (
        !name ||
        !number ||
        !address ||
        !tandc ||
        !fromTimings ||
        !toTimings
      ) {
        return alert("All the fields required");
      }

      setLoading(true);
      const imageUrl = await uploadImageToStorage();
      const userRef = db.collection("users").doc(user.uid);

      // Check if the document exists
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        // Update existing document
        await userRef.update({
          name,
          number,
          address,
          tandc,
          fromTimings,
          toTimings,
          additionalMessage: additionalMessage ?? "",
          numberTwo: numberTwo ?? "",
          logo: imageUrl || userData.logo,
        });
        console.log("User data updated successfully");
        alert("User data updated successfully");
      } else {
        await userRef.set({
          name,
          number,
          address,
          tandc,
          fromTimings,
          toTimings,
          additionalMessage: additionalMessage ?? "",
          numberTwo: numberTwo ?? "",
          logo: imageUrl || "",
        });
        console.log("User data created successfully");
        alert("User data created successfully");
      }
    } catch (error) {
      console.error("Error updating/creating user data:", error);
      alert("Error updating/creating user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return alert("All the fields required");
    }
    try {
      if (user && newPassword === confirmNewPassword) {
        const email = user.email;
        const password = currentPassword;

        const credential = EmailAuthProvider.credential(email, password);
        if (credential) {
          await user.reauthenticateWithCredential(credential);
          await user.updatePassword(newPassword);
          console.log("Password changed successfully");
          alert("Password changed successfully");
          setCurrentPassword("");
          setNewPassword("");
        }
      } else {
        alert("New passwords do not match");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password:", error.message);
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="JustPrintings - Products to Posters, Effortlessly"
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "My Account", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item
                      eventKey="0"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span>1 .</span> Edit your account information{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="d-flex justify-content-center">
                            {userData.logo && (
                              <img
                                src={userData.logo}
                                alt={userData.name}
                                style={{
                                  maxWidth: "250px",
                                  maxHeight: "150px",
                                }}
                                className="mb-3"
                              />
                            )}
                          </div>
                          <div className="account-info-wrapper d-flex justify-content-between">
                            <div>
                              <h4>My Account Information</h4>
                            </div>
                            {userData.subscriptionExpiry &&
                            remainingTime !==
                              "0 days, 0 hours, 0 minutes, 0 seconds" ? (
                              <div>
                                Subscription ends on: {formattedDate} <br />
                                Remaining time: {remainingTime}
                              </div>
                            ) : (
                              <div>
                                Subscription Status:{" "}
                                <span className="text-danger">Inactive</span>
                              </div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Venture Name</label>
                                <input
                                  type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3">
                              <div className="billing-info">
                                <label className="me-5">From Timings</label>
                                <DatePicker
                                  selected={fromTimings}
                                  onChange={handleFromTimeChange}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeIntervals={15}
                                  dateFormat="h:mm aa"
                                  timeCaption="Time"
                                />
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3">
                              <div className="billing-info">
                                <label className="me-5">To Timings</label>
                                <DatePicker
                                  selected={toTimings}
                                  onChange={handleToTimeChange}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeIntervals={15}
                                  dateFormat="h:mm aa"
                                  timeCaption="Time"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Contact Number</label>
                                <input
                                  type="number"
                                  value={number}
                                  onChange={(e) => setNumber(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Contact Number 2 (optional)</label>
                                <input
                                  type="number"
                                  value={numberTwo}
                                  onChange={(e) => setNumberTwo(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="col-lg-8 col-md-8">
                              <div className="billing-info">
                                <label>Address</label>
                                <input
                                  type="text"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="billing-info">
                                <label htmlFor="logo" className="form-label">
                                  Image
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  id="logo"
                                  name="logo"
                                  ref={inputRef}
                                  onChange={handleImageChange}
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Additional Message (optional)</label>
                                <input
                                  type="text"
                                  value={additionalMessage}
                                  onChange={(e) =>
                                    setAdditionalMessage(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Terms & Condtions</label>
                                <input
                                  type="text"
                                  value={tandc}
                                  onChange={(e) => setTandC(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button onClick={handleUpdate}>Update</button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      eventKey="1"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span>2 .</span> Change your password
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>Change Password</h4>
                          </div>
                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Current Password</label>
                                <input
                                  type={showPassword ? "text" : "password"}
                                  value={currentPassword}
                                  onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>New Password</label>
                                <input
                                  type={showPassword ? "text" : "password"}
                                  value={newPassword}
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>New Password Confirm</label>
                                <input
                                  type={showPassword ? "text" : "password"}
                                  value={confirmNewPassword}
                                  onChange={(e) =>
                                    setConfirmNewPassword(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-check justify-content-start">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                              onChange={() => setShowPassword(!showPassword)}
                            />
                            <label className="form-check-label">
                              Show password
                            </label>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button onClick={handleChangePassword}>
                                Change Password
                              </button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    {/* <Accordion.Item
                      eventKey="2"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span>3 .</span> Modify your address book entries
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>Address Book Entries</h4>
                          </div>
                          <div className="entries-wrapper">
                            <div className="row">
                              <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                <div className="entries-info text-center">
                                  <p>John Doe</p>
                                  <p>Paul Park </p>
                                  <p>Lorem ipsum dolor set amet</p>
                                  <p>NYC</p>
                                  <p>New York</p>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                <div className="entries-edit-delete text-center">
                                  <button className="edit">Edit</button>
                                  <button>Delete</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button type="submit">Continue</button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item> */}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading && (
          <div className="flone-preloader-wrapper">
            <div className="flone-preloader">
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;
