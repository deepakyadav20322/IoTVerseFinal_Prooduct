'use client'
import axios from "axios";
import { Span } from "next/dist/trace";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Team = () => {
  const teamMemberss = Array.from({ length: 8 });
  const [teamMembers,setTeamMembers] = useState<any[]>([]);
  const [loading ,setLoading] = useState<boolean>();
  const [url ,setUrl] = useState('https://res.cloudinary.com/dtylrk1zj/image/upload/v1717397361/Image/xdoevrw57z3h81lyrwh6.jpg');

  useEffect(()=>{
    async function fetchTeamMembers(){
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_baseURL}/api/admin/members`);
      if(response.status===200){
        console.log("team members",response.data);
        setTeamMembers(response.data.res);
      }
    } catch (error) {
      console.log(error);
        toast.error('Server error');
    }finally{
      setLoading(false);  
    }
  }

fetchTeamMembers();
},[]); 


  return (
    <>
      <section>
        <div className="max-w-7xl w-full border-2 min-h-[80vh] mt-6 ">
          <h1 className=" font-bold text-2xl text-center py-4">Our Team</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 place-items-center">
            {loading ? <TeamMemberLoader/>:
            <>
            {teamMembers.map((item, ind) => (
              // <Image className='' src={'/Images/visionImg.png'} width={220} height={220} alt='teamImg'/>
              <div key={ind} className="w-[300px] flex justify-center ">
                <div className="w-full h-[250px] relative group overflow-hidden">
                  <div className="h-1/2 p-6 flex flex-col justify-center bg-black">
                    <h3 className="text-xl mb-2 font-semibold text-white">
                      {item.position}
                    </h3>
                    <p className="text-sm font-light text-slate-300">
                    {item.name}
                    </p>
                  </div>

                  <div className="absolute inset-0 z-10 group-hover:top-[50%] group-hover:right-[50%] transition-all duration-500">
                    <div
                      style={{
                        backgroundImage: `url(${item.imageUrl.secure_url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        top: "0%",
                        right: "0%",
                        width: "100%", // Adjust the width to cover only a quarter of the box
                        height: "100%", // Adjust the height to cover only a quarter of the box
                        transform: "translate(0%, 0%)", // Center the overlay
                        opacity: 1,
                        backgroundColor: `rgb(226,232,240)`,
                        transition: "transform 0.4s ease-in-out", // Increase the transition duration
                      }}
                    ></div>
                  </div>

                  <a
                    href="#"
                    rel="nofollow"
                    className="w-1/2 h-1/2 absolute bottom-0 right-0 z-0 grid place-content-center bg-white text-black group-hover:text-indigo-500 transition-colors"
                  >
                    <div className="flex items-center flex-col">
                      {/* <span className="text-xs">MORE</span> */}
                       {item.linkedin ? <Link target="_blank " href={item .linkedin}>Linkedin</Link>:<span className="text-gray-400">Linkedin</span>}
                      {item.github ? <Link target="_blank"  href={item.github}>GitHub</Link>:<span className="text-gray-400">GitHub</span>}
                       {item.twitter ? <Link target="_blank"  href={item.twitter}>Twitter</Link>:<span className="text-gray-400">twitter</span>}
                    </div>
                  </a>
                </div>
              </div>
            ))}
            </>
          }
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;


function TeamMemberLoader(){
  return(
    <>
    {Array.from({ length: 8 }).map((_,ind)=>(
      <div key={ind} className="w-[300px] h-[250px] flex justify-center rounded-md bg-slate-200 animate-pulse">

      </div>
    ))}
    </>
  )
} 





















// it only for review code------------------

// {teamMemberss.map((item, ind) => (
//   // <Image className='' src={'/Images/visionImg.png'} width={220} height={220} alt='teamImg'/>
//   <div key={ind} className="w-[300px] flex justify-center ">
//     <div className="w-full h-[250px] relative group overflow-hidden">
//       <div className="h-1/2 p-6 flex flex-col justify-center bg-black">
//         <h3 className="text-xl mb-2 font-semibold text-white">
//           Manager
//         </h3>
//         <p className="text-sm font-light text-slate-300">
//           Deepak Yadav
//         </p>
//       </div>

//       <div className="absolute inset-0 z-10 group-hover:top-[50%] group-hover:right-[50%] transition-all duration-500">
//         <div
//           style={{
//             backgroundImage: 'url("Images/visionImg.png")',
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             top: "0%",
//             right: "0%",
//             width: "100%", // Adjust the width to cover only a quarter of the box
//             height: "100%", // Adjust the height to cover only a quarter of the box
//             transform: "translate(0%, 0%)", // Center the overlay
//             opacity: 1,
//             backgroundColor: `rgb(226,232,240)`,
//             transition: "transform 0.4s ease-in-out", // Increase the transition duration
//           }}
//         ></div>
//       </div>

//       <a
//         href="#"
//         rel="nofollow"
//         className="w-1/2 h-1/2 absolute bottom-0 right-0 z-0 grid place-content-center bg-white text-black group-hover:text-indigo-500 transition-colors"
//       >
//         <div className="flex items-center flex-col">
//           <span className="text-xs">MORE</span>
//           <p>GitHub</p>
//           <p>Instagarm</p>
//           <p>Linkedin</p>
//         </div>
//       </a>
//     </div>
//   </div>
// ))}