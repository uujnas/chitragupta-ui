import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Navbar from '../../components/layout/Navbar'
import { TableContainer } from '../../components/modalComponents'

const GroupLunchShow = () => {
  const router = useRouter()
  const { id } = router.query
  const [lunch, setGroupLunch] = useState({})
  const [status, setStatus] = useState('active')

  useEffect(() => {
    const fetchGroupLunch = () => {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/group_lunches/${id}`,
          {
            headers: {
              'Content-type': 'application/json',
              Authorization: localStorage.token,
            },
          },
        )
        .then((response) => {
          setGroupLunch(response.data.data.attributes)
          setStatus(response.data.data.attributes.status)
        })

        .catch((err) => console.log(err))
    }
    fetchGroupLunch()
  }, [])



  return (
    <>
      <Navbar />
      <TableContainer>
        <h1 className="pb-4 space-x-6 space-y-7">
          <strong>Group Lunch Date :</strong>
          <span> {lunch?.group_lunch_day?.date} </span>
        </h1>
        <div className="flex">
          <div className="flex-1 w-50 space-y-4">
            <div className="status">
              <strong>status :</strong>
              <span
                className="rounded w-20 p-1 ml-3 text-center"
                style={{
                  backgroundColor: status === 'active' ? '#65d6ab' : '#e6df7e',
                }}
              >
                {lunch.status}
              </span>
            </div>
            <div className="manager">
              <strong>
                <p>manager</p>
              </strong>
              {lunch?.group_lunch_mamanger}
            </div>
            <div className="members">
              <strong>
                <p>group members</p>
              </strong>
              {lunch?.group_member
                ?.map((member) => (
                  <span key={member.id} className="pt-1">
                    {member.first_name} {member.last_name}
                  </span>
                ))
                .reduce(
                  (group_member, elem) =>
                    group_member === null
                      ? [elem]
                      : [...group_member, ', ', elem],
                  null,
                )}
            </div>
          </div>
          <div className="flex-1 w-50">
            <img
              src={`${lunch.lunch_img_urls}`}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
              alt="group lunch"
            />
          </div>
        </div>
      </TableContainer>
    </>
  )
}

export default GroupLunchShow
