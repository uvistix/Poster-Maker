import { Fragment, useEffect, useState } from "react";
import SEO from "../components/seo";
import LayoutOne from "../layouts/LayoutOne";
import HeroSliderOne from "../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../wrappers/feature-icon/FeatureIcon";
import CountDownThree from "../wrappers/countdown/CountDownThree";
import TestimonialOne from "../wrappers/testimonial/TestimonialOne";
import FeatureIconTwo from "../wrappers/feature-icon/FeatureIconTwo";
import PostersGallery from "../wrappers/hero-slider/PostersGallery";

const HomeFashion = () => {
  const [dealDate, setDealDate] = useState("");
  const [offerName, setOfferName] = useState("");

  const currentDate = new Date();
  const newDate = new Date(currentDate);
  newDate.setHours(currentDate.getHours() + 24);

  const formatDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    try {
      // Check if default date exists in local storage
      const storedDefaultDate = localStorage.getItem("defaultDate");
      const storedDateObj = new Date(storedDefaultDate);
      const currentDate = new Date();

      // Check if stored date is older than current date
      if (storedDateObj < currentDate) {
        // If stored date is older, set new 24-hour period from current date
        const newDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        const newDateString = formatDate(newDate);

        // Update state and local storage with new date
        setDealDate(newDateString);
        localStorage.setItem("defaultDate", newDateString);
      } else {
        // If stored date is still valid, use it
        setDealDate(storedDefaultDate);
      }

      setOfferName("Deal of the day");
    } catch (error) {
      console.error("Error setting default values:", error);
      throw error;
    }
  }, []);

  return (
    <Fragment>
      <SEO
        titleTemplate=" Home"
        description="JustPrintings - Products to Posters, Effortlessly"
      />
      <LayoutOne headerTop="hidden">
        {/* hero slider */}
        <HeroSliderOne />

        {/* featured icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="welcome-content text-center">
                <h1>Welcome To JustPrintings</h1>
              </div>
              <p className="text-center">
                Where we seamlessly blend innovation and convenience to
                transform your product listings into visually striking digital
                posters. Our user-friendly platform empowers businesses, big or
                small, to effortlessly create eye-catching posters. Break free
                from traditional methods and embrace the digital age —
                revolutionize your marketing strategy by turning your products
                into shareable digital masterpieces. Join us in simplifying the
                way you present and promote your offerings, and witness the
                impact of modern, visually engaging marketing with
                JustPrintings.
              </p>
            </div>
          </div>
        </div>

        <PostersGallery spaceTopClass="pt-60" spaceBottomClass="pb-0" />

        {/* countdown */}
        <CountDownThree
          spaceTopClass="pt-80"
          spaceBottomClass="pb-100"
          dateTime={dealDate}
          offerName={offerName}
          countDownImage="/assets/img/banner/h1.png"
        />

        {/* testimonial */}
        <TestimonialOne
          spaceTopClass="pt-95"
          spaceBottomClass="pb-95"
          spaceLeftClass="ml-70"
          spaceRightClass="mr-70"
          bgColorClass="bg-gray-3"
        />
        {/* feature icon */}

        <FeatureIconTwo
          bgImg="/assets/img/bg/shape.png"
          containerClass="container-fluid"
          gutterClass="padding-10-row-col"
          spaceTopClass="pt-50 mt-60"
          spaceBottomClass="pb-40"
        />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
