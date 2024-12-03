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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { HotelRoomType } from "@/types/MyTypes";
import { useEffect, useState } from "react";
import axios from "axios";


const bookingSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
  roomType: z.string(),
  numGuests: z.number(),
  fromDate: z.date(),
  toDate: z.date()
})

export default function ResortBooking() {
  const [roomTypes, setRoomTypes] = useState<HotelRoomType[]>()
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<number>()
  const [selectedRoomType, setSelectedRoomType] = useState<HotelRoomType>()
  const [numOfGuests, setNumOfGuests] = useState<number>()


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

  const getMaxNumOfGuests = (bed_count: number | undefined) => {
    if (bed_count) return 3 * bed_count
  }

  const handleRoomTypeSelect = (selectedId: number) => {
    roomTypes?.filter((roomType) => {
      if (roomType.id === selectedId) setSelectedRoomType(roomType)
    })
  }


  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-x-clip">
      <div className='relative 2xl:h-[800px] lg:h-[450px] h-[450px] mx-10 my-14 flex justify-center bg-black rounded-2xl'>
        <div className="font-poppins absolute mx-auto 2xl:top-[40%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-center">
          <h1 className="drop-shadow-md text-[5rem] font-semibold font-dancing text-stone-50">
            Room Booking
          </h1>
          <p className="text-stone-100 italic">Experience something new every moment.</p>
        </div>
        <Image alt="ride" className="w-full h-full object-cover bg-black blur-sm opacity-80 rounded-2xl" src={"/hotel-view.jpg"} width={2000} height={0} />
      </div>

      <div className="grid grid-cols-3 mx-10 gap-5">
        {/* Room booking form */}

        <div className="bg-white p-10 col-span-2 rounded-lg shadow-md max-w-4xl w-full font-poppins mb-10">
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

                <FormField
                  control={form.control}
                  name="roomType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Type</FormLabel>
                      <div></div>
                      <Select
                      onValueChange={(e) => { 
                        field.onChange();
                        handleRoomTypeSelect(parseInt(e));
                      }}
                      defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {roomTypes?.map((roomType, index) => (
                            <SelectItem key={index} value={roomType.id.toString()}>{roomType.name} - {roomType.bed_count} Bed(s)</SelectItem>
                          ))}
                        </SelectContent>
                        <FormMessage />
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numGuests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Guests</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Number of Guests" {...field} 
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value); // Update the form state
                          setNumOfGuests(parseInt(value))
                          // You can add additional actions here if needed
                          console.log("New number of guests:", value);
                        }} />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Number of guests above 10 years of age.
                        <br />
                        Maximum number of guests: {getMaxNumOfGuests(selectedRoomType?.bed_count)}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fromDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Check-in</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl className="">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription className="text-xs">
                        When you will be arriving at the island.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="toDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Check-out</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl className="">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription className="text-xs">
                        When you will be leaving the island.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
              <Button type="submit">Book now!</Button>
            </form>
          </Form>
        </div>

        <div className="bg-white p-10 col-span-1 max-w-4xl h-fit rounded-lg shadow-md font-poppins mb-10">
          <div className="mb-5">
            <div className="text-sm">Room Price: {""}</div>

          </div>
          <h1 className="text-xl mb-2">Total Price</h1>
          <div className="font-semibold text-3xl">MVR 0.00</div>
          <br />
          <Button>Pay now!</Button>
        </div>



      </div>
    </div>
  );
}
