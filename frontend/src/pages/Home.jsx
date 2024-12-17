import React from 'react'
import HeroSection from '../components/HeroSection'
import Carousel from '../components/Carousel'
import WhySheMatters from '../components/WhySheMatters'
import { whySheMattersData } from '../components/Data'

function Home() {
  return (
    <>
    <HeroSection/>
    <Carousel/>
    <WhySheMatters {...whySheMattersData.HomePage} />
    </>
  )
}

export default Home