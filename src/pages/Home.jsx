import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CMSService } from '../services/cms';
import SEOHelper from '../components/SEOHelper';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [guestArticles, setGuestArticles] = useState([]);
  const [inHouseArticles, setInHouseArticles] = useState([]);

  useEffect(() => {
    async function load() {
      const arts = await CMSService.getArticles();
      const pods = await CMSService.getPodcasts();
      const guests = await CMSService.getGuestArticles();
      const inhouse = await CMSService.getWhitepapers(); // We injected In-House articles into whitepapers

      setArticles(arts);
      setPodcasts(pods);
      setGuestArticles(guests);
      setInHouseArticles(inhouse);
    }
    load();
  }, []);

  return (
    <div className="bg-[#1b1b1b] min-h-screen text-slate-200 font-sans">
      <SEOHelper 
        title="MarTech Insights & Analysis" 
        description="Premium B2B Insights for Modern Marketers."
      />

      {/* MarTechCube Style 4-Column Hero Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {articles.slice(0, 4).map(art => (
          <div key={art.id} className="relative h-72 lg:h-[450px] group overflow-hidden border-r border-[#333] last:border-r-0 cursor-pointer">
            <img 
              src={art.featuredImage} 
              alt={art.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 flex flex-col justify-end w-full h-full">
               <span className="text-[10px] uppercase font-black text-white bg-martech-primary px-2.5 py-1 rounded w-max mb-3 tracking-widest shadow-md">
                 {art.category}
               </span>
               <h2 className="text-white font-extrabold text-base lg:text-lg leading-snug line-clamp-3 group-hover:text-blue-400 transition-colors font-display shadow-sm">
                 <Link to={`/article/${art.slug}`}>{art.title}</Link>
               </h2>
               <div className="flex items-center mt-4 gap-2.5">
                  <img src={art.author.avatar} alt={art.author.name} className="w-6 h-6 rounded-full border border-[#444]" />
                  <span className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">
                    BY {art.author.name} <span className="mx-1.5 opacity-50">•</span> {art.date}
                  </span>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* MarTechCube 3-Column Media Grid (Podcasts | Guest | In-House) */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          
          {/* COLUMN 1: Podcasts */}
          <div className="space-y-6">
             <div className="flex items-center justify-between border-b border-[#333] pb-3">
               <h3 className="text-2xl font-bold text-white font-display tracking-tight">MarTech Podcasts</h3>
               <Link to="/podcasts" className="text-[10px] font-bold text-gray-400 border border-[#444] rounded-full px-3 py-1 hover:text-white hover:border-gray-200 transition-colors tracking-widest uppercase">
                 View all &rarr;
               </Link>
             </div>
             <div className="space-y-5">
               {podcasts.slice(0, 2).map(pod => {
                 const splitTitle = pod.title ? pod.title.split(' - ') : ['Guest', 'Role'];
                 const guestName = splitTitle[0];
                 const guestRole = splitTitle[1] || pod.company;
                 
                 return (
                   <div key={pod.id} className="relative rounded-xl overflow-hidden h-[180px] bg-gradient-to-br from-[#061e47] to-[#04112e] border border-blue-900/40 group cursor-pointer shadow-lg hover:shadow-blue-900/20 transition-all">
                     <div className="absolute top-5 left-5 z-20">
                        <div className="flex items-center gap-2 mb-1.5">
                           <span className="text-white font-black text-sm bg-blue-600 px-1.5 rounded">MTC</span>
                           <span className="text-[7px] font-bold text-blue-200 uppercase tracking-widest leading-tight w-16">Insights for Modern Marketers</span>
                        </div>
                        <span className="text-white font-black text-2xl mt-1 block tracking-tighter">PODCAST</span>
                        <span className="text-blue-300 text-[8px] uppercase tracking-widest block font-bold mb-4">Listen to the Champion</span>
                     </div>
                     
                     {/* Circular headshot overlapping */}
                     <div className="absolute right-5 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-[3px] border-blue-500 overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.3)] z-10 group-hover:scale-105 transition-transform duration-500">
                        <img src={pod.featuredImage} alt={guestName} className="w-full h-full object-cover" />
                     </div>
                     
                     <div className="absolute bottom-5 left-5 z-20 max-w-[55%]">
                       <h4 className="text-white font-extrabold text-sm leading-tight drop-shadow-md">{guestName}</h4>
                       <p className="text-blue-200 text-[9px] font-medium leading-snug drop-shadow-md mt-0.5">{guestRole}</p>
                     </div>
                     
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                   </div>
                 );
               })}
             </div>
          </div>

          {/* COLUMN 2: Guest Articles */}
          <div className="space-y-6">
             <div className="flex items-center justify-between border-b border-[#333] pb-3">
               <h3 className="text-2xl font-bold text-white font-display tracking-tight">Guest Articles</h3>
               <Link to="/guest-articles" className="text-[10px] font-bold text-gray-400 border border-[#444] rounded-full px-3 py-1 hover:text-white hover:border-gray-200 transition-colors tracking-widest uppercase">
                 View all &rarr;
               </Link>
             </div>
             <div className="space-y-5">
               {guestArticles.slice(0, 3).map(art => (
                  <div key={art.id} className="flex gap-4 border-b border-[#2a2a2a] pb-5 last:border-0 last:pb-0 group">
                     <div className="w-28 h-24 flex-shrink-0 overflow-hidden rounded-xl border border-[#333]">
                       <img src={art.featuredImage} alt={art.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                     </div>
                     <div className="flex flex-col justify-center">
                       <h4 className="text-white text-sm font-bold leading-snug group-hover:text-blue-400 transition-colors">
                         <Link to={`/article/${art.slug}`}>{art.title}</Link>
                       </h4>
                       <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-2">
                         BY <span className="text-gray-300">{art.author.name}</span> <span className="mx-1.5 opacity-50">•</span> {art.date}
                       </span>
                     </div>
                  </div>
               ))}
             </div>
          </div>

          {/* COLUMN 3: In-House Articles */}
          <div className="space-y-6">
             <div className="flex items-center justify-between border-b border-[#333] pb-3">
               <h3 className="text-2xl font-bold text-white font-display tracking-tight">In-House Articles</h3>
               <Link to="/in-house" className="text-[10px] font-bold text-gray-400 border border-[#444] rounded-full px-3 py-1 hover:text-white hover:border-gray-200 transition-colors tracking-widest uppercase">
                 View all &rarr;
               </Link>
             </div>
             <div className="space-y-5">
               {inHouseArticles.slice(0, 3).map(art => (
                  <div key={art.id} className="flex gap-4 border-b border-[#2a2a2a] pb-5 last:border-0 last:pb-0 group">
                     <div className="w-28 h-24 flex-shrink-0 overflow-hidden rounded-xl border border-[#333]">
                       <img src={art.featuredImage} alt={art.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                     </div>
                     <div className="flex flex-col justify-center">
                       <h4 className="text-white text-sm font-bold leading-snug group-hover:text-blue-400 transition-colors">
                         <Link to={`/article/${art.slug}`}>{art.title}</Link>
                       </h4>
                       <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-2">
                         BY <span className="text-gray-300">{art.author.name}</span> <span className="mx-1.5 opacity-50">•</span> {art.date}
                       </span>
                     </div>
                  </div>
               ))}
             </div>
          </div>

        </div>
      </section>
    </div>
  );
}
