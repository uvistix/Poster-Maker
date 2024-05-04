import React, { useEffect, useState, Fragment } from "react";
import { db } from "../firebaseConfig/FirebaseConfig";
import LayoutOne from "../layouts/LayoutOne";
import SEO from "../components/seo";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import { formatSubscriptionExpiryDate } from "../utils/utils";

const AdminDashboard = () => {
  let { pathname } = useLocation();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState("");

  useEffect(() => {
    localStorage.setItem("redirectUrl", window.location.pathname);
  }, []);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      const clientsData = snapshot.docs.map((doc) => doc.data());
      setClients(clientsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleActivateSubscription = (uid) => {
    if (!subscriptionPlan) {
      return alert("Please select Subscription Plan");
    }
    const confirmActivation = window.confirm(
      "Are you sure you want to activate the subscription?"
    );
    if (confirmActivation) {
      const currentDate = new Date();
      const expiryDate = new Date(
        currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
      );
      const formattedExpiryDate = expiryDate.toISOString();

      db.collection("users")
        .doc(uid)
        .update({
          subscriptionExpiry: formattedExpiryDate,
          subscriptionPlan: subscriptionPlan,
        })
        .then(() => {
          console.log("Subscription activated successfully");
        })
        .catch((error) => {
          console.error("Error activating subscription:", error);
        });
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Admin Dashboard"
        description="JustPrintings - Products to Posters, Effortlessly"
      />
      <LayoutOne headerTop="hidden" visible={loading}>
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Admin Dashboard",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="container">
          <div className="row my-5">
            <h2 className="my-3">Client Information</h2>
            {clients.map((clientData, index) => {
              const { activationDate, formattedDate, remainingTime } =
                formatSubscriptionExpiryDate(clientData.subscriptionExpiry);

              return (
                <div key={index} className="card m-3 p-3">
                  <div className="row">
                    <div className="d-flex justify-content-around align-items-center">
                      <div>
                        <p>Name: {clientData.name}</p>
                        <p>Email: {clientData.email}</p>
                        <p>Number: {clientData.number}</p>
                      </div>
                      <div>
                        Subscription activated on: {activationDate} <br />
                        Subscription ends on: {formattedDate} <br />
                        Remaining time: {remainingTime}
                        <br />
                        Subscription Plan: {clientData.subscriptionPlan ?? null}
                      </div>
                      <div>
                        <select
                          className="form-select mb-2"
                          aria-label="Default select example"
                          onChange={(e) => setSubscriptionPlan(e.target.value)}
                        >
                          <option defaultValue>Select Plan</option>
                          <option value="Basic Plan">Basic Plan</option>
                          <option value="Standard Plan">Standard Plan</option>
                          <option value="Premium Plan">Premium Plan</option>
                        </select>
                        <button
                          className="btn btn-primary"
                          disabled={remainingTime !== "0 days, 0:0:0 hours" || !subscriptionPlan}
                          onClick={() =>
                            handleActivateSubscription(clientData.uid)
                          }
                        >
                          Activate Subscription
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default AdminDashboard;
