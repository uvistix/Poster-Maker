import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../components/seo";
import LayoutOne from "../layouts/LayoutOne";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import SectionTitleWithText from "../components/section-title/SectionTitleWithText";
import BannerTwo from "../wrappers/banner/BannerTwo";
import TextGridOne from "../wrappers/text-grid/TextGridOne";
import FunFactOne from "../wrappers/fun-fact/FunFactOne";

const About = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="About us"
        description="JustPrintings - Products to Posters, Effortlessly"
      />
      <LayoutOne headerTop="hidden">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "About us", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        {/* section title with text */}
        <SectionTitleWithText spaceTopClass="pt-100" spaceBottomClass="pb-55" />

        {/* banner */}
        <BannerTwo spaceBottomClass="pb-70" />

        {/* text grid */}
        <TextGridOne spaceBottomClass="pb-70" />

        {/* fun fact */}
        <FunFactOne
          spaceTopClass="pt-30"
          spaceBottomClass="mb-70"
          bgClass="bg-gray-3"
        />
      </LayoutOne>
    </Fragment>
  );
};

export default About;
