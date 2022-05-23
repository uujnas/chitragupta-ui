import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import DataTable from './DataTable'
import { columns } from '../../data/overtimeTableData'
import { fetchOvertimes } from '../../redux/actions/dashboardActions'
import Modal from '../modal'
import { Btn, Input, Label, Select, Option } from '../formComponents'
import axios from 'axios'
import Jsona from 'jsona'

function OvertimesDataTable({ fetchOvertimes, user }) {
  const isAdmin = () => user && user.role === 'admin'
  const dataFormatter = new Jsona()

  const [showModal, setShowModal] = useState(false)
  const [overtime, setOvertime] = useState({ approver_id: user && user.id })
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState({})

  const createOvertime = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/overtimes`,
        {
          overtime: {
            user_id: selectedUserId,
            seconds_tracked: overtime.seconds_tracked,
          },
        },
        { headers: { Authorization: localStorage.token } },
      )

      setShowModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/users.json`,
          { headers: { Authorization: localStorage.token } },
        )
        setUsers(dataFormatter.deserialize(response.data.data))
      } catch (error) {
        console.log(error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <>
      <DataTable
        rowClick={() => console.log('')}
        columns={columns}
        fetchFunction={fetchOvertimes}
      >
        {isAdmin() && (
          <Btn
            className="bg-teal-500 hover:bg-teal-600"
            onClick={() => {
              setShowModal(true)
            }}
          >
            New Overtime
          </Btn>
        )}
      </DataTable>

      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          title="New Overtime"
        >
          <Label>Seconds Tracked</Label>
          <Input
            type="text"
            value={overtime.seconds_tracked}
            onChange={(e) =>
              setOvertime({ ...overtime, seconds_tracked: e.target.value })
            }
          />

          <Label>Select salary</Label>
          <Select
            onChange={(e) => setSelectedUserId(e.target.value)}
            defaultValue={user && user.id}
          >
            <Option>...</Option>
            {users.map((u) => (
              <Option value={u.id} key={u.id}>
                {' '}
                {u.first_name} {u.last_name}{' '}
              </Option>
            ))}
          </Select>

          <Btn
            className="bg-teal-500 hover:bg-teal-600"
            onClick={createOvertime}
          >
            Submit
          </Btn>
        </Modal>
      )}
    </>
  )
}

export default connect(
  (state) => ({
    user: state.auth.user,
  }),
  { fetchOvertimes },
)(OvertimesDataTable)
