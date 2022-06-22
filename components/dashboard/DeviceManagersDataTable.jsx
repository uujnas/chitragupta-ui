import { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Jsona from 'jsona'
import { Btn, Label, Select, Option } from '../formComponents'
import Modal from '../modal'
import InputWithLabelAndError from '../InputWithLabelAndError'
import DataTable from './DataTable'
import { columns } from '../../data/deviceManagerTableData'
import { TableContainer } from '../modalComponents'
import { fetchDeviceManagers } from '../../redux/actions/dashboardActions'
import { createDeviceManager } from '../../redux/actions/deviceManagerActions'

function DeviceManagersDataTable({}) {
  const [deviceManager, setDeviceManager] = useState({})
  const [createNewDeviceManager, setcreateNewDeviceManager] = useState(false)
  const [errors, setErrors] = useState({})
  const creatingNewDeviceManager = () => setcreateNewDeviceManager(true)

  const updateDeviceManager = (e) => {
    delete errors[e.target.name]
    setDeviceManager({ ...deviceManager, [e.target.name]: e.target.value })
  }

  const checkIfFormIsValid = () => {
    let errorCount = 0
    ;['device', 'manager', 'assigned_at', 'unassigned_at'].forEach((field) => {
      if (deviceManager[field] === undefined) {
        errorCount += 1
        errors[field] = "Can't be blank."
        setErrors({ ...errors })
      }
    })
    if (
      deviceManager.assigned_at &&
      new Date(deviceManager.assigned_at) >
        new Date(deviceManager.unassigned_at)
    ) {
      errorCount += 1
      setErrors({
        ...errors,
        unassigned_at: "Can't be less than assigned date.",
      })
    }

    return errorCount
  }

  const newDeviceManager = async () => {
    if (checkIfFormIsValid() === 0) {
      createDeviceManager(deviceManager)
      setcreateNewDeviceManager(false)
    }
  }
  return (
    <>
      <TableContainer>
        <div className="flex justify-end py-4">
          <Btn
            className="bg-teal-500 hover:bg-teal-600"
            onClick={creatingNewDeviceManager}
          >
            New Device Manager
          </Btn>
        </div>
        <DataTable
          rowClick={() => console.log('row clicked')}
          columns={columns}
          fetchFunction={fetchDeviceManagers}
        />
      </TableContainer>

      {createNewDeviceManager && (
        <Modal
          showModal={createNewDeviceManager}
          setShowModal={setcreateNewDeviceManager}
          title="New Device Manager"
        >
          <div className="flex flex-wrap">
            {['device', 'manager'].map((field) => (
              <InputWithLabelAndError
                name={field}
                onChange={updateDeviceManager}
                value={deviceManager[field]}
                errors={errors}
              />
            ))}
            {['assigned_at', 'unassigned_at'].map((field) => (
              <InputWithLabelAndError
                name={field}
                onChange={updateDeviceManager}
                value={deviceManager[field]}
                errors={errors}
                type={'date'}
              />
            ))}
          </div>

          <Btn
            className="bg-teal-500 hover:bg-teal-600"
            onClick={() => newDeviceManager()}
          >
            Submit
          </Btn>
        </Modal>
      )}
    </>
  )
}

export default connect(() => ({}), {
  fetchDeviceManagers,
  createDeviceManager,
})(DeviceManagersDataTable)
// export default DeviceManagersDataTable
