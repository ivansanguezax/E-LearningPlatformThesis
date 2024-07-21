import React from 'react'
import Image from 'next/image'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="h-[100px] flex flex-col items-center justify-center">
      <div className="border border-[#0000000e] w-full" />
      <div className="flex-grow flex items-center justify-center">
        <Image
          src="https://res.cloudinary.com/dfgjenml4/image/upload/v1721537537/jya9oa7cb4pouswqmpzy.png"
          alt="Logo"
          width={200}
          height={100}
          className="object-contain"
        />
      </div>
    </footer>
  )
}

export default Footer