"use client";

import { useEffect, useState } from "react";
import TableLoader from "@/components/custom/tableLoader";
import axios from "axios";
import toast from "react-hot-toast";
import { IEvent } from "@/types/type_Interface";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getEventStatus } from "@/helper/statusByDateAndTime";

const ShowAllEventsData = () => {
  const [allEventData, setAllEventData] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getAllEvents() {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/admin/events"
        );

        if (response.status === 200) {
          console.log(response.data);
          setAllEventData(response.data.allEvents);
          setLoading(false);
        }
      } catch (error) {
        toast.error("Server error");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getAllEvents();
  }, []);

  // delete the member person-------
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    if (!id) {
      toast.error("Invalid event id for deletion");
      return;
    }
    setDeleteLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_baseURL}/api/admin/events/${id}`
      );
      if (response.status === 200) {
        toast.success("Member deleted successfully");
        // remove the member from the list
        setAllEventData([
          ...allEventData.filter((event: any) => event.id !== id),
        ]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <TableLoader rows={6} col={7} />
      ) : (
        <>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="px-4 py-3 text-left font-medium text-black dark:text-gray-400">
                  ID
                </th>
                <th className="px-4 py-3 text-left font-medium text-black dark:text-gray-400">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-medium text-black dark:text-gray-400">
                  Start_Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-black dark:text-gray-400">
                  End_Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-black dark:text-gray-400">
                  Time
                </th>
                <th className="px-4 py-3 text-left font-medium text-black dark:text-gray-400">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-black dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allEventData &&
                allEventData.map((item, ind) => (
                  <tr
                    key={ind}
                    className="border-b border-gray-200 dark:border-gray-800"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">{item.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {item.startDate}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {item.endDate}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {item.startTime}
                      <span className="text-blue-800 font-bold">
                        {" -"}to{"- "}
                      </span>
                      {item.endTime}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap text-blue-800">
                      {getEventStatus(item.startDate, item.endDate)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap ">
                      <Link
                        href={`/admin/dashboard/updateEvent/${item.id}`}
                        className="bg-green-500 text-white p-2 rounded-md"
                      >
                        Update
                      </Link>
                      <Button
                        variant={"destructive"}
                        disabled={deleteLoading}
                        onClick={() => handleDelete(item.id || "")}
                        className={`${
                          deleteLoading ? "cursor-not-allowed" : ""
                        } ml-2 disabled:cursor-not-allowed`}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}

              {/* <tr className="border-b border-gray-200 dark:border-gray-800">
            <td className="px-4 py-3 whitespace-nowrap">INV002</td>
            <td className="px-4 py-3 whitespace-nowrap">Jane Smith</td>
            <td className="px-4 py-3 whitespace-nowrap">Hoodie</td>
            <td className="px-4 py-3 whitespace-nowrap">1</td>
            <td className="px-4 py-3 whitespace-nowrap">$49.99</td>
            <td className="px-4 py-3 whitespace-nowrap">ongoing</td>
            <td className="px-4 py-3 whitespace-nowrap">opdate/delete</td>
          
          </tr> */}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ShowAllEventsData;
