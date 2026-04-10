import React from 'react'
import supabase from '@/services/supabase';
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

  const navigate = useNavigate();
  
  const logout = async () => {

    await supabase.auth.signOut();
    navigate('/')    

  }


  return (
    <>
      <div>Hi You are now authenticated</div>
      <button onClick={logout}> logout </button>
    </>
  )
}

export default Dashboard