// utils.js
export const formatSubscriptionExpiryDate = (expiryDateString) => {
  const subscriptionExpiryDate = new Date(expiryDateString);

  if (isNaN(subscriptionExpiryDate.getTime())) {
    return { formattedDate: "Inactive", remainingTime: "Inactive" }; // Handle invalid date strings
  }

  const currentDate = new Date();
  let remainingTimeMillis = subscriptionExpiryDate - currentDate;

  if (remainingTimeMillis < 0) {
    remainingTimeMillis = 0; // Set remaining time to 0 if it's negative
  }

  const remainingDays = Math.floor(remainingTimeMillis / (1000 * 60 * 60 * 24));
  const remainingHours = Math.floor(
    (remainingTimeMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const remainingMinutes = Math.floor(
    (remainingTimeMillis % (1000 * 60 * 60)) / (1000 * 60)
  );
  const remainingSeconds = Math.floor(
    (remainingTimeMillis % (1000 * 60)) / 1000
  );

  const day = ("0" + subscriptionExpiryDate.getDate()).slice(-2);
  const month = ("0" + (subscriptionExpiryDate.getMonth() + 1)).slice(-2);
  const year = subscriptionExpiryDate.getFullYear();
  const hours = ("0" + subscriptionExpiryDate.getHours()).slice(-2);
  const minutes = ("0" + subscriptionExpiryDate.getMinutes()).slice(-2);
  const seconds = ("0" + subscriptionExpiryDate.getSeconds()).slice(-2);

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  const remainingTime = `${remainingDays} days, ${remainingHours}:${remainingMinutes}:${remainingSeconds} hours`;

  // Calculate activation date (30 days before expiry date)
  const activationDate = new Date(
    subscriptionExpiryDate.getTime() - 30 * 24 * 60 * 60 * 1000
  );
  const activationDay = ("0" + activationDate.getDate()).slice(-2);
  const activationMonth = ("0" + (activationDate.getMonth() + 1)).slice(-2);
  const activationYear = activationDate.getFullYear();
  const activationFormattedDate = `${activationDay}/${activationMonth}/${activationYear}`;

  return {
    formattedDate,
    remainingTime,
    activationDate: activationFormattedDate,
  };
};
