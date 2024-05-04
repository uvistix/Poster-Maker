import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../components/seo";
import LayoutOne from "../layouts/LayoutOne";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";

const Contact = () => {
  let { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Contact"
        description="JustPrintings - Products to Posters, Effortlessly"
      />
      <LayoutOne headerTop="hidden" visible={loading}>
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Contact", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="custom-row-2">
              <div
                className="col-12 col-lg-4 col-md-5"
                style={{ backgroundColor: "#f3f3f3" }}
              >
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <a href="tel:9738567302">
                        <p>+91 9738 567 302</p>
                      </a>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-envelope" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="mailto:uvistix@gmail.com">uvistix@gmail.com</a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec ">
                      <p className="lh-base">
                        #34, Near Venugopala Swamy Temple, Belathur, Bengaluru
                        560-067.
                      </p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Follow Us</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//instagram.com">
                          <i className="fa fa-instagram" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Get In Touch</h2>
                  </div>
                  <form className="contact-form-style">
                    <div className="row">
                      <div className="col-lg-6">
                        <input
                          name="name"
                          placeholder="Name*"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="col-lg-6">
                        <input
                          name="number"
                          placeholder="Number*"
                          type="number"
                          value={formData.number}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="col-lg-12">
                        <input
                          name="email"
                          placeholder="Email*"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          name="message"
                          placeholder="Your Message*"
                          value={formData.message}
                          onChange={(e) => handleChange(e)}
                        />
                        <button
                          className="submit"
                          onClick={() => {
                            const { name, number, email, message } = formData;
                            const formattedMessage = encodeURIComponent(
                              `Hello! \n\n` +
                                `Thank you for reaching out to Justprintings. \n\n` +
                                `Here are the details you provided:\n\n` +
                                `Name: ${name}\n` +
                                `Number: ${number}\n` +
                                `Email: ${email}\n` +
                                `Message: ${message}\n\n` +
                                `Our team will review your message and get back to you shortly. If you have any urgent inquiries, please feel free to call us at +91 9738 567 302. Click 'SEND' button to send your message. Have a great day! `
                            );

                            window.open(
                              `https://wa.me/919738567302?text=${formattedMessage}`,
                              "_blank"
                            );
                          }}
                        >
                          SEND
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-message" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Contact;
