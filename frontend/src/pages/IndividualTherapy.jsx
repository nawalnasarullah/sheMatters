import React from 'react'
import GeneralHeroSection from '../components/GeneralHeroSection'
import Carousel from '../components/Carousel'
import WhySheMatters from '../components/WhySheMatters'
import { heroSectionData } from '../components/Data'

function IndividualTherapy() {
  return (
    <>
    <GeneralHeroSection {...heroSectionData.Individual}/>
    <Carousel/>
    <WhySheMatters/>
    </>
  )
}

export default IndividualTherapy