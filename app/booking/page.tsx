'use client'

export default function ResortBooking() {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-4xl w-full">
          <h1 className="text-3xl font-bold text-center mb-4">Room Booking</h1>
          <p className="text-center mb-8 text-gray-500">Experience something new every moment</p>
  
          <form className="space-y-6">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-600">Name</label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-1/2 p-2 border rounded-md focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-1/2 p-2 border rounded-md focus:outline-none"
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-600">E-mail *</label>
                <input
                  type="email"
                  placeholder="example@example.com"
                  className="w-full p-2 border rounded-md focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-600">Room Type *</label>
                <select className="w-full p-2 border rounded-md focus:outline-none">
                  <option>Please Select</option>
                  <option>Single Room</option>
                  <option>Double Room</option>
                  <option>Deluxe Room</option>
                </select>
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-600">Number of Guests *</label>
                <input
                  type="number"
                  placeholder="e.g., 2"
                  className="w-full p-2 border rounded-md focus:outline-none"
                />
              </div>
            </div>
  
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-600">Arrival Date & Time *</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md focus:outline-none"
                />
              </div>
              <div className="w-1/2 flex gap-4">
                <input
                  type="time"
                  className="w-full p-2 border rounded-md focus:outline-none"
                />
                <select className="w-1/4 p-2 border rounded-md focus:outline-none">
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/3">
                <label className="block mb-2 text-sm font-medium text-gray-600">Departure Date *</label>
                <select className="w-full p-2 border rounded-md focus:outline-none">
                  <option>Please select a month</option>
                  <option>January</option>
                  <option>February</option>
                </select>
              </div>
              <div className="w-1/3">
                <select className="w-full p-2 mt-6 border rounded-md focus:outline-none">
                  <option>Please select a day</option>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
              <div className="w-1/3">
                <select className="w-full p-2 mt-6 border rounded-md focus:outline-none">
                  <option>Please select a year</option>
                  <option>2024</option>
                  <option>2025</option>
                </select>
              </div>
            </div>
  
            <div className="flex items-center gap-6">
              <p className="block text-sm font-medium text-gray-600">Free Pickup? *</p>
              <div>
                <input type="radio" id="yes" name="pickup" className="mr-2" />
                <label htmlFor="yes">Yes Please! - Pick me up on arrival</label>
              </div>
              <div>
                <input type="radio" id="no" name="pickup" className="mr-2" />
                <label htmlFor="no">No Thanks - I'll make my own way there</label>
              </div>
            </div>
  
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Special Requests</label>
              <textarea
                rows={4}
                className="w-full p-2 border rounded-md focus:outline-none"
                placeholder="Any additional information..."
              ></textarea>
            </div>
  
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 text-white font-bold p-3 rounded-md hover:bg-green-600 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  