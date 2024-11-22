import React from 'react'
import Image from 'next/image'

const TicketsPage = () => {
  return (
    <div className='h-screen bg-gray-100 flex flex-col overflow-x-clip'>
        <div className="w-screen h-[500px] 2xl:h-[800px] overflow-clip bg-black">
            <div className="font-poppins absolute mx-auto top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-center">
            <h1 className="drop-shadow-md text-[4rem] font-bold text-stone-50">
                Tickets
            </h1>
            <p className="text-center mb-8 text-stone-100 italic">Live the moment with the activities available at the island.</p>
            </div>
            <Image alt="hotel" className="w-full h-full object-cover blur-sm opacity-60" src={"/perry.jpg"} width={2000} height={0} />
        </div>
        <div>
            test
        </div>
    </div>
  )
}

export default TicketsPage
