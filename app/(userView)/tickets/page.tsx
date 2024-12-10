'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { Activity } from '@/types/MyTypes';
import axios from 'axios';
import { Separator } from '@/components/ui/separator';
import Loading from '@/components/Loading';


type Ticket = {
  qty: number; price: number;
}
type ActivityTickets = {
  2: Ticket;
  3: Ticket;
  4: Ticket;
  5: Ticket;
}

const TicketsPage = () => {
  const [arcadeCount, setArcadeCount] = useState(0)
  const [cinemaCount, setCinemaCount] = useState(0)
  const [waterParkCount, setWaterParkCount] = useState(0)
  const [amusementParkCount, setAmusementParkCount] = useState(0)

  const [arcadeSubTotal, setArcadeSubTotal] = useState(0)
  const [cinemaSubTotal, setCinemaSubTotal] = useState(0)
  const [waterParkSubTotal, setWaterParkSubTotal] = useState(0)
  const [amusementParkSubTotal, setAmusementParkSubTotal] = useState(0)

  const [activities, setActivities] = useState<Activity[]>()

  const [userTickets, setUserTickets] = useState<ActivityTickets>({
    2: { qty: 0, price: 0 },
    3: { qty: 0, price: 0 },
    4: { qty: 0, price: 0 },
    5: { qty: 0, price: 0 },
  })

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    async function getActivities() {
      try {
        const response = await axios.get("/api/activities/view")
        if (response.data.success) {
          setActivities(response.data.activities)
        }
        console.log(response.data.activities)
      } catch (error: any) {
        console.log(error.message)
      }
    }

    if (!activities) getActivities()
  }, [activities])


  const updateTotalPrice = () => {
    let total = arcadeSubTotal + cinemaSubTotal + waterParkSubTotal + amusementParkSubTotal
    setTotalPrice(total)
    return total
  }

  const getActivityPrice = (id: number, qty: number) => {
    let price = 0;

    activities!!.filter((activity) => {
      if (activity.id === id) {
        price = activity.price
      }
    })
    const subTotal = price * qty
    // if (!Minus) { setTotalPrice(totalPrice + (subTotal)) } else { setTotalPrice(totalPrice - (subTotal)) }

    switch (id) {
      case 2:
        setCinemaSubTotal(subTotal)
        setTotalPrice(subTotal + waterParkSubTotal + amusementParkSubTotal + arcadeSubTotal)
        break
      case 3:
        setWaterParkSubTotal(subTotal)
        setTotalPrice(subTotal + cinemaSubTotal + amusementParkSubTotal + arcadeSubTotal)
        break
      case 4:
        setAmusementParkSubTotal(subTotal)
        setTotalPrice(subTotal + waterParkSubTotal + cinemaSubTotal + arcadeSubTotal)
        break
      case 5:
        setArcadeSubTotal(subTotal)
        setTotalPrice(subTotal + waterParkSubTotal + cinemaSubTotal + amusementParkSubTotal)
        break
      default:
        break
    }

    return subTotal;
  }

  const handleAddMinus = (
    id: number,
    count: number,
    setCount: Dispatch<SetStateAction<number>>,
    minus: boolean
  ) => {
    let num = count;
    if (count === 0 && minus === true) {
      // updateTotalPrice()
      return 0;
    } else if (minus === false) {
      num++;
      setCount(num);
    } else if (minus === true) {
      num--;
      setCount(num);
    }

    // Handle the tickets
    getActivityPrice(id, num)
  }

  return (
    <div className="h-full bg-gray-50 flex flex-col overflow-x-clip font-poppins">
      {/* Hero Section */}
      <div className="2xl:h-[800px] lg:h-[400px] h-[400px] mx-10 my-16 flex justify-center bg-black rounded-2xl">
        <div className="absolute mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-center">
          <h1 className="drop-shadow-md text-[5rem] font-semibold font-dancing text-stone-50">
            Activity Tickets
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
          priority
        />
      </div>

      {activities ?
        <>
          {/* Activities Section */}
          <div className="mx-[100px]">
            <h1 className="font-bold text-3xl text-center mb-12">Activities</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { id: 5, name: 'Arcade', img: '/arcade.jpg', count: arcadeCount, update: setArcadeCount },
                { id: 2, name: 'Cinema', img: '/cinema.jpg', count: cinemaCount, update: setCinemaCount },
                { id: 3, name: 'Water Park', img: '/water-park.jpg', count: waterParkCount, update: setWaterParkCount },
                { id: 4, name: 'Amusement Park', img: '/ride-cropped.jpg', count: amusementParkCount, update: setAmusementParkCount },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md flex flex-col items-center text-center"
                >
                  <div className='h-1/2 overflow-clip w-full'>
                    <Image
                      alt={activity.name}
                      src={activity.img}
                      width={1000}
                      height={0}
                      className="rounded-t-lg h-full"
                      priority
                    />
                  </div>

                  <h2 className="font-semibold text-lg mt-4">{activity.name}</h2>
                  <br />
                  <div className="grid grid-cols-4 items-center justify-center mt-2 border border-gray-300 rounded-md">

                    <div
                      className="select-none border-r text-gray-500 font-bold w-full h-full py-2 px-4 hover:bg-gray-100 hover:cursor-pointer hover:rounded-l-md"
                      onClick={() => {
                        handleAddMinus(activity.id, activity.count, activity.update, true)
                      }}
                    >
                      -
                    </div>

                    <span className="font-semibold text-lg col-span-2">
                      {activity.count}
                    </span>

                    <div
                      className="select-none border-l text-gray-500 font-bold w-full h-full py-2 px-4 hover:bg-gray-100 hover:cursor-pointer hover:rounded-r-md"
                      onClick={() => {
                        handleAddMinus(activity.id, activity.count, activity.update, false)
                      }}
                    >
                      +
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Section */}
          <div className="mx-[100px] mt-12 grid lg:grid-cols-3 gap-12">
            <div className='grid grid-cols-5 col-span-full place-items-center my-2'>
              <Separator className='col-span-2' />
              <h2 className="font-bold text-3xl text-center">Checkout</h2>
              <Separator className='col-span-2' />
            </div>

            <div className="lg:col-span-2">
              <form className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="font-bold mb-6 text-stone-500">PAYMENT DETAILS</h2>

                <div className="mb-4">
                  <label
                    htmlFor="cardholder-name"
                    className="block text-sm font-semibold mb-2"
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
                  <label htmlFor="card-number" className="block text-sm font-semibold mb-2">
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
                      className="block text-sm font-semibold mb-2"
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
                      className="block text-sm font-semibold mb-2"
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
              <div className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-2 h-full justify-evenly">
                <h2 className="font-bold mb-4 text-stone-500">YOUR ORDER</h2>

                { !amusementParkCount && !arcadeCount && !cinemaCount && !waterParkCount && 
                  <div className='italic text-gray-500 text-center'>Please choose an acitivity.</div>
                }

                {[
                  { id: 4, name: 'Amusement Park', qty: amusementParkCount, price: amusementParkSubTotal },
                  { id: 5, name: 'Arcade', qty: arcadeCount, price: arcadeSubTotal },
                  { id: 2, name: 'Cinema', qty: cinemaCount, price: cinemaSubTotal },
                  { id: 3, name: 'Water Park', qty: waterParkCount, price: waterParkSubTotal },
                ].map((item, index) => (
                  <div key={index}>
                    {item.qty > 0 && activities &&
                      <div className="flex justify-between place-items-start mb-5">
                        <div>
                          <div className="">{item.name}</div>
                          <div className="text-gray-500 text-sm">x{item.qty}</div>
                        </div>
                        {/* <div className="font-semibold">MVR {getActivityPrice(item.id, item.qty)}</div> */}
                        <div className="font-semibold">MVR {item.price}</div>
                      </div>
                    }
                  </div>
                ))}
                {/* <hr className="my-4" /> */}
                <div className="flex flex-col gap-2 text-lg">
                  <span className='opacity-50 text-sm'>Total Price</span>
                  <span className='text-3xl font-semibold'>MVR {totalPrice}</span>
                </div>
                <button className="w-full bg-black text-white font-semibold py-2 mt-6 rounded-lg hover:bg-gray-800">
                  Pay Now!
                </button>
              </div>
            </div>
          </div>
        </>
        :
        <Loading />
      }

    </div>
  );
};

export default TicketsPage;
