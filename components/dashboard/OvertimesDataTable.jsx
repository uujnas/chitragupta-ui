import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Jsona from 'jsona'
import AsyncSelect from 'react-select/async'
import DataTable from './DataTable'
import { columns } from '../../data/overtimeTableData'
import { fetchOvertimes } from '../../redux/actions/dashboardActions'
import Modal from '../modal'
import { Btn, Input, Label } from '../formComponents'

function OvertimesDataTable({ fetchOvertimes, approver }) {
  const isAdmin = () => approver && approver.role === 'admin'
  const dataFormatter = new Jsona()

  const [showModal, setShowModal] = useState(false)
  const [overtime, setOvertime] = useState({
    approver_id: approver && approver.id,
  })
  const [userOptions, setUserOptions] = useState([])
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

  const searchRequest = async (query) => {
    console.log('Searching')
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/users.json`,
        {
          headers: {
            Authorization: localStorage.token,
            'Content-type': 'application/json',
          },
          params: { search: query },
        },
      )

      const users = dataFormatter.deserialize(response.data.data)
      const updatedUserOptions = users.map((user) => ({
        value: user.id,
        label: `${user.first_name} ${user.last_name}`,
      }))

      setUserOptions(updatedUserOptions)
      return updatedUserOptions
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
        const users = dataFormatter.deserialize(response.data.data)
        setUserOptions(
          users.map((user) => ({
            value: user.id,
            label: `${user.first_name} ${user.last_name}`,
          })),
        )
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
          <AsyncSelect
            onChange={(e) => {
              setSelectedUserId(e.value)
            }}
            defaultOptions={userOptions}
            // onInputChange={(query) => searchRequest(query)}
            loadOptions={(query) => searchRequest(query)}
          />

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
    approver: state.auth.user,
  }),
  { fetchOvertimes },
)(OvertimesDataTable)
