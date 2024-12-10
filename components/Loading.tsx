import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className="w-full flex justify-center place-items-center text-center mx-auto">
      <Image src={"loading.svg"} width={100} height={100} alt="Loading" />
    </div>
  )
}

export default Loading
