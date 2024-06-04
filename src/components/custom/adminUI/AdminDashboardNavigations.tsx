'use client'

import Link from "next/link";
import {usePathname } from "next/navigation";



// New component-=====================================>
    const AdminDashboardNavigations = () => {
  let pathName = usePathname();

  const dashboardNavigationItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      
    },
    {
      name: "Create Event",
      href: "/admin/dashboard/createEvent",
     
    },
    {
      name: "Show Events",
      href: "/admin/dashboard/allEvents",
      
    },
    {
      name: "Upload Gallery Image",
      href: "/admin/dashboard/uploadGalleryImg",
      
    },
    {
      name: "Create Member",
      href: "/admin/dashboard/createMember",
      
    },
  
  ]



  return (
    <div>
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 overflow-x-auto">
        <nav className=" gap-6 text-lg font-medium flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 whitespace-nowrap">
          {/* <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
            <MountainIcon className="w-6 h-6" />
            <span className="sr-only">Acme Inc</span>
          </Link> */}

          {dashboardNavigationItems && dashboardNavigationItems.map((item) => (
            <Link key={item.name} className={`${item.href==pathName?'font-bold text-black bg-slate-200 p-2 rounded-md':'text-gray-500'}  dark:text-gray-400 hover:bg-slate-200 rounded-md p-2 `} href={item.href}>
              {item.name}
         </Link>
             ))}
        </nav>
        {/* <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="flex-1 ml-auto sm:flex-initial">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" placeholder="Search..." type="search" />
            </div>
          </form>
          <Button className="rounded-full" size="icon" variant="ghost">
            <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div> */}
        </header> 

    </div>
  )
}






// function MountainIcon(props:any) {
//     return (
//       <svg
//         {...props}
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
//       </svg>
//     )
//   }


export default AdminDashboardNavigations