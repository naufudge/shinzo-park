import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import PackagesSection from "@/components/PackagesSection";
import Activities from "@/components/Activities";

export default function Home() {
  return (
   <div className="w-full">
    <div className="">
      

      {/* Hero Section */}
      <div className="font-poppins flex flex-col">
        <div className="w-full h-[700px] overflow-clip relative">

          {/* Nav Bar */}
          <div className="navbar sticky flex text-white py-6 px-10 justify-between font-poppins z-50 w-full">
            <h1 className="font-roboto text-3xl">Shinzo Park</h1>
            <div className="flex gap-10 place-items-center">
              <Link href={"/"}>Home</Link>
              <Link href={"/"}>Tickets</Link>
              <Link href={"/"}>About Us</Link>
              

              <div className="flex gap-6">
                <Button className="rounded-full bg-transparent" variant={"outline"}>Book Now</Button>
                <Button className="rounded-full" variant={"secondary"}>Login</Button>
              </div>
            </div>
          </div>

          <div className="absolute z-50 top-[40%] ml-12">
            <div className="flex flex-col gap-4 font-poppins text-white">
              <div className="font-semibold text-[3rem] drop-shadow-md">Welcome to Shinzo Park! </div>
              <div className="w-[45%] text-justify">
                Enjoy luxurious accommodations and exclusive access to our thrilling amusement park and endless activities. Book your stay today for the ultimate tropical getaway!
              </div>
              <div className="w-fit">
                <Button variant={"outline"} className="flex bg-transparent px-8 py-6 gap-2 rounded-full">
                  Book now 
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-black absolute top-0 z-0">
            <Image alt="main-image" src={"/ride-cropped.jpg"} width={2000} height={0} className="w-full opacity-50" />
          </div>
        </div>
      
        <div className="mt-[50px]">
          <Activities />
          {/* <PackagesSection /> */}
        </div>
      
      </div>
    </div>
   </div>
  );
}