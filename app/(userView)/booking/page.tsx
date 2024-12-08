'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button"
import { HotelRoomType } from "@/types/MyTypes";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingForm from "@/components/BookingForm";
import { Bed, CircleDollarSign, Hotel } from "lucide-react";


export default function ResortBooking() {
  const [roomTypes, setRoomTypes] = useState<HotelRoomType[]>()
  const [roomPrice, setRoomPrice] = useState<number>(0)
  const [numOfRooms, setNumOfRooms] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [selectedRoomType, setSelectedRoomType] = useState<HotelRoomType>()


  useEffect(() => {
    async function getRoomTypes() {
      try {
        const response = await axios.get("/api/hotels/viewRoomTypes")
        if (response.data.success) setRoomTypes(response.data.roomTypes)
      } catch (error: any) {
        console.log(error.message)
      }
    }
    if (!roomTypes) getRoomTypes();
  }, [roomTypes])


  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-x-clip">
      <div className='relative 2xl:h-[800px] lg:h-[450px] h-[450px] mx-10 my-14 flex justify-center bg-black rounded-2xl'>
        <div className="font-poppins absolute mx-auto 2xl:top-[40%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-center">
          <h1 className="drop-shadow-md text-[5rem] font-semibold font-dancing text-stone-50">
            Room Booking
          </h1>
          <p className="text-stone-100 italic">Experience something new every moment.</p>
        </div>
        <Image alt="ride" className="w-full h-full object-cover bg-black blur-sm opacity-80 rounded-2xl" src={"/hotel-view.jpg"} width={2000} height={0} priority />
      </div>

      <div className="grid grid-cols-3 mx-10 gap-5">

        {/* Room booking form */}
        <BookingForm 
        roomPrice={roomPrice}
        setRoomPrice={setRoomPrice} 
        numOfRooms={numOfRooms}
        setNumOfRooms={setNumOfRooms} 
        selectedRoomType={selectedRoomType} 
        setSelectedRoomType={setSelectedRoomType}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        />

        {/* Price and payment section */}
        <div className="bg-white p-10 col-span-1 max-w-4xl h-fit rounded-lg shadow-md font-poppins mb-10">
          <div className="mb-5 flex flex-col gap-2">
            <div className="text-sm flex gap-2 place-items-end"><Hotel /> Selected Room Type: {selectedRoomType ? selectedRoomType.name : ""}</div>
            <div className="text-sm flex gap-2 place-items-end"><CircleDollarSign /> Room Price: MVR {roomPrice ? roomPrice : "0"}</div>
            <div className="text-sm flex gap-2 place-items-end"><Bed /> Number of Rooms: {numOfRooms ? numOfRooms : "0"}</div>
          </div>
          <h1 className="text-xl mb-2">Total Price</h1>
          <div className="font-semibold text-3xl">MVR {totalPrice ? totalPrice : "0"}</div>
          <br />
          <Button>Pay now!</Button>
        </div>
      </div>
    </div>
  );
}
