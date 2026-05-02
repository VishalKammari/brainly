import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card";
import { backend_Url } from "../config";
import Button from "../../components/Button";

type ContentType =
  | "twitter"
  | "youtube"
  | "instagram"
  | "facebook"
  | "pintrest"
  | "linkedin"
  | "other";

interface SharedContent {
  _id: string;
  title: string;
  link: string;
  type: ContentType;
}

const SharedBrain = () => {
  const { shareLink } = useParams();
  const [contents, setContents] = useState<SharedContent[]>([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedBrain = async () => {
      if (!shareLink) {
        setError("Invalid share link");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${backend_Url}/api/v1/brain/${shareLink}`);
        setContents(response.data?.content ?? []);
        setUsername(response.data?.user ?? "");
      } catch {
        setError("Shared brain not found");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedBrain();
  }, [shareLink]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <p className="text-slate-600">Loading shared brain...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }
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
      <source src="/public/a.mp4" type="video/mp4" />
    </video>

    {/* 🌑 Overlay */}
    {/* <div className="fixed inset-0 bg-black/60 -z-10"></div> */}

    {/* 📦 Content */}
    <div className="relative z-10 min-h-screen p-4 md:p-6">

      {/* Header */}
      <div className="max-w-7xl flex justify-between mx-auto px-4 py-2">
        <h1 className="text-2xl font-semibold text-white">
          {username}&apos;s Brain
        </h1>
        <button className="flex items-center gap-3 px-4 py-2 bg-white backdrop-blur-md border border-gray-200 rounded-xl shadow-sm cursor-pointer"
        onClick={() => window.open("http://localhost:5173/signin", "_blank")}
        >
        <img 
        src="/public/icons8-curly-arrow.gif" 
        alt="brain" 
        className="w-7 h-7 opacity-80"
        />
        <span className="text-gray-700 font-medium">
          Make your own brain
        </span>
        </button>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {contents.map(({ type, link, title, _id }) => (
            <Card key={_id} type={type} link={link} title={title} />
          ))}
        </div>
      </div>

    </div>
  </div>
);





  // return (
  //   <div className="min-h-screen bg-slate-50 p-4 md:p-6">
  //     <div className="max-w-7xl mx-auto px-4 py-2">
  //       <h1 className="text-2xl font-semibold text-slate-800">{username}&apos;s Brain</h1>
  //     </div>

  //     <div className="max-w-7xl mx-auto px-4 py-6">
  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
  //         {contents.map(({ type, link, title, _id }) => (
  //           <Card key={_id} type={type} link={link} title={title} />
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default SharedBrain;
