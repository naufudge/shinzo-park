import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
   <div className="w-full">
    <div className="bg-[#3dbeff]">
      {/* Nav Bar */}
      <div className="flex text-white py-8 px-10 justify-between font-poppins">
        <h1 className="font-roboto text-3xl">Shinzo Park</h1>
        <div className="flex gap-10 place-items-center">
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Tickets</Link>
          <Link href={"/"}>About Us</Link>
          

          <div className="flex gap-4">
            <Button className="rounded-full bg-transparent" variant={"outline"}>Book Now</Button>
            <Button className="rounded-full" variant={"secondary"}>Login</Button>
          </div>

        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center font-poppins flex flex-col mt-15">
        <div className="flex flex-col translate-y-20 z-50 gap-3">
          <div className="text-white font-semibold text-lg">Book your room now!</div>

          <div className="place-items-center flex justify-center">
            <Image alt="arrow" className="" src={"/arrow.png"} width={15} height={0} />
          </div>
        </div>

        <div className="text-center mx-auto flex">
          <Image alt="hotel" className="contrast-[1.2] brightness-[1.05]" src={"/hotel.png"} width={600} height={0} />
        </div>
      
      </div>
    </div>
   </div>
  );
}