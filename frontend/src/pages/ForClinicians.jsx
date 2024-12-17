import React from 'react'
import GeneralHeroSection from '../components/GeneralHeroSection'
import BenefitsSheMatters from '../components/BenefitsSheMatters'

import Carousel from '../components/Carousel'
import MediaSection from '../components/MediaSection'
import { heroSectionData } from '../components/Data'


function ForClinicians() {
  return (
    <>
    <GeneralHeroSection {...heroSectionData.Clinician} />
    <Carousel/>
    <BenefitsSheMatters/>
    <MediaSection/>
    </>
  )
}

export default ForClinicians