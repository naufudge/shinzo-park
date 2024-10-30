import React from 'react';
import { Users, DollarSign, Ticket, Activity, Star } from 'lucide-react';

const StatCard = ({ title, value, Icon, color }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
    <div>
      <h2 className="font-semibold">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <Icon className={`${color} w-10 h-10`} />
  </div>
);

const ReviewCard = ({ reviews }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="font-semibold text-lg mb-4">Latest Reviews</h2>
    <div className="space-y-6">
      {reviews.map((review, idx) => (
        <div key={idx} className="space-y-2">
          <div className="flex items-center space-x-2">
            <p className="font-semibold">{review.name}</p>
            <div className="flex text-yellow-500">
              {Array(review.stars).fill(<Star size={16} />)}
            </div>
          </div>
          <p className="text-gray-600">{review.text}</p>
        </div>
      ))}
    </div>
  </div>
);

const InfoCard = ({ title, items }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="font-semibold text-lg mb-4">{title}</h2>
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex justify-between">
          <p>{item.label}</p>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  </div>
);

const WaterPark = () => {
  const reviews = [
    { name: 'Elgius', stars: 5, text: "The slides were so fast I think I left my soul behind! My hair is still recovering from the wind. 10/10 would scream again as is if my emulator wont work again " },
    { name: 'Axwa', stars: 4, text: "I accidentally went down the kiddie slide, and the lifeguard looked at me like I was 5. Best day of my life." },
  ];

  return (
    <div className="p-6 space-y-8 font-poppins">
      <h1 className="font-bold text-2xl">Water Park</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Visitors" value="200" Icon={Users} color="text-blue-500" />
        <StatCard title="Revenue" value="MVR 5000" Icon={DollarSign} color="text-green-500" />
        <StatCard title="Tickets Sold" value="150" Icon={Ticket} color="text-orange-500" />
      </div>

      {/* Feedback and Maintenance Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReviewCard reviews={reviews} />
        <InfoCard title="Maintenance Alerts" items={[
          { label: <Activity className="text-red-500" />, value: "Wave Pool at 3 PM" },
          { label: <Activity className="text-red-500" />, value: "Lazy River at 5 PM" },
        ]} />
      </div>

      {/* Sales and Demographics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="Recent Ticket Sales" items={[
          { label: 'Family Pass', value: 'MVR 120' },
          { label: 'Adult Ticket', value: 'MVR 80' },
        ]} />
        <InfoCard title="Visitor Demographics" items={[
          { label: 'Adults', value: '60%' },
          { label: 'Children', value: '40%' },
        ]} />
      </div>
    </div>
  );
};

export default WaterPark;
