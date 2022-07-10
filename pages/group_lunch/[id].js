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
        <div className="grid place-items-center gap-4">
          <div>
            <h1>
              Group Lunch on <span> {lunch.group_lunch_day_id} (date) </span>
            </h1>
          </div>
          <div>
            <p
              style={{
                backgroundColor: status === 'active' ? '#65d6ab' : '#e6df7e',
              }}
              className="p-1 rounded"
            >
              {lunch.status}
            </p>
          </div>
          <div>
            <img
              className="h-auto w-auto max-h-48 max-w-50"
              z
              src={`${lunch.lunch_img_urls}`}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
              alt="group lunch"
            />
          </div>
          <div className="text-center">
            <h1>Group Members</h1>
            {lunch?.group_member
              ?.map((member) => <span key={member.id}>{member.user_id}</span>)
              .reduce((group_member, elem) => (
                 group_member === null ? [elem] : [...group_member, ', ', elem]
              ), null)}
          </div>
        </div>
      </TableContainer>
    </>
  )
}

export default GroupLunchShow
