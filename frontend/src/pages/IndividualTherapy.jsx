import React from 'react'
import GeneralHeroSection from '../components/GeneralHeroSection'
import Carousel from '../components/Carousel'
import WhySheMatters from '../components/WhySheMatters'
import { heroSectionData, whySheMattersData } from '../components/Data'

function IndividualTherapy() {
  return (
    <>
    <GeneralHeroSection {...heroSectionData.Individual}/>
    <Carousel/>
    <WhySheMatters {...whySheMattersData.Individual}/>
    </>
  )
}

export default IndividualTherapy