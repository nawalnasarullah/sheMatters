import React from 'react'
import GeneralHeroSection from '../components/GeneralHeroSection'
import { heroSectionData, whySheMattersData } from '../components/Data'
import Carousel from '../components/Carousel'
import WhySheMatters from '../components/WhySheMatters'

export default function MaritalTherapy() {
  return (
    <>
    <GeneralHeroSection {...heroSectionData.Marital}/>
    <Carousel/>
    <WhySheMatters {...whySheMattersData.Marital}/>
    </>
  )
}
