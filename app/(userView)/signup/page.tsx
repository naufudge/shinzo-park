'use client'

import { useRouter } from 'next/navigation';
// pages/index.tsx

import { useState } from 'react';

export default function RegisterForm() {
  const router = useRouter()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    checkPasswordMatch(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    checkPasswordMatch(password, e.target.value);
  };

  const checkPasswordMatch = (password: string, confirmPassword: string) => {
    setIsPasswordMatched(password === confirmPassword);
    // alert("password not same")
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#B2EBF2]">
      <div className="bg-white w-[800px] rounded-xl shadow-lg flex overflow-hidden">
        {/* Information Section */}
        <div className="w-1/2 bg-sky-950 text-white p-10">
          <h2 className="text-3xl font-bold mb-6">Idk somekind of img</h2>
          <p className="mb-6">
            Something
          </p>
          <p className="mb-8">
            SOmeothin
          </p>
          <button
          onClick={() => router.push("/login")}
          className="bg-amber-500 text-white px-4 py-2 rounded-lg font-bold">
            Have An Account
          </button>
        </div>

        {/* Register Form Section */}
        <div className="w-1/2 bg-gray-100 p-10">
          <h2 className="text-2xl font-bold mb-6 text-amber-500">Register here</h2>
          <form className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 p-3 border rounded-lg focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 p-3 border rounded-lg focus:outline-none"
              />
            </div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:outline-none"
            />
            <div className="flex gap-4">
              <div className="relative w-full">
                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full p-3 border rounded-lg focus:outline-none ${!isPasswordMatched ? 'border-red-500' : ''}`}
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="relative w-full">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full p-3 border rounded-lg focus:outline-none ${!isPasswordMatched ? 'border-red-500' : ''}`}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {!isPasswordMatched 
                // && 
                // (
                //   <span className="absolute text-xs text-red-500 top-3 right-2">
                //     Wrong Password
                //   </span>
                // )
                }
              </div>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-sm">
                I agree to the <a href="#" className="text-amber-500">Terms and Conditions of being a baka</a>
              </label>
            </div>
            <button
              type="submit"
              className="bg-amber-500 w-full p-3 rounded-lg text-white font-bold"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
