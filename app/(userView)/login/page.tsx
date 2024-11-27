'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function SignInSignUp() {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [user, setUser] = useState({
    username: "",
    password: ""
  })


  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post("/api/users/login", user)
      if (response.status === 401) {
        console.log("Password is invalid")
        // Do something here please

      } else if (response.status === 200) window.location.reload()

    } catch (error: any) {
      console.log(error.message)
    }
  }
 
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="bg-white w-[600px] rounded-xl shadow-lg flex overflow-hidden"> 
        
        {/* Sign In Section */}
        <div className="w-1/2 bg-sky-950 text-white p-10">
          <h2 className="text-3xl font-bold mb-6">Sign in</h2>

              <div className="mb-4">
              <label htmlFor="username" className="block mb-2">
                  Username
              </label>
              <input
                  type="text"
                  id="username"
                  onChange={(e) => setUser({...user, username: e.target.value})}
                  placeholder="Username"
                  className="w-full p-3 rounded-lg bg-gray-300 text-black" 
              />
              </div>

              <div className="mb-6">
              <label htmlFor="password" className="block mb-2">
                  Password
              </label>
              <input
                  type="password"
                  id="password"
                  onChange={(e) => setUser({...user, password: e.target.value})}
                  placeholder="Password"
                  className="w-full p-3 rounded-lg bg-gray-300 text-black"  
              />
              </div>
              <Button
              className="w-full bg-yellow-500 hover:bg-yellow-500/90 p-3 rounded-lg text-white font-bold"
              onClick={() => handleLoginSubmit()}
              >
              Sign In
              </Button>
              
        </div>

        {/* Sign Up Section */}
        <div className="w-1/2 bg-gray-300 flex flex-col justify-center items-center text-center p-10">
          <h2 className="text-xl mb-4">Welcome to login</h2>
          <p className="mb-6">Don't have an account?</p>

          <button
          onClick={() => router.push("/signup")}
          className="w-full bg-yellow-600 p-3 rounded-lg text-white font-bold">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
