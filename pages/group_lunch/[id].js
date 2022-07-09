import { useRouter } from 'next/router'

const GroupLunchShowRequest = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Group Lunch: {id}</p>
}

export default GroupLunchShowRequest
