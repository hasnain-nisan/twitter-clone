import Image from 'next/image';
import React from 'react'
import {signIn} from 'next-auth/react'
import {AiFillGoogleCircle} from 'react-icons/ai'

const Login = ({providers}) => {
    return (
      <div className="flex flex-col items-center space-y-10 justify-center h-screen">
        <Image
          src="https://rb.gy/ogau5a"
          width={150}
          height={150}
          alt="logo"
          objectFit="contain"
        />

        <div>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id, {callbackUrl: "/"})}
                className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group"
              >
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                <span className="flex items-center relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                  <AiFillGoogleCircle className="mr-2 text-2xl"/>
                  Sign in
                </span>
                <span className="absolute inset-0 border-2 border-white rounded-full"></span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Login
