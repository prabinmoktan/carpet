import Button from '@/app/(public)/ui/Button/Button'
import React from 'react'
import google from "../../../../../../../public/google.png";
import company from "../../../../../../../public/logo.png";
import Image from 'next/image';


const LoginHeader = () => {
  return (
    <>
     <div className="flex justify-center flex-col">
              <div className="w-full flex justify-center">
                <Image
                  src={company}
                  height={50}
                  width={50}
                  alt="company-logo"
                />
              </div>
              <div className="font-cinzel font-light   text-logo  uppercase leading-none! text-center">
                <span className="tracking-tight text-4xl">S</span>
                <span className="text-3xl">anaa yadawiya</span>
              </div>
            </div>
            <h1 className="text-xs capitalize">
              welcome. please login to cointinue
            </h1>
            <div className="flex flex-col justify-center gap-4">
              <Button
                firstIcon={
                  <Image
                    src={google}
                    alt="google-logo"
                    height={20}
                    width={20}
                    className="bg-cover"
                  />
                }
                title="login with google"
                variant={"glass"}
                className="bg-white/60 w-full flex gap-4 justify-center"
              />
               <div className="flex items-center">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-4 text-sm font-medium  tracking-wide">
                  or
                </span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              </div>

    </>
  )
  
}

export default LoginHeader