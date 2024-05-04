import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../components/seo";
import LayoutOne from "../layouts/LayoutOne";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";

const PrivacyPolicy = () => {
  let { pathname } = useLocation();
  return (
    <Fragment>
      <SEO
        titleTemplate="Privacy Policy"
        description="JustPrintings - Products to Posters, Effortlessly"
      />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Privacy Policy",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />

        <div className="container">
          <div className="row">
            <div className="col-lg-12 pb-60">
              <div className="welcome-content text-center mt-5">
                <h1>FAQ's</h1>
              </div>
              <div className="privacy-policy-container">
                <section className="my-3">
                  <h3>Q: What is JustPrintings?</h3>
                  <p>
                    JustPrintings is an innovative platform that allows users to
                    transform their product listings into visually stunning
                    digital posters.
                  </p>
                </section>

                <section className="my-3">
                  <h3>Q: How can I use JustPrintings?</h3>
                  <p>
                    To use JustPrintings, simply sign up for an account.
                    Registered users can add, remove, and manage their product
                    listings. Subscribers enjoy additional features such as
                    converting the products into digital posters.
                  </p>
                </section>

                <section className="my-3">
                  <h3>Q: Can I try JustPrintings for free?</h3>
                  <p>
                    Yes, we offer a free plan that allows users to manage their
                    product listings. However, certain features, such as poster
                    creation, are exclusive to our subscribers.
                  </p>
                </section>

                <section className="my-3">
                  <h3>Q: How does the poster creation process work?</h3>
                  <p>
                    For subscribers, creating a poster is a seamless process.
                    Simply select the product, customize the details, and
                    generate a visually appealing digital poster. This poster
                    can be shared on platforms like WhatsApp, Facebook, or
                    Instagram.
                  </p>
                </section>

                <section className="my-3">
                  <h3>Q: What happens if I don't have a subscription plan?</h3>
                  <p>
                    Non-subscribers can still manage their product listings but
                    won't have access to the poster creation feature. Instead,
                    they will see a "Subscribe to Print" button in their cart.
                  </p>
                </section>

                <section className="my-3">
                  <h3>Q: Is there a refund policy?</h3>
                  <p>
                    No, all transactions on JustPrintings are non-refundable. We
                    recommend reviewing subscription details carefully before
                    making a purchase.
                  </p>
                </section>

                <section className="my-3">
                  <h3>Q: How do I contact JustPrintings for support?</h3>
                  <p>
                    For any support or privacy-related inquiries, please email
                    us at{" "}
                    <a href="mailto:uvistix@gmail.com">uvistix@gmail.com</a>.
                  </p>
                </section>

                <section className="my-3">
                  <h3>Q: Can I share my digital posters on social media?</h3>
                  <p>
                    Absolutely! Subscribers can share their digital posters on
                    platforms like WhatsApp, Facebook, or Instagram for
                    real-time engagement with their audience.
                  </p>
                </section>

                <section className="my-3">
                  <h3>Q: What happens if my account is terminated?</h3>
                  <p>
                    JustPrintings reserves the right to terminate accounts for
                    unethical practices or violation of our terms of service.
                    Users are responsible for reviewing and adhering to our
                    policies.
                  </p>
                </section>

                <section className="my-3">
                  <h3>
                    Q: How do I upgrade my account to a subscription plan?
                  </h3>
                  <p>
                    Upgrading to a subscription plan is easy! Simply visit the
                    Subscription page in your account settings, choose the plan
                    that suits you, and follow the steps to complete the
                    upgrade.
                  </p>
                </section>

                <section className="my-3">
                  <h3>Q: Are there discounts for yearly subscription plans?</h3>
                  <p>
                    Yes, we offer discounts for users who choose our yearly
                    subscription plans. Enjoy the benefits of JustPrintings at a
                    discounted rate when you opt for an annual subscription.
                  </p>
                </section>

                <section className="my-3">
                  <h3>Q: Can I cancel my subscription plan anytime?</h3>
                  <p>
                    Yes, you can cancel your subscription plan at any time. The
                    cancellation will be effective at the end of your current
                    billing period, and you will retain access to subscription
                    features until then.
                  </p>
                </section>

                <section className="my-3">
                  <h3>Q: How often are new features added to JustPrintings?</h3>
                  <p>
                    We strive to enhance JustPrintings regularly. New features
                    and improvements are added based on user feedback and
                    evolving industry trends.
                  </p>
                </section>

                <p>
                  Have more questions? Contact us at
                  <a href="mailto:uvistix@gmail.com"> uvistix@gmail.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default PrivacyPolicy;
