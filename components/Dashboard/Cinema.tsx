import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'

const Cinema = () => {
  return (
    <div>
        <h1 className='dashboard-main-title'>Cinema</h1>
        <div>View and manage the DhonVeli Cinema!</div>
        
        <div className='grid grid-cols-2 mt-10'>
          <div className='flex flex-col gap-10'>
            <h2 className='dashboard-sub-title'>Scheduled Movies</h2>
          </div>

          <div>  
            <Card className='w-[150px] h-[150px] justify-center place-items-center'>
                <CardHeader></CardHeader>
                <CardContent>
                  
                </CardContent>
            </Card>
          </div>
        </div>  
    </div>
  )
}

export default Cinema
