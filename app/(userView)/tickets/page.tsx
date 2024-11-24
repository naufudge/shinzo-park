import React from 'react'
import Image from 'next/image'

const TicketsPage = () => {
  return (
    <div className='h-screen bg-gray-100 flex flex-col overflow-x-clip'>
        <div className='2xl:h-[800px] lg:h-[450px] h-[450px] mx-10 my-14 flex justify-center bg-black rounded-2xl'>
          <div className="font-poppins absolute mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-center">
            <h1 className="drop-shadow-md text-[5rem] font-semibold font-dancing text-stone-50">
                Tickets
            </h1>
            <p className="text-stone-100 italic">Live the moment with the activities available at the island.</p>
          </div>
          <Image alt="ride" className="w-full h-full object-cover bg-black blur-sm opacity-90 rounded-2xl" src={"/perry.jpg"} width={2000} height={0} />
        </div>

        <div className=''>
            <div className='text-center'>
              <h1 className='font-poppins font-bold text-2xl'>Activities</h1>
            </div>
        </div>
    </div>
  )
}

export default TicketsPage
