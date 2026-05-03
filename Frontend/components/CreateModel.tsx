import { useRef, useState } from "react";
import CrossIcon from "./CrossIcon";
import Input from "./Input";
import axios from "axios";
import { backend_Url } from "../src/config";

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
  Instagram: "instagram",
  Facebook: "facebook",
  Pintrest: "pintrest",
  Linkedin: "linkedin",
  Other: "other"
} as const;

type ContentType = (typeof ContentType)[keyof typeof ContentType];

export default function CreateModel({
  open,
  onClose,
  refresh,
}: {
  open: boolean;
  onClose: () => void;
  refresh: () => Promise<void>;
}) {
  const titleref = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);
  const [type, settype] = useState<ContentType>(ContentType.Youtube);

  const addcontent = async () => {
    const title = titleref.current?.value;
    const link = linkref.current?.value;

    if (!title || !link) {
      alert("All fields required");
      return;
    }

    try {
      await axios.post(
        `${backend_Url}/api/v1/content`,
        { title, link, type },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      await refresh(); // ✅ update UI
      onClose();

      // clear inputs
      if (titleref.current) titleref.current.value = "";
      if (linkref.current) linkref.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Add Content
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition"
          >
            <CrossIcon />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <Input placeholder="Enter title..." ref={titleref} />
          <Input placeholder="Paste link..." ref={linkref} />
        </div>
        <div className="mt-5">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Content Type
          </label>

          <select
            value={type}
            onChange={(e) => settype(e.target.value as ContentType)}
            className="w-full px-4 py-2 rounded-xl border bg-white shadow-sm
               focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="youtube">YouTube</option>
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="pinterest">Pinterest</option>
            <option value="linkedin">LinkedIn</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Submit */}
        <div className="mt-6">
          <button
            onClick={addcontent}
            className="w-full rounded-xl bg-slate-900 text-white py-2.5 font-medium 
                       shadow-md hover:bg-slate-800 transition active:scale-[0.98]"
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}








// import React, { useRef,useState } from 'react'
// import CrossIcon from './CrossIcon'
// import Button from './Button'
// import Input from './Input'
// import axios from 'axios';
// import { backend_Url } from '../src/config';
// const ContentType = {
//   Youtube: 'youtube',
//   Twitter: 'twitter',
// } as const

// type ContentType = (typeof ContentType)[keyof typeof ContentType]

// export default function CreateModel({ open, onClose }: { open: boolean; onClose: () => void }) {
//   const titleref=useRef<HTMLInputElement>(null);
//   const linkref=useRef<HTMLInputElement>(null);
//   const[type,settype]=useState(ContentType.Youtube);

//   const addcontent = async() => {
//     const title=titleref.current?.value;
//     const link=linkref.current?.value;
    
//     await axios.post(`${backend_Url}/api/v1/content`,{
//         title,
//         link,
//         type
//   },{
//     headers:{
//       "Authorization": localStorage.getItem('token')},
//     }
//   )
//   onClose();  
// }
//   return (
//   <div>
//   {open && (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      
//       <div className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl p-6">
        
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-slate-800">
//             Add Content
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-full hover:bg-slate-100 transition"
//           >
//             <CrossIcon />
//           </button>
//         </div>

//         {/* Inputs */}
//         <div className="flex flex-col gap-4">
//           <Input placeholder="Enter title..." ref={titleref} />
//           <Input placeholder="Paste link..." ref={linkref} />
//         </div>

//         {/* Type Selector */}
//         <div className="flex justify-center align-center gap-7 mt-5">
//           <h1 className="text-xl font-medium text-slate-700 mt-5">Type:</h1>
//           <div className="flex justify-center align-center gap-3 mt-5">
//             <Button
//             text="Youtube"
//             variant={type === ContentType.Youtube ? "primary" : "secondary"}
//             onClick={() => settype(ContentType.Youtube)}
//           />
//           <Button
//             text="Twitter"
//             variant={type === ContentType.Twitter ? "primary" : "secondary"}
//             onClick={() => settype(ContentType.Twitter)}
//           />
//             </div>
          
//         </div>

//         {/* Submit */}
//         <div className="mt-6 flex justify-center">
//           <button
//             type="button"
//             className="cursor-pointer rounded-md border border-slate-300 py-2 px-4 text-center text-xl font-bold transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//             onClick={addcontent}
//           >
//             Submit
//           </button>
//         </div>

//       </div>
//     </div>
//   )}
// </div>
//   )
// }
























//   <div className=''>
  //     {open && (
  //       <div className='w-screen h-screen bg-slate-500/60 fixed top-0 left-0 flex justify-center items-center'>
          
  //         <div className='bg-white p-6 rounded-md w-80'>
            
  //           <div className='flex justify-end py-2'>
  //             <div onClick={onClose}>
  //              <CrossIcon />
  //             </div>
                
  //           </div>
  //           <div className='flex flex-col gap-4 mt-4'>
  //             <Input placeholder="Title" ref={titleref} />
  //             <Input placeholder="Link" ref={linkref} />
  //           </div>
  //           <div className='flex gap-4 mt-4 justify-center'>
  //             <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => settype(ContentType.Youtube)} />
  //             <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => settype(ContentType.Twitter)} />
  //           </div>
  //           <div className='flex pt-4 justify-center'>
  //             {/* <Button variant="primary" text="Submit" onClick={addcontent} /> */}
  //             <button onClick={addcontent} className="cursor-pointer rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
  //   Submit
  // </button>

  //           </div>

  //         </div>

  //       </div>
  //     )}
  //   </div>