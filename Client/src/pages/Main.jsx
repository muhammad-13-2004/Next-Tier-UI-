import React from 'react'
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Comments from '../components/Comments';
import Steps from '../components/Steps';
import Tools from '../components/Tools';
import Faqs from '../components/Faqs';
import Footer from '../components/Footer';

const Main = () => {
  return (
    <>
    <Navbar />
    <Hero />
    <Comments />
    <Steps />
    <Tools />
    <Faqs />
    <Footer />
    </>
  )
}

export default Main