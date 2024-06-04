'use client'
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import LoadingSpinner from "@/components/custom/LoadingSpinner"
import { formatDate } from "@/helper/helpFullUtilityMethods"
import TableLoader from "@/components/custom/tableLoader"
import ShowAllTeamMembers from '@/components/custom/adminUI/ShowAllTeamMembers'


interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  image?: string; // URL
  createdAt: Date;
  updatedAt: Date;
  role: string;
}



export default function Component() {

 const [loading,setLoading] =useState<boolean>(false);
 const [users,setUsers] = useState<IUser[]>([]);
 const [totalEventNum,setToatlEventNum] = useState("");
 const [totalTeamNum,setToatlTeamNum] = useState("");


 // Get the Initial all type of  Data(total user, total events,total gallery image) for showing in dashboard-----------------------------------
 useEffect(()=>{
 async function fetchUsersInfo(){
  setLoading(true)
  try {
    const response =await  axios.get(`${process.env.NEXT_PUBLIC_baseURL}/api/admin/users`);
    if(response.status==200){
      setUsers(response.data.allUser);
      console.log("all user",response.data.allUser);
      console.log("responce data",response.data);
    }
  } catch (error) {
    toast.error('Server error');
  }finally{
    setLoading(false);
  }
}

 async function fetchtotalEvents(){
  try {
    const response =await  axios.get(`${process.env.NEXT_PUBLIC_baseURL}/api/admin/events`);
    if(response.status==200){
      setToatlEventNum(response.data.totalNumber);
      console.log("total num ",response.data.totalNumber)
    }
  } catch (error) {
    toast.error('Server error');
  }
 }

 async function fetchAllTeamMembers(){
  try {
    const response =await  axios.get(`${process.env.NEXT_PUBLIC_baseURL}/api/admin/members`);
    if(response.status==200){
      console.log("all team members",response.data);
      setToatlTeamNum((response.data.res).length);
    }
  } catch (error) {
    toast.error('Server error');
  }
 }
 fetchUsersInfo();
 fetchtotalEvents();
  fetchAllTeamMembers() ;
 },[]);

 if(loading){
  return(
    <div className="flex flex-row justify-center items-center w-full h-[90vh]">
    <LoadingSpinner/>
    </div>
  )
 }

  return (
    <div className="flex flex-col min-h-[100dvh]">
   
      <main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-slate-100 hover:bg-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Uers</CardTitle>
              <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users && users.length}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">+100% from last number</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-100 hover:bg-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <CreditCardIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEventNum && totalEventNum}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">+100% from last event</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-100 hover:bg-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">+0% from last number</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-100 hover:bg-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Toatl Team members</CardTitle>
              <ActivityIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTeamNum}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">100% since last number</p>
            </CardContent>
          </Card>
        </div>
        <div>
         
        </div>
    {/* ================-------------------- USER TABLE DATA-------------------------========= */}
        <div>
          <Card className="border-[1px] border-gray-400">
            <CardHeader className="flex items-center justify-between bg-slate-200">
              <CardTitle>Registered Users</CardTitle>
              {/* <Link
                className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                View all
              </Link> */}
            </CardHeader>
            {users.length==0 ? 
                <TableLoader rows={4} col={5} />:
            <Table>
              <TableHeader className="bg-gray-300 ">
                <TableRow>
                  <TableHead className="text-black">Name</TableHead>
                  <TableHead className="text-black">Email</TableHead>
                  <TableHead className="text-black">Role</TableHead>
                  <TableHead className="text-black">Account/create</TableHead>
                  <TableHead className="text-black">Account/update</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users && users.length>0 && users.map((item,idx)=>(
                  
                  <TableRow key={idx}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage alt="Sofia Davis" src="" />
                        <AvatarFallback>{(item.name).at(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{item.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>{formatDate((item.createdAt).toString())}</TableCell>
                  <TableCell>{formatDate((item.updatedAt).toString())}</TableCell>
                  
                </TableRow>

                ))
                }
               
              </TableBody>
            </Table>
}
          </Card>
       
        </div>
      
      {/* ======================----------- MEMBER DATA TABLE ----------------================ */}
      <ShowAllTeamMembers/>
      </main>
    </div>
  )
}

function ActivityIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  )
}


function CreditCardIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}


function DollarSignIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}


function MountainIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function SearchIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}