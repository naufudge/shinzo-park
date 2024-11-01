import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Star } from 'lucide-react';

interface ReviewCardType extends React.HTMLAttributes<HTMLDivElement>{
    user: string;
    datetime: string;
    rating: number;
    review: string;
}

const ReviewCard: React.FC<ReviewCardType> = ({ user, datetime, rating, review, ...props }) => {
  return (
    <Card className="px-2" {...props}>
        <CardHeader className="mb-0 pb-2">
            <div className="flex justify-between place-items-center">
                <div className="flex gap-2 place-items-center">
                    {/* User's name */}
                    <div className="font-semibold">{user}</div>
                    {/* Rating (Stars) */}
                    <div className="flex">
                        {[...Array(rating)].map((e, i) => (
                            <Star key={i} fill="orange" stroke="none" />
                        ))}
                    </div>
                </div>
                {/* Review Date & Time */}
                <div className="text-[12px] italic text-stone-500">{datetime}</div>
            </div>
        </CardHeader>
        <CardContent>
            {/* The Review */}
            <p className="italic text-stone-600 font-serif text-justify">"{review}"</p>
        </CardContent>
    </Card>
  )
}

export default ReviewCard
