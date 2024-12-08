import React from 'react';
import Image from 'next/image';

const TicketsPage = () => {
  return (
    <div className="h-full bg-gray-100 flex flex-col overflow-x-clip">
      {/* Hero Section */}
      <div className="2xl:h-[800px] lg:h-[450px] h-[450px] mx-10 my-14 flex justify-center bg-black rounded-2xl">
        <div className="font-poppins absolute mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-center">
          <h1 className="drop-shadow-md text-[5rem] font-semibold font-dancing text-stone-50">
            Tickets
          </h1>
          <p className="text-stone-100 italic">
            Where the fun begins!
          </p>
        </div>
        <Image
          alt="ride"
          className="w-full h-full object-cover bg-black blur-sm opacity-90 rounded-2xl"
          src="/perry.jpg"
          width={2000}
          height={0}
        />
      </div>

      {/* Activities Section */}
      <div className="mx-10">
        <h1 className="font-poppins font-bold text-2xl text-center mb-8">Activities</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Arcade', img: '/arcade.jpg' },
            { name: 'Cinema', img: '/cinema.jpg' },
            { name: 'Water Park', img: '/water-park.jpg' },
            { name: 'Joy Rides', img: '/joy-rides.jpg' },
          ].map((activity, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg flex flex-col items-center p-4 text-center"
            >
              <Image
                alt={activity.name}
                src={activity.img}
                width={200}
                height={120}
                className="rounded-lg object-cover"
              />
              <h2 className="font-poppins font-semibold text-lg mt-4">{activity.name}</h2>
              <div className="flex items-center justify-center gap-4 mt-2">
                <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 font-bold">
                  -
                </button>
                <span className="font-semibold text-lg">0</span>
                <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 font-bold">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Section */}
      <div className="mx-10 mt-12 grid lg:grid-cols-3 gap-12">
        {/* Payment Details */}
        <div className="lg:col-span-2">
          <h2 className="font-poppins font-bold text-2xl mb-4">Checkout</h2>
          <form className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label
                htmlFor="cardholder-name"
                className="block font-poppins text-sm font-semibold mb-2"
              >
                Cardholder's Name
              </label>
              <input
                id="cardholder-name"
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
                placeholder="Cardholder's Name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="card-number" className="block font-poppins text-sm font-semibold mb-2">
                Card Number
              </label>
              <input
                id="card-number"
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
                placeholder="Card Number"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expiration-date"
                  className="block font-poppins text-sm font-semibold mb-2"
                >
                  Expiration Date
                </label>
                <input
                  id="expiration-date"
                  type="text"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label
                  htmlFor="cvv"
                  className="block font-poppins text-sm font-semibold mb-2"
                >
                  Security Code (CVV)
                </label>
                <input
                  id="cvv"
                  type="text"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
                  placeholder="CVV"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="font-poppins font-bold text-2xl mb-4">Your Order</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {[
              { name: 'Joy Ride', qty: 2, price: 40 },
              { name: 'Water Park', qty: 1, price: 25 },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-poppins font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-sm">x{item.qty}</p>
                </div>
                <p className="font-poppins font-semibold">MVR {item.price}.00</p>
              </div>
            ))}
            <hr className="my-4" />
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total Price</span>
              <span>MVR 65.00</span>
            </div>
            <button className="w-full bg-black text-white font-poppins font-semibold py-2 mt-6 rounded-lg hover:bg-gray-800">
              Pay Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
