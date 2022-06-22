import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import DataTable from './DataTable'
import { TableContainer } from '../modalComponents'
import { columns } from '../../data/deviceUserTableData'
import { Btn, Label, Select, Option } from '../formComponents'
import InputWithLabelAndError from '../InputWithLabelAndError'
import Modal from '../modal'
import { fetchDeviceUsers } from '../../redux/actions/dashboardActions'
import { createDeviceUser } from '../../redux/actions/deviceUserActions'

function DeviceUsersDataTable() {
  const [deviceUser, setDeviceUser] = useState({})
  const [createNewDeviceUser, setCreateNewDeviceUser] = useState(false)
  const [errors, setErrors] = useState({})
  const creatingNewDeviceUser = () => setCreateNewDeviceUser(true)

  const checkIfFormIsValid = () => {
    let errorCount = 0
    ;['device', 'user', 'status', 'assigned_at', 'unassigned_at'].forEach(
      (field) => {
        if (deviceUser[field] === undefined) {
          errorCount += 1
          errors[field] = "Can't be blank."
          setErrors({ ...errors })
        }
      },
    )
    if (
      deviceUser.assigned_at &&
      new Date(deviceUser.assigned_at) > new Date(deviceUser.unassigned_at)
    ) {
      errorCount += 1
      setErrors({
        ...errors,
        unassigned_at: "Can't be less than assigned date.",
      })
    }

    return errorCount
  }

  const newDeviceUser = async () => {
    if (checkIfFormIsValid() === 0) {
      createDeviceUser(deviceUser)
      setCreateNewDeviceUser(false)
    }
  }

  const updateDeviceUser = (e) => {
    delete errors[e.target.name]
    setDeviceUser({ ...deviceUser, [e.target.name]: e.target.value })
  }

  return (
    <>
      <TableContainer>
        <div className="flex justify-end py-4">
          <Btn
            className="bg-teal-500 hover:bg-teal-600"
            onClick={creatingNewDeviceUser}
          >
            New Device User
          </Btn>
        </div>
        <DataTable
          rowClick={() => console.log('row clicked')}
          columns={columns}
          fetchFunction={fetchDeviceUsers}
        />
      </TableContainer>

      {createNewDeviceUser && (
        <Modal
          showModal={createNewDeviceUser}
          setShowModal={setCreateNewDeviceUser}
          title="New Device User"
        >
          {createNewDeviceUser && (
            <div className="flex flex-wrap">
              {['device', 'user'].map((field) => (
                <InputWithLabelAndError
                  name={field}
                  onChange={updateDeviceUser}
                  value={deviceUser[field]}
                  errors={errors}
                />
              ))}
              {['assigned_at', 'unassigned_at'].map((field) => (
                <InputWithLabelAndError
                  name={field}
                  onChange={updateDeviceUser}
                  value={deviceUser[field]}
                  errors={errors}
                  type={'date'}
                />
              ))}

              <div className="w-status">
                <Label className="block pb-3 text-sm font-semibold text-gray-500 uppercase">
                  Status
                </Label>
                <Select
                  className="w-full px-3 py-3 text-sm border rounded-lg mt-0"
                  name="status"
                  onClick={updateDeviceUser}
                  errrors={errors}
                >
                  <Option>Please Select one</Option>
                  <Option
                    value="available"
                    selected={deviceUser.status == 'active'}
                  >
                    Active
                  </Option>
                  <Option
                    value="unavailable"
                    selected={deviceUser.status == 'inactive'}
                  >
                    Inactive
                  </Option>
                </Select>
              </div>
            </div>
          )}
          <Btn
            className="bg-teal-500 hover:bg-teal-600"
            onClick={() => newDeviceUser()}
          >
            Submit
          </Btn>
        </Modal>
      )}
    </>
  )
}

export default connect(() => ({}), { fetchDeviceUsers, createDeviceUser })(
  DeviceUsersDataTable,
)
