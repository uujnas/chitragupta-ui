import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Navbar from '../../components/layout/Navbar'
import { TableContainer } from '../../components/modalComponents'

const GroupLunchDayDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [lunchDay, setGroupLunchDay] = useState({})

  useEffect(() => {
    const fetchGroupLunchDay = () => {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/group_lunch_days/${id}`,
          {
            headers: {
              'Content-type': 'application/json',
              Authorization: localStorage.token,
            },
          },
        )
        .then((response) =>
          setGroupLunchDay({
            date: response.data.data.attributes.date,
            group_lunch: response.data.included,
          })
        )

        .catch((err) => console.log(err))
    }
    fetchGroupLunchDay()
  }, [])


  return (
    <>
      <Navbar />
      <TableContainer>
        <strong>Date: {lunchDay.date}</strong>
        <div className="flex flex-col mt-8">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-sm tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Group Lunch
                    </th>
                    <th className="px-6 py-3 text-sm tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Status
                    </th>
                    <th className="px-6 py-3 text-sm tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Group Member
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {lunchDay?.group_lunch?.map((lunch_data) => (
                    <tr key={ lunch_data.id}
                      className="hover:cursor-pointer"
                      onClick={() =>
                        router.push(`../group_lunch/${lunch_data.id}`)
                      }
                    >
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <div className="flex">
                          <img
                            className="w-12 h-12 rounded-full"
                            src={`${lunch_data.attributes.lunch_img_urls}`}
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                            alt="group lunch"
                          />
                          <div className="ml-4">{lunch_data.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {`${lunch_data.attributes.status}`}
                      </td>
                      <td className="px-6 py-4  whitespace-no-wrap">
                        {lunch_data?.attributes?.group_member
                          ?.map((member) => (
                            <span key={member.id}>{member.user_id}</span>
                          ))
                          .reduce(
                            (group_member, elem) =>
                              group_member === null
                                ? [elem]
                                : [...group_member, ', ', elem],
                            null,
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </TableContainer>
    </>
  )
}

export default GroupLunchDayDetail
