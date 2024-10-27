import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface DashboardCardTypes {
    title: string;
    icon: React.JSX.Element;
    content: string;
    className?: string;
}

const DashboardCard: React.FC<DashboardCardTypes> = ({ title, icon, content, className }) => {
  return (
    <Card>
        <CardHeader>
            <div className="flex justify-between w-full">
                <h3 className="italic">{title}</h3>
                <div>{icon}</div>
            </div>
        </CardHeader>
        <CardContent><div className="font-bold text-xl">{content}</div></CardContent>
    </Card>
  )
}

export default DashboardCard
