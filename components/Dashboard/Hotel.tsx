import React from 'react'
import DashboardCard from './DashboardCard'
import { Banknote, HousePlus } from 'lucide-react'

const Hotel = () => {
  return (
    <div>
      <h1 className='font-roboto font-bold text-2xl'>Hotel</h1>
      <div>Access and manage a detailed overview of the Hotel!</div>
      <div className='grid grid-cols-4 gap-10 mt-10'>
        <DashboardCard title='Rooms' icon={<HousePlus color='orange' />} content='25' />

        <DashboardCard title='Revenue' icon={<Banknote color='green' />} content='$5,000' />


      </div>
    </div>
  )
}

export default Hotel
