import { useRouter } from 'next/router'

const GroupLunchDayDetail = () => {
  const router = useRouter()
  const { group_lunch_day_id } = router.query
  return <p>GroupLunchDayDetail: {group_lunch_day_id}</p>
}

export default GroupLunchDayDetail
