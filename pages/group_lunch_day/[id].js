import { useEffect, useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router'
import Navbar from '../../components/layout/Navbar'

const GroupLunchDayDetail = () => {
  const router = useRouter()
  const { id } = router.query

  const [lunchDay, setLunchDay] = useState({})

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
          .then((response) => setLunchDay(response.data.data))
          .catch((err) => console.log(err))
      }
      fetchGroupLunchDay();
    },[])

  return (
    <>
      <Navbar />
      {lunchDay?.attributes?.date}
      {
        lunchDay?.relationships?.group_lunches?.data?.map((group_lunch) =>
          <ul key = {group_lunch.id}>
            <li> Group Lunch { group_lunch.id}</li>
          </ul>
        )
      }
    </>
  )
}

export default GroupLunchDayDetail
