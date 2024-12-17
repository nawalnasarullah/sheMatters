import React from "react";
import GeneralHeroSection from "../components/GeneralHeroSection";
import { heroSectionData, whySheMattersData } from "../components/Data";
import Carousel from "../components/Carousel";
import WhySheMatters from "../components/WhySheMatters";

function MotherhoodTherapy() {
  return (
    <>
      <GeneralHeroSection {...heroSectionData.Motherhood} />
      <Carousel />
      <WhySheMatters {...whySheMattersData.Motherhood} />
    </>
  );
}

export default MotherhoodTherapy;
