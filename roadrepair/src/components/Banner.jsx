import React from 'react'

function Banner() {
  return (
    <div className="bg-cover bg-center h-[400px] flex items-center justify-center text-center text-white" style={{backgroundImage: "url('/images/banner.jpg')"}}>
    <div>
      <h2 className="text-3xl font-bold">Aliquam ut mauris vestibulum, condimentum neque vitae nulla.</h2>
      <p className="mt-4">Pellentesque congue libero accumsan porta.</p>
    </div>
  </div>
  )
}

export default Banner