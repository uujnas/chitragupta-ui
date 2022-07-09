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
            group_lunch: response.data.data.relationships.group_lunches.data,
          }),
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
        {lunchDay?.group_lunch?.map((group_lunch) => (
          <ul key={group_lunch.id}>
            <li onClick={ () => router.push(`../group_lunch/${group_lunch.id}`)}> Group Lunch {group_lunch.id}</li>
          </ul>
        ))}
      </TableContainer>
    </>
  )
}

export default GroupLunchDayDetail
