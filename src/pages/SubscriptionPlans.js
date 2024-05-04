import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../components/seo";
import LayoutOne from "../layouts/LayoutOne";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";

const PricingTable = () => {
  let { pathname } = useLocation();
  return (
    <Fragment>
      <SEO
        titleTemplate="Subscriptions"
        description="JustPrintings - Products to Posters, Effortlessly"
      />
      <LayoutOne headerTop="hidden">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Subscriptions", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="justify-content-around m-5">
          <div className="row justify-content-around">
            <div className="border rounded p-5 text-center shadow-sm card col-md-3 my-3">
              <h2>Basic Plan</h2>
              <h4 className="price">₹ 3,500/month</h4>
              <ul className="text-start mt-3">
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  96 Product Listings
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />3 Poster
                  Images
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Standard Poster Customization
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Access to Product Management Tools
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Unlimited Product Addition or Deletion
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Basic Customer Support
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Unlimited Downloads per Month
                </li>
              </ul>

              <button
                className="btn btn-primary mt-4"
                style={{
                  backgroundColor: "#A749FF",
                  borderColor: "#A749FF",
                }}
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hello, I'm interested in subscribing to the Justprintings Basic Plan. " +
                    "Could you please provide me with further details on how to proceed? " +
                    "Thank you!"
                  );                  
                  
                  window.open(
                    `https://wa.me/919738567302?text=${message}`,
                    "_blank"
                  );
                }}
              >
                Choose Plan
              </button>
            </div>

            <div className="border rounded p-5 text-center shadow card col-md-3 my-3">
              <h2
                style={{
                  color: "#A749FF",
                }}
              >
                Standard Plan
              </h2>
              <h4 className="price ">₹ 4,500/month</h4>
              <ul className="text-start mt-3">
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  168 Product Listings
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />5 Poster
                  Images
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Standard Poster Customization
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Access to Product Management Tools
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Unlimited Product Addition or Deletion
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Priority Customer Support
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Exclusive Access to New Features
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Unlimited Downloads per Month
                </li>
              </ul>
              <button
                className="btn btn-primary mt-4"
                style={{
                  backgroundColor: "#A749FF",
                  borderColor: "#A749FF",
                }}
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hello, I'm interested in subscribing to the Justprintings Standard Plan. " +
                    "Could you please provide me with further details on how to proceed? " +
                    "Thank you!"
                  );                  
                  
                  window.open(
                    `https://wa.me/919738567302?text=${message}`,
                    "_blank"
                  );
                }}
              >
                Choose Plan
              </button>
            </div>

            <div className="border rounded p-5 text-center shadow-sm card col-md-3 my-3">
              <h2>Premium Plan</h2>
              <h4 className="price ">₹ 5,500/month</h4>
              <ul className="text-start mt-3">
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  240 Product Listings
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />7 Poster
                  Images
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Standard Poster Customization
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Access to Product Management Tools
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Unlimited Product Addition or Deletion
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  VIP Customer Support
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Exclusive Access to New Features
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Early Access to Beta Features
                </li>
                <li className="m-1">
                  <i className="fa fa-check me-1" aria-hidden="true" />
                  Unlimited Downloads per Month
                </li>
              </ul>
              <button
                className="btn btn-primary mt-4"
                style={{
                  backgroundColor: "#A749FF",
                  borderColor: "#A749FF",
                }}
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hello, I'm interested in subscribing to the Justprintings Premium Plan. " +
                    "Could you please provide me with further details on how to proceed? " +
                    "Thank you!"
                  );                  
                  
                  window.open(
                    `https://wa.me/919738567302?text=${message}`,
                    "_blank"
                  );
                }}
              >
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default PricingTable;
