import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import PackagesSection from "@/components/PackagesSection";
import Activities from "@/components/Activities";
import NavBar from "@/components/NavBar";
import ReviewsSection from "@/components/ReviewsSection";

export default function Home() {
  return (
   <div className="w-full">
    <div className="bg-black absolute top-0 z-0 w-full max-h-[100%] overflow-clip ">
        <Image alt="main-image" src={"/ride-cropped.jpg"} width={2000} height={0} className="opacity-50" />
    </div>
    <div>
      

      {/* Hero Section */}
      <div className="font-poppins flex flex-col">
        <div className="w-full h-full sm:h-[500px] md:h-[700px] 2xl:h-screen overflow-clip relative">

          <div className="absolute z-50 top-[25%] mx-[100px]">
            <div className="flex flex-col gap-3 font-poppins text-white">
              <div className="font-semibold text-[3rem] drop-shadow-md">Welcome to DhonVeli! </div>
              <div className="flex flex-col gap-8">
                <div className="w-[45%] text-justify">
                  Enjoy luxurious accommodations and exclusive access to our thrilling amusement park and endless activities. Book your stay today for the ultimate tropical getaway!
                </div>

                {/* Book now button */}
                <div className="w-fit">
                  <Link href={"/booking"}>
                    <Button variant={"outline"} className="flex bg-transparent group px-8 py-6 gap-2 transition-all duration-500 ease-in-out rounded-full">
                      Book now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      
        <div className="mt-[50px]">
          <Activities />
          <PackagesSection />
          <ReviewsSection />
        </div>
      
      </div>
    </div>
   </div>
  );
}