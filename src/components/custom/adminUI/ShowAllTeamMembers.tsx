
'use client'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { TableBody, TableCell, TableHead, TableHeader, TableRow,Table } from '@/components/ui/table'
import ToolTipComponent from '../ToolTipComponent'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import TableLoader from '../tableLoader'


//  New component o=========================================================>

const ShowAllTeamMembers = () => {


    const [memberData,setmemberData]=useState([]);
    const [loading ,setLoading]=useState<boolean>(false);
    const [deleteLoading ,setDeleteLoading]=useState<boolean>(false);
  
    useEffect(() => { 
      // fetch member data from server
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_baseURL}/api/admin/members`,);
      if(response.status===200){
      console.log(response.data.res);
      setmemberData(response.data.res);
      }
        } catch (error) {
          console.log(error);
          toast.error('Server error');
        }finally{
      setLoading(false);
        }
     }
     fetchData()
    }, []);
  
    // delete the member person-------
    const handleDelete = async(id:string)=>{
      if (!confirm('Are you sure you want to delete this member?')) return;
  
      // In React, it's essential to update state immutably. When you call setmemberData((prev) => prev.filter(...)), you're creating a new array reference, but React might not immediately re-render due to shallow comparison. 
      // right way-----
      // setmemberData([...memberData.filter((member:any) => member.id !== id)]);
      setDeleteLoading(true); 
      try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_baseURL}/api/admin/members/${id}`);
        if(response.status===200){
          toast.success('Member deleted successfully');
          // remove the member from the list
          setmemberData([...memberData.filter((member:any) => member.id !== id)]);
        }
      } catch (error) {
        console.log(error);
        toast.error('Server error');
      }finally{
        setDeleteLoading(false);
      }
     
    }
  

  return (
    <div className='my-4'>
     
    <Card className='border-black'>
       <CardHeader className="flex items-center justify-between bg-slate-200 rounded-tl-md rounded-tr-md">
         <CardTitle>Team Members</CardTitle>
         {/* <Link
           className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
           href="#"
         >
           View all
         </Link> */}
       </CardHeader>
       {loading?<TableLoader rows={5} col={5} />:
       <Table>
         <TableHeader className='bg-gray-300'>
           <TableRow>
             <TableHead className='text-black'>Name</TableHead>
             <TableHead className='text-black'>Position</TableHead>
             <TableHead className='text-black'>LinkedIn</TableHead>
             <TableHead className='text-black'>GitHub</TableHead>
             <TableHead className='text-black'>Twitter</TableHead>
             <TableHead className='text-black'>Status</TableHead>
             <TableHead className='text-black'>Actions</TableHead>
             <TableHead className='text-black'>Account Create</TableHead>
           </TableRow>
         </TableHeader>
         <TableBody>
           
             {memberData && memberData.map((member:any,index:number)=>(
               <TableRow key={index}>
                    <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage alt="Sofia Davis" src={member.imageUrl?.secure_url} />
                        <AvatarFallback>{"SP"}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{"Mohan"}</div>
                    </div>
                  </TableCell>
                  <TableCell>{member.position}</TableCell>
                
                  <TableCell className=""><ToolTipComponent toolTipPlaceHolder='URL' toolTipContent={`${member.linkedin}`}  /></TableCell>
                  <TableCell className=""><ToolTipComponent toolTipPlaceHolder='URL' toolTipContent={`${member.github}`}  /></TableCell>
                  <TableCell className=""><ToolTipComponent toolTipPlaceHolder='URL' toolTipContent={`${member.twitter}`}  /></TableCell>
                  <TableCell className="">$45,231.89</TableCell>
                <TableCell><Button variant={"destructive"} disabled={deleteLoading} className=' disabled:cursor-not-allowed'  onClick={() =>handleDelete(member.id)} >Delete</Button></TableCell>
                <TableCell className="">{member.createdAt}</TableCell>
           </TableRow>
             ))}
         </TableBody>
       
       </Table>
      }
     </Card>
     
</div>
  )
}

export default ShowAllTeamMembers