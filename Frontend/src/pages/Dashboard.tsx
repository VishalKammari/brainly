import Button from "../../components/Button";
import Plusicon from "../../components/icons/Plusicon";
import Shareicon from "../../components/icons/Shareicon";
import Card from "../../components/Card";
import CreateModel from "../../components/CreateModel";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProfileHeader from "../../components/ProfileHeader";
import useContent from "../hooks/useContent";
import axios from "axios";
import { backend_Url } from "../config";
import toast, { Toaster } from "react-hot-toast";


function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const { contents, refresh } = useContent();

  const filteredContents = activeFilter
    ? contents.filter(content => content.type.toLowerCase() === activeFilter.toLowerCase())
    : contents;

  const copyToClipboard = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  const handleShareBrain = async () => {
    setIsSharing(true);
    try {
      const response = await axios.post(
        `${backend_Url}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const hashFromMessage =
        typeof response.data?.message === "string"
          ? response.data.message.replace(/^\/?share\/?/, "")
          : "";
      const hash = response.data?.hash ?? hashFromMessage;

      if (!hash) {
        throw new Error("No share hash returned");
      }

      const shareUrl = `${window.location.origin}/share/${hash}`;
      await copyToClipboard(shareUrl);
      toast.success("Share link copied to clipboard");
    } catch {
      toast.error("Unable to create share link");
    } finally {
      setIsSharing(false);
    }
  };

  return (
  <div className="relative min-h-screen w-full overflow-hidden">
    
    {/* 🎥 Background Video */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed top-0 left-0 w-full h-full object-cover -z-10"
    >
      <source src="public/a.mp4" type="video/mp4" />
    </video>

    {/* 🌑 Overlay */}
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 -z-10"></div>

    {/* 📦 Main Layout */}
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar activeFilter={activeFilter} onFilterSelect={setActiveFilter} />
      </div>

      {/* Main */}
      <div className="w-full p-4 md:ml-64 relative z-10">
        <ProfileHeader />
        
        <CreateModel
          open={modelOpen}
          onClose={() => setModelOpen(false)}
          refresh={refresh}
        />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 mt-16 lg:mt-5">
          <Button
            variant="primary"
            text="Add Content"
            StartIcon={<Plusicon />}
            onClick={() => setModelOpen(true)}
          />
          <Button
            variant="secondary"
            text="Share Brain"
            StartIcon={<Shareicon />}
            loading={isSharing}
            onClick={handleShareBrain}
          />
        </div>

        {/* Cards */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredContents.map(({ type, link, title, _id }) => (
              <Card
                key={_id}
                type={type as 'twitter' | 'youtube' | 'instagram' | 'facebook' | 'pintrest' | 'linkedin' | 'other'}
                link={link}
                title={title}
              />
            ))}
          </div>
        </div>

        <Toaster />
      </div>
    </div>
  </div>
);

  // return (
  //   <div className="flex min-h-screen">
      
  //     {/* Sidebar */}
  //     <div className="hidden md:block">
  //       <Sidebar activeFilter={activeFilter} onFilterSelect={setActiveFilter} />
  //     </div>

  //     {/* Main */}
  //     <div className="w-full p-4 md:ml-64 relative">
  //       <ProfileHeader />
        
  //       <CreateModel
  //         open={modelOpen}
  //         onClose={() => setModelOpen(false)}
  //         refresh={refresh}
  //       />

  //       {/* Buttons */}
  //       <div className="flex flex-col sm:flex-row gap-3 mb-4 mt-12">
  //         <Button
  //           variant="primary"
  //           text="Add Content"
  //           StartIcon={<Plusicon />}
  //           onClick={() => setModelOpen(true)}
  //         />
  //         <Button
  //           variant="secondary"
  //           text="Share Brain"
  //           StartIcon={<Shareicon />}
  //           loading={isSharing}
  //           onClick={handleShareBrain}
  //         />
  //       </div>

  //       <div className="max-w-7xl mx-auto px-4 py-6">
  //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
  //           {filteredContents.map(({ type, link, title, _id }) => (
  //             <Card key={_id} type={type as 'twitter' | 'youtube' | 'instagram' | 'facebook' | 'pintrest' | 'linkedin' | 'other'} link={link} title={title} />
  //           ))}
  //         </div>
  //       </div>

  //       <Toaster />

  //         </div>
  //       </div>
  // );
}

export default Dashboard;












// import Button from '../../components/Button'
// import Plusicon from '../../components/icons/Plusicon'
// import Shareicon from '../../components/icons/Shareicon'
// import Card from '../../components/Card'
// import CreateModel from '../../components/CreateModel'
// import { useState } from 'react'
// import Sidebar from '../../components/Sidebar'
// import useContent from '../hooks/useContent'



// function Dashboard() {
//   const [modelOpen, setModelOpen] = useState(false);

//   const contents=useContent();

//   return (
//     <div className="flex min-h-screen">
      
//       {/* Sidebar */}
//       <div className="hidden md:block">
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="w-full p-4 md:ml-64">
        
//         <CreateModel open={modelOpen} onClose={() => setModelOpen(false)} />

//         {/* Top Buttons */}
//         <div className="flex flex-col sm:flex-row gap-3 mb-4">
//           <Button
//             variant="primary"
//             text="Add Content"
//             StartIcon={<Plusicon />}
//             onClick={() => setModelOpen(true)}
//           />
//           <Button
//             variant="secondary"
//             text="Share Brain"
//             StartIcon={<Shareicon />}
//           />
//         </div>

//         {/* Cards */}
//         <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
//           {JSON.stringify(contents)}

//           {
//           contents?.map(({type,link,title,_id})=>{
//             return <Card type={type} link={link} title={title} key={_id} />
//           })}
//         </div>

//       </div>
//     </div>
//   );
// }


// export default Dashboard
















// function Dashboard() {
//   const[modelOpen, setModelOpen] = useState(false);
//   return (
//     <div className='flex min-h-screen overflow-x-hidden'>
//   <Sidebar />

//   <div className='p-4 ml-64 w-full'>
//     <CreateModel open={modelOpen} onClose={() => setModelOpen(false)} />

//     <div className='flex gap-2 m-3'>
//       <Button variant="primary" text="Add Content" StartIcon={<Plusicon />} onClick={() => setModelOpen(true)} />
//       <Button variant="secondary" text="Share Brain" StartIcon={<Shareicon />} />
//     </div>

//     <div className='columns-1 md:columns-2 lg:columns-3 gap-2 space-y-2 mt-4'>
//         <Card type='youtube' link='https://youtu.be/jgyShFzdB_Q?si=ZxEQGLBG7WBhS6fw' title='my first video' />
//         <Card type='twitter' link='https://x.com/mufaddal_vohra/status/2041202853243732427?s=20' title='Elon Musk Tweet' />
//         <Card type='youtube' link='https://youtu.be/0gZuzKK_img?si=Igb8ce78Cubpa-e4' title='my first video' />
//         <Card type='twitter' link='https://x.com/mufaddal_vohra/status/2041202853243732427?s=20' title='Elon Musk Tweet' />
//         <Card type='youtube' link='https://youtu.be/LhpZJwUboeI?si=hwTg5wVFL1IJ8Qxv' title='my first video' />
//         <Card type='twitter' link='https://x.com/mufaddal_vohra/status/2041202853243732427?s=20' title='Elon Musk Tweet' />
//         <Card type='youtube' link='https://youtu.be/jgyShFzdB_Q?si=ZxEQGLBG7WBhS6fw' title='my first video' />
//         <Card type='twitter' link='https://x.com/mufaddal_vohra/status/2041202853243732427?s=20' title='Elon Musk Tweet' />
//         <Card type='youtube' link='https://youtu.be/0gZuzKK_img?si=Igb8ce78Cubpa-e4' title='my first video' />
//         <Card type='twitter' link='https://x.com/mufaddal_vohra/status/2041202853243732427?s=20' title='Elon Musk Tweet' />
//         <Card type='youtube' link='https://youtu.be/LhpZJwUboeI?si=hwTg5wVFL1IJ8Qxv' title='my first video' />
//         <Card type='twitter' link='https://x.com/mufaddal_vohra/status/2041202853243732427?s=20' title='Elon Musk Tweet' />
      
//     </div>
//   </div>
// </div>
//   )
// }

// export default Dashboard