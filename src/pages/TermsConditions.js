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
        titleTemplate="Terms Conditions"
        description="JustPrintings - Products to Posters, Effortlessly"
      />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Terms Conditions",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />

        <div className="container">
          <div className="row">
            <div className="col-lg-12 pb-60">
              <div className="welcome-content text-center mt-5">
                <h1>Terms Conditions</h1>
              </div>
              <div className="privacy-policy-container">
                <p>
                  Welcome to JustPrintings! These Terms and Conditions govern
                  your use of our website and services. By accessing or using
                  JustPrintings, you agree to comply with and be bound by these
                  terms. If you disagree with any part of these terms, please do
                  not use our services.
                </p>

                <section className="my-3">
                  <h3>1. Account Registration:</h3>
                  <p>
                    To access certain features, you may be required to register
                    an account. You are responsible for maintaining the
                    confidentiality of your account information. You agree to
                    provide accurate, current, and complete information during
                    the registration process.
                  </p>
                </section>

                <section className="my-3">
                  <h3>2. Acceptable Use:</h3>
                  <p>
                    You agree to use JustPrintings for lawful purposes only. You
                    will not engage in any activity that interferes with the
                    proper functioning of the platform.
                  </p>
                </section>

                <section className="my-3">
                  <h3>3. Intellectual Property:</h3>
                  <p>
                    All content on JustPrintings, including but not limited to
                    text, graphics, logos, and images, is the property of
                    JustPrintings and protected by intellectual property laws.
                  </p>
                </section>

                <section className="my-3">
                  <h3>4. Prohibited Activities:</h3>
                  <p>
                    Users are prohibited from engaging in any harmful or
                    unethical activities on the platform. Any violation of our
                    terms may result in account termination.
                  </p>
                </section>

                <section className="my-3">
                  <h3>5. User-Generated Content:</h3>
                  <p>
                    By submitting content to JustPrintings, you grant us a
                    non-exclusive, worldwide, royalty-free license to use,
                    reproduce, and distribute the content.
                  </p>
                </section>

                <section className="my-3">
                  <h3>6. Limitation of Liability:</h3>
                  <p>
                    JustPrintings is not liable for any direct, indirect,
                    incidental, or consequential damages resulting from the use
                    of our services.
                  </p>
                </section>

                <section className="my-3">
                  <h3>7. Termination:</h3>
                  <p>
                    JustPrintings reserves the right to terminate or suspend
                    your account at any time for violation of these terms.
                  </p>
                </section>

                <section className="my-3">
                  <h3>8. Governing Law:</h3>
                  <p>
                    These terms shall be governed by and construed in accordance
                    with the laws of Karnataka State Jurisdiction.
                  </p>
                </section>

                <section className="my-3">
                  <h3>9. Changes to Terms:</h3>
                  <p>
                    JustPrintings may update these terms periodically. You are
                    responsible for reviewing the terms regularly.
                  </p>
                </section>

                <section className="my-3">
                  <h3>10. Contact Information:</h3>
                  <p>
                    For any inquiries or concerns, contact us at{" "}
                    <a href="mailto:your@email.com">uvistix@gmail.com</a>.
                  </p>
                </section>

                <p>
                  By using JustPrintings, you acknowledge and agree to these
                  Terms and Conditions.
                </p>

                <p>Last Updated: 26 January, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default PrivacyPolicy;
