'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"


const bookingSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
  roomType: z.string(),
  numGuests: z.number(),
  fromDate: z.date(),
  toDate: z.date()
})

export default function ResortBooking() {
    const form = useForm<z.infer<typeof bookingSchema>>({
      resolver: zodResolver(bookingSchema),
      defaultValues: {
        fullName: "",
        email: "",
        roomType: "",
        numGuests: 0,
        fromDate: new Date(),
        toDate: new Date()
      },
    })

    // Handle the form submission
    function onSubmit(values: z.infer<typeof bookingSchema>) {
      console.log(values)
    }

    return (
      <div className="h-screen bg-gray-100 flex flex-col overflow-x-clip">
        <div className='2xl:h-[800px] lg:h-[450px] h-[450px] mx-10 my-14 flex justify-center bg-black rounded-2xl'>
          <div className="font-poppins absolute mx-auto 2xl:top-[40%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-center">
            <h1 className="drop-shadow-md text-[5rem] font-semibold font-dancing text-stone-50">
              Room Booking
            </h1>
            <p className="text-stone-100 italic">Experience something new every moment.</p>
          </div>
          <Image alt="ride" className="w-full h-full object-cover bg-black blur-sm opacity-80 rounded-2xl" src={"/hotel-view.jpg"} width={2000} height={0} />
        </div>

        <div className="flex items-center justify-center w-full">
          {/* Room booking form */}
          {/* <div className="bg-white p-10 rounded-lg shadow-lg max-w-4xl w-full">
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
          </div> */}

          <div className="bg-white p-10 rounded-lg shadow-md max-w-4xl w-full mb-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              </form>
            </Form>
          </div>
        
        
        
        </div>
      </div>
    );
  }
  