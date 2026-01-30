import Link from 'next/link'
import React from 'react'

const LoginFooter = () => {
  return (
    <>
     <div>
            <p className="text-sm">
              Dont have an account?{" "}
              <Link href={"/register"} className="underline hover:scale-105">
                Register
              </Link>
            </p>
          </div>
    </>
  )
}

export default LoginFooter