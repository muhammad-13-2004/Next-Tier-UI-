import React from 'react'
import AuthForm from '../components/AuthForm'
import Logo from '../assets/LogoApp.png'
import Formpic from '../assets/signup.png'

const SignUp = () => {
  return (
    <section className='bg-white w-screen h-screen flex justify-between overflow-hidden'>

  {/* LEFT SIDE */}
  <div className='w-1/2 flex flex-col px-16 py-10 '>

    <img src={Logo} alt="logo" className='w-[120px] mb-10' />

    <div className='flex flex-1 items-center'>
      <AuthForm mode="signup" />
    </div>

  </div>

  {/* RIGHT SIDE */}
  <div className='w-auto h-screen p-2'>
    <img
      src={Formpic}
      alt="form visual"
      className='w-auto h-full object-cover object-center'
    />
  </div>

</section>
  )
}

export default SignUp