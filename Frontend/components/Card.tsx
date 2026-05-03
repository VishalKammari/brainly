
import ShareIcon from './icons/Shareicon'
import { FacebookEmbed, InstagramEmbed, PinterestEmbed, XEmbed } from 'react-social-media-embed';
import { YouTubeEmbed } from 'react-social-media-embed';
interface Cardprops{
    title:string;
    link:string;
    type:'twitter'|'youtube'|'instagram'|'facebook'|'pintrest' |'linkedin' | 'other';
}


 const extractLinkedInPostId = (url: string): string | null => {
  try {
    
    let match = url.match(/activity-(\d+)/);
    if (match) return match[1];

    
    match = url.match(/urn:li:(?:activity|share):(\d+)/);
    if (match) return match[1];

    
    match = url.match(/-(\d{10,})-/);
    if (match) return match[1];

    return null;
  } catch {
    return null;
  }
};

const Card = ({ title, link, type }: Cardprops) => {
  const postId = extractLinkedInPostId(link);

  return (
    <div className="break-inside-avoid bg-white shadow-md rounded-xl p-4 border max-h-[500px]">
      
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-slate-800">{title}</h3>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-slate-800 transition"
        >
          <ShareIcon />
        </a>
      </div>

      
      <div className="pt-4">
        
        {type === "youtube"  && (
          <div className="flex justify-center overflow-hidden">
            <YouTubeEmbed url={link} width={325} height={220} />
          </div>
        )}

        {type === "twitter" && (
          <div className="flex justify-center overflow-hidden">
            <XEmbed url={link} width={325} height={325} />
          </div>
        )}

        {type === "instagram" && (
          <div className="flex justify-center overflow-hidden">
            <InstagramEmbed url={link} width={328} />
          </div>
        )}

        {type === "facebook" && (
          <div className="flex justify-center overflow-hidden">
            <FacebookEmbed url={link} width={328} />
          </div>
        )}

        {type === "pintrest" && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PinterestEmbed 
              url={link} 
              width={345}
              height={467}
            />
          </div>
        )}

        {
          type==="linkedin" && (
            
            postId ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <iframe
                src={`https://www.linkedin.com/embed/feed/update/urn:li:share:${postId}?collapsed=1`}
                height="669"
                width="504"
                frameBorder="0"
                title="Embedded post"
              />
            </div>
          ) : null
        )}

        {type === "other" && (
        <iframe
        src={link}
        width="100%"
        height="250"
        className="rounded-lg border"
        loading="lazy"
        allowFullScreen
        />
        )}    
      </div>
    </div>
  );
};


export default Card