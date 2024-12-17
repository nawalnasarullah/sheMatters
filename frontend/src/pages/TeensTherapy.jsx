import React from 'react'
import GeneralHeroSection from '../components/GeneralHeroSection'
import { heroSectionData, whySheMattersData } from '../components/Data'
import Carousel from '../components/Carousel'
import WhySheMatters from '../components/WhySheMatters'

function TeensTherapy() {
  return (
    <>
    <GeneralHeroSection {...heroSectionData.Teen}/>
    <Carousel/>
    <WhySheMatters {...whySheMattersData.Teen}/>
    </>
  )
}

export default TeensTherapy