import React, { useEffect, useState } from "react";
import { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import fetchProducts from "./data/Products";
import { useAuth } from "./authContext/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";

const LoginRegister = lazy(() => import("./pages/LoginRegister"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const AddProduct = lazy(() => import("./pages/AddProducts"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const Faqs = lazy(() => import("./pages/Faqs"));
const SubscriptionPlans = lazy(() => import("./pages/SubscriptionPlans"));

const App = () => {
  const { user, userData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    try {
      if (user && userData) {
        fetchProducts(user, userData);
      }
    } catch (error) {
      console.log("no user");
    } finally {
      setIsLoading(false);
    }
  }, [user, userData]);

  return (
    <Router>
      <ScrollToTop>
        <Suspense
          fallback={
            <div className="flone-preloader-wrapper">
              <div className="flone-preloader">
                <span></span>
                <span></span>
              </div>
            </div>
          }
        >
          {isLoading ? (
            <div className="flone-preloader-wrapper">
              <div className="flone-preloader">
                <span></span>
                <span></span>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path={process.env.PUBLIC_URL + "/"} element={<Home />} />
              <Route
                path={process.env.PUBLIC_URL + "/about"}
                element={<About />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/subscriptions"}
                element={<SubscriptionPlans />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/add-product"}
                element={
                  user && userData ? (
                    <AddProduct />
                  ) : (
                    <Navigate to="/login-register" />
                  )
                }
              />
              <Route
                path={process.env.PUBLIC_URL + "/contact"}
                element={<Contact />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/products"}
                element={
                  user && userData ? (
                    <Shop />
                  ) : (
                    <Navigate to="/login-register" />
                  )
                }
              />

              <Route
                path={process.env.PUBLIC_URL + "/admin-dashboard"}
                element={
                  user && userData && userData.userType === "admin" ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />

              <Route
                path={process.env.PUBLIC_URL + "/my-account"}
                element={
                  user && userData ? (
                    <MyAccount />
                  ) : (
                    <Navigate to="/login-register" />
                  )
                }
              />

              <Route
                path={process.env.PUBLIC_URL + "/privacy-policy"}
                element={<PrivacyPolicy />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/terms-conditions"}
                element={<TermsConditions />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/faqs"}
                element={<Faqs />}
              />

              <Route
                path={process.env.PUBLIC_URL + "/cart"}
                element={
                  user && userData ? (
                    <Cart />
                  ) : (
                    <Navigate to="/login-register" />
                  )
                }
              />
              <Route
                path={process.env.PUBLIC_URL + "/checkout"}
                element={
                  user && userData ? (
                    <Checkout />
                  ) : (
                    <Navigate to="/login-register" />
                  )
                }
              />
              <Route
                path={process.env.PUBLIC_URL + "/login-register"}
                element={<LoginRegister />}
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;
