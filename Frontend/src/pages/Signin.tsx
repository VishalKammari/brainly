import Input from '../../components/Input'
import Button from '../../components/Button'
import { backend_Url } from '../config';
import axios from 'axios';
import{useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

const Signin = () => {

  const usernameRef=useRef<HTMLInputElement>(null);
  const passwordRef=useRef<HTMLInputElement>(null);

  const navigate=useNavigate();

  const signin = async () => {
   
    const username=usernameRef.current?.value;
    const password=passwordRef.current?.value;
    
      if(!username || !password){
        toast.error("Please enter both username and password");
        return;
      }
    try{
      const response=await axios.post(`${backend_Url}/api/v1/signin`,{
        username,
        password
    })
      const jwt=response.data.token;
      localStorage.setItem('token',jwt);
      navigate('/dashboard');
    }
    catch(error){
      toast.error("Invalid username or password");
    }
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
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-7xl font-instrument text-4xl p-4 pl-6 font-weight-bold text-white">Brainly</h1>
      <Toaster />
      <div className="bg-white/90 backdrop-blur-md w-full max-w-md rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-gray-500 mt-2">
            Sign in to your account
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <Input placeholder="Username" ref={usernameRef} />
          <Input placeholder="Password" ref={passwordRef} />

          <div className="pt-3 flex justify-center">
            <Button 
              text="Sign In" 
              variant="secondary"
              onClick={signin}
            />
          </div>
        </div>


        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span
            className="text-blue-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  </div>
);
}

export default Signin