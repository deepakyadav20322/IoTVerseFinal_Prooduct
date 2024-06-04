import { Button } from "@/components/ui/button"
import ShowAllEventsData from '@/components/custom/adminUI/showAllEventsData'

const page = () => {
  return (
    <div className="flex flex-col gap-4 max-w-7xl w-full m-auto my-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold px-1">All Events Information</h2>
      <Button variant="outline" className=" cursor-not-allowed">Export to CSV</Button>
    </div>
    <div className="overflow-x-auto">
      <ShowAllEventsData/>
    </div>
  </div>
  )
}

export default page