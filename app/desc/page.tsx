'use client'

import { useState } from "react";

export default function ThemeParkBooking() {

  const [ticketCount, setTicketCount] = useState(0);
  const ticketPrice = 20; 
  const [totalPrice, setTotalPrice] = useState(0);

  const incrementTickets = () => {
    const newTicketCount = ticketCount + 1;
    setTicketCount(newTicketCount);
    setTotalPrice(newTicketCount * ticketPrice);
  };

  const decrementTickets = () => {
    if (ticketCount > 0) {
      const newTicketCount = ticketCount - 1;
      setTicketCount(newTicketCount);
      setTotalPrice(newTicketCount * ticketPrice);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Grey box for the main image */}
        <div className="w-full h-64 bg-gray-300 rounded-lg mb-6 flex items-center justify-center">
          <span className="text-gray-500 font-bold">Image Placeholder</span>
        </div>

        <h1 className="text-2xl font-bold mb-4">Water Park</h1>
        <p className="text-gray-600 mb-4">
          This is a tropical resort island attraction offering thrilling water
          slides, relaxing lazy rivers, and a dedicated kids' zone. With
          stunning ocean views and lush surroundings, it caters to both families
          and adults, featuring private cabanas, poolside service, and an
          island-inspired snack bar. It's the perfect spot for excitement and
          relaxation on your island getaway.
        </p>

        <p className="text-lg font-bold mb-4">
          Ticket Price: 20 MVR per Person (Free for children under 10)
        </p>

        {/* Grey boxes for additional images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="h-40 bg-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 font-bold">Image 1</span>
          </div>
          <div className="h-40 bg-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 font-bold">Image 2</span>
          </div>
          <div className="h-40 bg-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 font-bold">Image 3</span>
          </div>
        </div>


        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Booking</h2>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Hotel Booking Reference Number
              </label>
              <input
                type="text"
                placeholder="Reference Number"
                className="w-full p-2 border rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Number of Tickets
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  className="w-8 h-8 bg-gray-300 rounded-md text-gray-700"
                  onClick={decrementTickets}
                >
                  -
                </button>
                <input
                  type="text"
                  value={ticketCount}
                  readOnly
                  className="w-12 text-center p-2 border border-gray-300 mx-2 rounded-md"
                />
                <button
                  type="button"
                  className="w-8 h-8 bg-gray-300 rounded-md text-gray-700"
                  onClick={incrementTickets}
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Total Price
              </label>
              <input
                type="text"
                value={`${totalPrice} MVR`}
                readOnly
                className="w-full p-2 border rounded-md focus:outline-none"
              />
            </div>
          </form>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Book Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
