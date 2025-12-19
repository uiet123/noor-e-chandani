import React from 'react'
import Banner from '../Banner/Banner'
import About from '../About/About'
import Collections from '../Collections/Collections'
import Reviews from '../Reviews/Reviews'
{/*import CustomCandleSection from '../CustomCandleSection/CustomCandleSection'*/}

const Hero = () => {
  return (
    <div>
        <Banner />
        <About />
        <Collections />
       {/* <CustomCandleSection />*/}
        <Reviews />
    </div>
  )
}

export default Hero