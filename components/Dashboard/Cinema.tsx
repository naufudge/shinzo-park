import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const testData = [
  {name: "Spiderman", date: "01 November 2024", time: "20:00", thumb: ""},
  {name: "Batman", date: "19 November 2024", time: "22:00", thumb: ""},
  {name: "Avengers", date: "21 November 2024", time: "12:00", thumb: ""},
  {name: "Thor", date: "01 December 2024", time: "11:00", thumb: ""},
]

const Cinema = () => {
  return (
    <div>
        <h1 className='dashboard-main-title'>Cinema</h1>
        <div>View and manage the DhonVeli Cinema!</div>
        
        <div className='grid grid-cols-2 mt-10 gap-10'>
          <div className='flex flex-col gap-5'>
            <h2 className='dashboard-sub-title'>Scheduled Movies</h2>

            <div className='flex flex-col gap-5'>
              {testData.map((item, index) => (
                <div className='flex flex-col border p-8 rounded-lg'>
                  <div className='font-semibold'>{item.name}</div>

                  <div className='text-sm italic text-stone-500'>{item.date} - {item.time}</div>
                </div>
              ))}
              <div></div>

            </div>

          </div>

          <div>  
            {/* <Card className='w-[150px] h-[150px] justify-center place-items-center'>
                <CardHeader></CardHeader>
                <CardContent>
                  
                </CardContent>
            </Card> */}
          </div>
        </div>  
    </div>
  )
}

export default Cinema
