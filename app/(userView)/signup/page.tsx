'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function RegisterForm() {
  const router = useRouter()

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatched, setIsPasswordMatched] = useState<boolean>();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
    loyalty_points: 0,
    role: "normal",
  })

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    checkPasswordMatch(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currentPassword = e.target.value
    setConfirmPassword(currentPassword);
    checkPasswordMatch(password, currentPassword);
  };

  const checkPasswordMatch = (password: string, confirmPassword: string) => {
    if (password === "" || confirmPassword === "") {
      setIsPasswordMatched(false);
      return false;
    }

    const matchResult = password === confirmPassword;
    setIsPasswordMatched(matchResult);

    if (matchResult === true) {
      const saltRounds = 10;
  
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw err;
        console.log('Hashed password:', hash);
        setUserData({...userData, password: hash});
        // const result = bcrypt.compare(password, hash)
        // console.log(result)
      })
    }

    return matchResult;
  };

  const handleRegisterButton = async () => {
    const matched = checkPasswordMatch(password, confirmPassword)
    if (matched === false) return;

    console.log(userData)
    if (userData.username.length > 3 && userData.email.includes("@")) {
      const response = await axios.post("https://dhonveli-api.up.railway.app/users/", userData)
      const result = await bcrypt.compare(password, userData.password)
      console.log(result)
      // Do something based on the response
    }
  }

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
                placeholder="Username"
                className="w-full p-3 border rounded-lg focus:outline-none"
                onChange={(e) => setUserData({...userData, username: e.target.value})}
              />
              {/* <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 p-3 border rounded-lg focus:outline-none"
              /> */}
            </div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:outline-none"
              onChange={(e) => setUserData({...userData, email: e.target.value})}
            />
            <div className="flex gap-4">
              <div className="relative w-full">
                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full p-3 border rounded-lg focus:outline-none ${isPasswordMatched === false ? 'border-red-500' : ''}`}
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="relative w-full">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full p-3 border rounded-lg focus:outline-none ${isPasswordMatched === false ? 'border-red-500' : ''}`}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {isPasswordMatched === false
                && 
                (
                  <span className="absolute text-xs text-red-500 bottom-0 left-0">
                    Wrong Password
                  </span>
                )
                }
              </div>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-sm">
                I agree to the <a href="#" className="text-amber-500">Terms and Conditions of being a baka</a>
              </label>
            </div>
            
            <Button
              type='button'
              className="bg-amber-500 w-full p-3 rounded-lg text-white font-bold hover:bg-amber-500/90"
              onClick={() => handleRegisterButton()}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
