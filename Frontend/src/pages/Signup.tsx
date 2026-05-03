import Input from '../../components/Input'
import Button from '../../components/Button'
import { useRef } from 'react';
import axios from 'axios';
import { backend_Url } from '../config';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const usernameRef=useRef<HTMLInputElement>(null);
  const passwordRef=useRef<HTMLInputElement>(null);
  const navigate=useNavigate();

  const signup = async () => {
    // Handle signup logic here
    const username=usernameRef.current?.value;
    const password=passwordRef.current?.value;
    if(!username || !password){
        toast.error("Please enter both username and password");
        return;
      }
    await axios.post(`${backend_Url}/api/v1/signup`,{
      
        username,
        password
      
    }).then((res)=>{
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
      toast.error("user already exists");
    })

    const response=await axios.post(`${backend_Url}/api/v1/signin`,{
      username,
      password
    })

    const jwt=response.data.token;
    localStorage.setItem('token',jwt);
    navigate('/dashboard');
  }


  return (
  <div className="relative min-h-screen w-screen overflow-hidden">

    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src="/a.mp4" type="video/mp4" />
    </video>


    {/* 📦 Content */}
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-7xl font-instrument text-4xl p-4 pl-6 font-weight-bold text-white">Brainly</h1>
      <Toaster />
      <div className="bg-white/90 backdrop-blur-md border border-white 
                      w-full max-w-md rounded-2xl shadow-xl p-8 text-black">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-gray-500 mt-2">
            Sign up to get started
          </p>
        </div>

       
        <div className="flex flex-col gap-5">
          <Input ref={usernameRef} placeholder="Username" />
          <Input ref={passwordRef} placeholder="Password" />

          <div className="pt-3 flex justify-center">
            <Button
              text="Sign Up"
              variant="secondary"
              onClick={signup}
            />
          </div>
        </div>

       
        <p className="text-center text-sm text-black mt-6">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate('/signin')}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  </div>
);





  // return (
  //   <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center px-4">
      
  //     <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

  //       {/* Heading */}
  //       <div className="text-center mb-8">
  //         <h1 className="text-3xl font-bold">Create Account</h1>
  //         <p className="text-gray-500 mt-2">
  //           Sign up to get started
  //         </p>
  //       </div>

  //       {/* Form */}
  //       <div className="flex flex-col gap-5">
  //         <Input ref={usernameRef} placeholder="Username" />
  //         <Input ref={passwordRef} placeholder="Password" />

  //         <div className="pt-3 flex justify-center">
  //           <Button 
  //             text="Sign Up" 
  //             variant="secondary"
            
  //             onClick={signup}
  //           />
  //         </div>
  //       </div>

  //       {/* Login Redirect */}
  //       <p className="text-center text-sm text-gray-500 mt-6">
  //         Already have an account?{" "}
  //         <span className="text-blue-600 font-medium cursor-pointer hover:underline" onClick={() => {
  //           navigate('/signin');
  //         }}>
  //           Login
  //         </span>
  //       </p>

  //     </div>
  //   </div>
  // )
}

export default Signup