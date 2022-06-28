import DataTable from './DataTable'
import Modal from '../modal'
import { Btn } from '../formComponents'
import { useState } from 'react'
import { connect } from 'react-redux'
import { columns } from '../../data/deviceTypeTableData'
import { TableContainer } from '../modalComponents'
import { fetchDeviceTypes } from '../../redux/actions/dashboardActions'
import { createDeviceType } from '../../redux/actions/deviceTypeActions'
import InputWithLabelAndError from '../InputWithLabelAndError'
import axios from 'axios'

function DeviceTypesDataTable({ fetchDeviceTypes, createDeviceType }) {
  const [deviceType, setDeviceType] = useState({})
  const [createNewDeviceType, setCreateNewDeviceType] = useState(false)
  const [errors, setErrors] = useState({})
  const creatingNewDeviceType = () => setCreateNewDeviceType(true)

  const checkIfFormIsValid = () => {
    let errorCount = 0;
    ['device_type'].forEach((field) => {
      if (deviceType[field] === undefined) {
        errorCount += 1
        errors[field] = "Can't be blank."
        setErrors({ ...errors })
      }
    })

    return errorCount
  }

  function newDeviceType() {
    if (checkIfFormIsValid() === 0) {
      createDeviceType(deviceType)
      setCreateNewDeviceType(false)
    }
  }

  const updateDeviceType = (e) => {
    delete errors[e.target.name]
    setDeviceType({ ...deviceType, [e.target.name]: e.target.value })
  }

  return (
    <>
      <TableContainer>
        <div className="flex justify-end py-4">
          <Btn
            className="bg-teal-500 hover:bg-teal-600"
            onClick={creatingNewDeviceType}
          >
            New Device Type
          </Btn>
        </div>

        <DataTable
          rowClick={() => console.log('row clicked')}
          columns={columns}
          fetchFunction={fetchDeviceTypes}
        />
      </TableContainer>

      {createNewDeviceType && (
        <Modal
          showModal={createNewDeviceType}
          setShowModal={setCreateNewDeviceType}
          title="New Device Type"
        >
          {createNewDeviceType && (
            <div className="flex flex-wrap">
              {['device_type'].map((field) => (
                <InputWithLabelAndError
                  name={field}
                  onChange={updateDeviceType}
                  value={deviceType[field]}
                  errors={errors}
                />
              ))}
            </div>
          )}
          <Btn
            className="bg-teal-500 hover:bg-teal-600"
            onClick={() => newDeviceType()}
          >
            Submit
          </Btn>
        </Modal>
      )}
    </>
  )
}

// export default DeviceTypesDataTable

export default connect(() => ({}), {
  fetchDeviceTypes,
  createDeviceType,
})(DeviceTypesDataTable)
