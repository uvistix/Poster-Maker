import React, { Fragment, useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../components/seo";
import LayoutOne from "../layouts/LayoutOne";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";

const LoginRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, signup, loading, resetPassword, userData } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && userData && userData.userType === "admin") {
      const redirectUrl = localStorage.getItem("redirectUrl");
      if (redirectUrl) {
        // Clear the saved URL from local storage
        localStorage.removeItem("redirectUrl");

        // Redirect the user to the saved URL
        return navigate(redirectUrl);
      } else {
        // If no saved URL is found, redirect the user to a default page
        return navigate("/admin-dashboard");
      }
    } else if (user && userData && userData.userType === "user") {
      const redirectUrl = localStorage.getItem("redirectUrl");

      if (redirectUrl) {
        // Clear the saved URL from local storage
        localStorage.removeItem("redirectUrl");

        // Redirect the user to the saved URL
        return navigate(redirectUrl);
      } else {
        // If no saved URL is found, redirect the user to a default page
        return navigate("/add-product");
      }
    } else {
      setIsLoading(false);
    }
  }, [user, userData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      console.log("Login success");
    } catch (err) {
      const errorCode = err.code;
      let errorMessage = "";

      switch (errorCode) {
        case "auth/invalid-email":
          errorMessage = "Invalid email";
          break;
        case "auth/user-not-found":
          errorMessage = "Invalid user";
          break;
        case "auth/missing-password":
          errorMessage = "Enter password";
          break;
        case "auth/user-disabled":
          errorMessage = "Your account is disabled";
          break;
        case "auth/wrong-password":
          errorMessage = "Wrong password";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid Credentials";
          break;
        default:
          errorMessage = "An error occurred during login";
          break;
      }
      alert(errorMessage);
      console.log(err);
    }
  };

  const handlePasswordRecovery = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await resetPassword(email);
      alert("Password reset request sent, please check you email");
    } catch (err) {
      const errorCode = err.code;
      let errorMessage = "";

      switch (errorCode) {
        case "auth/invalid-email":
          errorMessage = "Invalid email";
          break;
        case "auth/user-not-found":
          errorMessage = "Invalid user";
          break;

        case "auth/user-disabled":
          errorMessage = "Your account is disabled";
          break;

        default:
          errorMessage = "An error occurred during password reset";
          break;
      }
      alert(errorMessage);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup(email, password);
      navigate("/my-account");
    } catch (err) {
      const errorCode = err.code;
      let errorMessage = "";

      switch (errorCode) {
        case "auth/invalid-email":
          errorMessage = "Invalid email";
          break;
        case "auth/email-already-in-use":
          errorMessage =
            "A user with this email already exists. Please use a different email.";
          break;
        case "auth/missing-password":
          errorMessage = "Enter password";
          break;
        case "auth/user-disabled":
          errorMessage = "Your account is disabled";
          break;
        default:
          errorMessage = "An error occurred during signup";
          break;
      }
      alert(errorMessage);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="JustPrintings - Products to Posters, Effortlessly"
      />
      <LayoutOne headerTop="visible">
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto ">
                <div className="login-register-wrapper">
                  <Tab.Container
                    activeKey={activeTab}
                    onSelect={(key) => setActiveTab(key)}
                  >
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleLogin}>
                              <input
                                type="text"
                                name="user-email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <input
                                type={showPassword ? "text" : "password"}
                                name="user-password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input
                                    type="checkbox"
                                    id="showPassword"
                                    onChange={() =>
                                      setShowPassword(!showPassword)
                                    }
                                  />
                                  <label className="ml-10">Show password</label>
                                  <Link
                                    onClick={() =>
                                      setActiveTab("password-recovery")
                                    }
                                  >
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleSignup}>
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <input
                                type={
                                  showRegisterPassword ? "text" : "password"
                                }
                                name="user-password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                              />

                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input
                                    type="checkbox"
                                    id="showRegisterPassword"
                                    onChange={() =>
                                      setShowRegisterPassword(
                                        !showRegisterPassword
                                      )
                                    }
                                  />
                                  <label className="ml-10">Show password</label>
                                </div>
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="password-recovery">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handlePasswordRecovery}>
                              <div className="pb-2">Forgot Password?</div>

                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Recover Password</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>

      {isloading && (
        <div className="flone-preloader-wrapper">
          <div className="flone-preloader">
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default LoginRegister;
