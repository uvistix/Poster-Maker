import PropTypes from "prop-types";
import clsx from "clsx";
import { db } from "../../firebaseConfig/FirebaseConfig";

const FooterNewsletter = ({
  spaceBottomClass,
  spaceLeftClass,
  sideMenu,
  colorClass,
  widgetColorClass,
}) => {
  const subscribeNewsletter = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    try {
      // Assuming you have a collection named "subscribers" in your Firestore database
      await db.collection("subscribers").add({
        email: email,
        subscribedAt: new Date(),
      });
      alert("Thank you for subscribing!");
      // Clear input after successful subscription
      e.target.elements.email.value = "";
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("There was an error subscribing. Please try again later.");
    }
  };
  return (
    <div
      className={clsx(
        "footer-widget",
        spaceBottomClass,
        sideMenu ? "ml-ntv5" : spaceLeftClass,
        widgetColorClass
      )}
    >
      <div className="footer-title">
        <h3>SUBSCRIBE</h3>
      </div>
      <div className={clsx("subscribe-style", colorClass)}>
        <p>Get E-mail updates about our latest shop and special offers.</p>
        {/* subscribe email */}
        <div>
          <form className="d-flex" onSubmit={subscribeNewsletter}>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              className="form-control"
              required
            />
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

FooterNewsletter.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  colorClass: PropTypes.string,
  widgetColorClass: PropTypes.string,
};

export default FooterNewsletter;
