import React from 'react'
import Navbar from '../../components/layout/Navbar'
import Hero from '../../components/home/Hero'
import Comments from '../../components/home/Comments'
import Steps from '../../components/home/Steps'
import Tools from '../../components/home/Tools'
import Faqs from '../../components/home/Faqs'
import Footer from '../../components/layout/Footer'
import Cta from '../../components/home/CTA'
// import Boarding3 from '../../components/boarding/Boarding3'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Comments />
      <Steps />
      <Tools />
      <Faqs />
      <Cta/>
      <Footer />
    </>
  )
}

export default Home


