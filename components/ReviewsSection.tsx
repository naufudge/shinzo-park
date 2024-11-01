'use client';

import React from 'react'
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import ReviewCard from '@/components/Cards/ReviewCard'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent } from '@/components/ui/card'

const reviews = [
  {user: "Aahil", rating: 5, datetime: "19 March 2024 - 13:00", review: "We paid mostly for the stunning location at this place. The service was decent, and while the food wasn't mind-blowing, the views totally made up for it. There are three restaurants on-site, but 'Oceans' is the one to hit up—it's the best of the bunch. We also went scuba diving, which was awesome, just make sure not to eat too much beforehand."},
  {user: "Axwa", rating: 4, datetime: "20 March 2024 - 15:00", review: "Superb experience. Such a beautiful country. At Centara hotel you must try the Nurse shark snorkeling course which costs around 160USD per person extra. We enjoyed the Karaoke and pubs with the All inclusive plan which provided us all three meals and unlimited liquor at all the bars and restaurants. Best recommend."},
]

const reviewChartData = [
  {star: "5 ★", ratings: 50},
  {star: "4 ★", ratings: 75},
  {star: "3 ★", ratings: 10},
  {star: "2 ★", ratings: 5},
  {star: "1 ★", ratings: 3},
]

const chartConfig = {
  ratings: {
    label: "Ratings",
    color: "#fc6600",
  },
} satisfies ChartConfig

const ReviewsSection = () => {
  return (
    <div className='m-[100px]'>
        <div className="mb-10 flex flex-col text-center gap-2">
            <h1 className='font-poppins font-bold text-center text-3xl'>Customer <span className='text-orange-700'>Reviews</span></h1>
            <div className='text-opacity-50 italic text-sm'>See what our customers are saying!</div>
        </div>
    
        <div className='grid grid-cols-2 p-5'>
            <div className='flex place-items-center justify-center'>
              <Card className=''>
                <CardContent className='p-5 px-10 min-w-[350px] min-h-[250px]'>
                  <div className='font-roboto font-bold text-[4rem] text-center'>4.5</div>
                  <div>
                    <ChartContainer config={chartConfig}>
                      <BarChart
                        accessibilityLayer
                        data={reviewChartData}
                        layout="vertical"
                        margin={{
                          left: -20,
                        }}>
                        <XAxis type="number" dataKey="ratings" hide />
                        <YAxis
                          type="category"
                          dataKey="star"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                          // tickFormatter={(value) => value.slice(0, 3)}
                        />
        
                        <Bar dataKey="ratings" fill="var(--color-ratings)" radius={5} />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className='flex flex-col gap-5'>
              {reviews.map((review, index) => (
                <ReviewCard key={index} user={review.user} datetime={review.datetime} rating={review.rating} review={review.review}  />
              ))}
            </div>
        </div>
    </div>
  )
}

export default ReviewsSection