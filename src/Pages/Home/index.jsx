import React from "react";
import Body from "../../Blocks/Body";
import Hero from "../../Blocks/Hero";
import Progress from "../../Blocks/Progress";
import DefiAccess from "../../Blocks/DefiAccess";
// import ChainSection from "../../Blocks/Chains";
import DexSection from "../../Blocks/Dex";
import Road from "../../Blocks/Road";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <Body>
      <Hero />
      <Progress />
      <DefiAccess />
      {/* <ChainSection /> */}
      <DexSection />
      <Road />
      <Footer />
    </Body>
  );
};

export default Home;
