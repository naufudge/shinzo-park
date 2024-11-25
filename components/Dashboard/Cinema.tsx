import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Image from 'next/image'
import { AlertCircle, CheckCircle, Calendar, TrendingUp, BarChart, Film, Star, StarOff, Stars } from 'lucide-react'

const scheduledMovies = [
  { name: "Advenute Time the Moveiw", date: "01 November 2024", time: "20:00", thumb: "/path-to-.jpg" },
  { name: "Spirited Away", date: "19 November 2024", time: "22:00", thumb: "/path-to-.jpg" },
  { name: "Mean Girls", date: "21 November 2024", time: "12:00", thumb: "/path-to-.jpg" },
  { name: "Scary Movie", date: "01 December 2024", time: "11:00", thumb: "/path-to-.jpg" },
]

const notifications = [
  { message: "Upcoming maintenance on 05 November 2024", type: "info" },
  { message: "Limited seats for 'Easar's Wedding'", type: "warning" },
  { message: "Ticket system issue reported", type: "error" },
]

const reviews = [
  { name: "Aiza", Stars: 2, comment: "Great sound system so good that I could hear the couple three rows back arguing during the entire movie. But props to the cinema for really setting the 'immersive experience' vibe! Will be back if only to catch the next episode of their drama.", date: "19 March 2024", time: "13:00" },
  { name: "Yaman", Stars: 3, comment: "The popcorn was so expensive I considered taking out a mortgage, but at least it was fresh. Also, whoever’s in charge of the AC: I was either freezing or sweating with no in-between. But hey, Spiderman looked awesome, and I got my cardio in from all the shivering!", date: "20 March 2024", time: "15:00" },
]

const Cinema = () => {
  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-2'>Cinema</h1>
      <p className='text-gray-600 mb-8'>View and manage the DhonVeli Cinema!</p>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Scheduled Movies Section */}
        <div className='lg:col-span-2'>
          <h2 className='text-xl font-semibold mb-4'>Scheduled Movies</h2>
          <div className='grid gap-4'>
            {scheduledMovies.map((movie, index) => (
              <Card key={index} className='p-4 rounded-lg shadow-md flex flex-row gap-4 items-center'>
                <div className='w-16 h-16 rounded overflow-hidden'>
                  <Image src={movie.thumb} alt={`${movie.name} Thumbnail`} width={64} height={64} className="object-cover" />
                </div>
                <div>
                  <div className='font-semibold text-lg'>{movie.name}</div>
                  <div className='text-sm italic text-stone-500'>{movie.date} - {movie.time}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Booking and Reservation Stats */}
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Booking & Reservation Stats</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <Calendar size={20} />
              <p>Total Reservations: 150</p>
            </div>
            <div className='flex items-center gap-2'>
              <Film size={20} />
              <p>Available Seats: 50</p>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle size={20} />
              <p>Today's Bookings: 30</p>
            </div>
            <div className='flex items-center gap-2'>
              <TrendingUp size={20} />
              <p>Seats Filled: 75%</p>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            {reviews.map((review, index) => (
              <div key={index} className='p-2 border-b last:border-0'>
                <div className='flex items-center gap-2'>
                  <p className='font-semibold'>{review.name}</p>
                  <div className="flex text-yellow-500">
                      {[...Array(review.Stars)].map((_, i) => (
                      <Star key={i} fill="orange" stroke="none" />
                    ))}
                  </div>
                </div>
                <p className='text-sm text-gray-600'>{review.comment}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events / New Releases Section */}
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Upcoming Events & New Releases</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <p>Special Screening: 'The Dark Knight' - 05 November 2024</p>
            <p>Release Date: 'Avatar 2' - 15 December 2024</p>
          </CardContent>
        </Card>

        {/* Notifications Panel */}
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Notifications Panel</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            {notifications.map((notification, index) => (
              <div key={index} className={`p-2 rounded flex items-center gap-2 ${notification.type === 'error' ? 'bg-red-100' : notification.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                {notification.type === 'error' ? (
                  <AlertCircle className='text-red-500' size={20} />
                ) : notification.type === 'warning' ? (
                  <AlertCircle className='text-yellow-500' size={20} />
                ) : (
                  <AlertCircle className='text-blue-500' size={20} />
                )}
                <span>{notification.message}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Analytics Dashboard */}
        <Card className='col-span-2 w-full'>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>Insights on Cinema Operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='p-4 bg-gray-100 rounded text-center'>
                <BarChart className="text-blue-500 mb-2" size={24} />
                <p className='font-semibold'>Daily Visitors</p>
                <p>120</p>
              </div>
              <div className='p-4 bg-gray-100 rounded text-center'>
                <TrendingUp className="text-green-500 mb-2" size={24} />
                <p className='font-semibold'>Revenue</p>
                <p>$2000</p>
              </div>
              <div className='p-4 bg-gray-100 rounded text-center'>
                <CheckCircle className="text-yellow-500 mb-2" size={24} />
                <p className='font-semibold'>Feedback Score</p>
                <p>4.5/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Cinema