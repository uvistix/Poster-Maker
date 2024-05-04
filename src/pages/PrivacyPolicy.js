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
                <h1>Privacy Policy</h1>
              </div>
              <div className="privacy-policy-container">
                <p>
                  At JustPrintings, safeguarding your privacy is paramount. This
                  Privacy Policy outlines our practices regarding the
                  collection, use, and protection of your information.
                </p>

                <section className="my-3">
                  <h3>1. Information Collection:</h3>
                  <p>
                    We collect user-provided information, such as personal
                    details, product listings, and subscription data.
                    Additionally, non-personal information like usage patterns
                    and IP addresses may be gathered.
                  </p>
                </section>

                <section className="my-3">
                  <h3>2. Use of Information:</h3>
                  <p>
                    Your data enhances your platform experience, enabling
                    personalized content and service improvements. We may use it
                    for communication, updates, and relevant marketing, provided
                    you opt-in.
                  </p>
                </section>

                <section className="my-3">
                  <h3>3. Data Security:</h3>
                  <p>
                    While we employ industry-standard security, absolute
                    security cannot be guaranteed. Users are responsible for
                    their account security.
                  </p>
                </section>

                <section className="my-3">
                  <h3>4. Third-Party Services:</h3>
                  <p>
                    External links may be present, and we are not responsible
                    for the privacy practices or content of these third parties.
                  </p>
                </section>

                <section className="my-3">
                  <h3>5. Cookies:</h3>
                  <p>
                    Cookies improve user experience and collect interaction
                    data. You have the option to disable cookies, but this may
                    impact site functionality.
                  </p>
                </section>

                <section className="my-3">
                  <h3>6. Updates to Privacy Policy:</h3>
                  <p>
                    This Privacy Policy may be updated periodically, with
                    changes effective upon posting. Users are responsible for
                    staying informed about policy changes.
                  </p>
                </section>

                <section className="my-3">
                  <h3>7. Non-Refund Policy:</h3>
                  <p>
                    All transactions on JustPrintings are non-refundable. Users
                    are encouraged to review product details before purchase.
                  </p>
                </section>

                <section className="my-3">
                  <h3>8. Website Management Rights:</h3>
                  <p>
                    JustPrintings reserves the right to terminate any user
                    account for unethical practices, violation of our terms of
                    service, or any activity deemed harmful to the community. We
                    also reserve the right to modify or discontinue the platform
                    at any time without notice.
                  </p>
                </section>

                <section className="my-3">
                  <h3>9. Governing Law:</h3>
                  <p>
                    This Privacy Policy shall be governed by and construed in
                    accordance with the laws of Karnataka State Jurisdiction.
                    Any disputes arising under or in connection with this policy
                    shall be subject to the exclusive jurisdiction of the
                    Karnataka State Jurisdiction courts.
                  </p>
                </section>

                <section className="my-3">
                  <h3>10. Contact Us:</h3>
                  <p>
                    For privacy-related inquiries, contact us at{" "}
                    <a href="mailto:your@email.com">uvistix@gmail.com</a>.
                  </p>
                </section>

                <p>
                  By using JustPrintings, you acknowledge and agree to the terms
                  outlined in this Privacy Policy.
                </p>

                <p>Last Updated: 22 January, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default PrivacyPolicy;
