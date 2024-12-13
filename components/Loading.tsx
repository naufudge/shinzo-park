import Image from 'next/image'
import React from 'react'

interface CustomButtonProps extends React.ComponentProps<'div'> {

}

const Loading: React.FC<CustomButtonProps> = ({ ...divProps }) => {
  return (
    <div {...divProps} className="w-full h-full flex justify-center place-items-center text-center m-auto">
      <Image src={"loading.svg"} width={100} height={100} alt="Loading" priority />
    </div>
  )
}

export default Loading
