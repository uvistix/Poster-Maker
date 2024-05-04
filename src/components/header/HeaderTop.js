import PropTypes from "prop-types";
import { useAuth } from "../../authContext/AuthContext";
import { formatSubscriptionExpiryDate } from "../../utils/utils";
import Marquee from "react-fast-marquee";

const HeaderTop = () => {
  const { user, userData } = useAuth();
  let remainingTime = "";

  if (user && userData) {
    // Assign value only if user and userData exist
    const formattedData = formatSubscriptionExpiryDate(
      userData.subscriptionExpiry
    );
    remainingTime = formattedData.remainingTime;
  }

  return (
    <div className="header-offer">
      {remainingTime &&
        (() => {
          // Split the remaining time into days, hours, and minutes
          const [daysString] = remainingTime.split(" ");
          // Extract the number of days
          const days = parseInt(daysString);

          // Check if remaining time is less than or equal to 3 days
          if (days <= 3 && days >= 1) {
            // Render the marquee
            return (
              <Marquee className="text-danger">
                <span className="px-5">
                  Your subscription will expire in{" "}
                  <span className="px-1">{days} </span> days. Renew now to
                  continue enjoying the benefits of JustPrintings! Elevate your
                  products into eye-catching masterpieces effortlessly –
                  JustPrintings, where innovation meets simplicity!
                </span>
              </Marquee>
            );
          } else if (days === 0) {
            return (
              <Marquee className="text-danger">
                <span className="px-5">
                  You don't have an active subscription. Subscribe now to enjoy
                  the benefits of JustPrintings! Elevate your products into
                  eye-catching masterpieces effortlessly – JustPrintings, where
                  innovation meets simplicity!
                </span>
              </Marquee>
            );
          }
        })()}
    </div>
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
};

export default HeaderTop;
