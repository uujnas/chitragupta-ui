import DataTable from './DataTable'
import Modal from '../modal'
import { Btn, Label } from '../formComponents'
import { useState } from 'react'
import { connect } from 'react-redux'
import { columns } from '../../data/deviceTypeTableData'
import { TableContainer } from '../modalComponents'
import { fetchDeviceTypes } from '../../redux/actions/dashboardActions'
import { createDeviceType } from '../../redux/actions/deviceTypeActions'
import InputWithLabelAndError from '../InputWithLabelAndError'

function DeviceTypesDataTable({ fetchDeviceTypes, createDeviceType }) {
  const [deviceType, setDeviceType] = useState({})
  const [createNewDeviceType, setCreateNewDeviceType] = useState(false)
  const [errors, setErrors] = useState({})
  const creatingNewDeviceType = () => setCreateNewDeviceType(true)

  const updateDeviceType = (e) => {
    delete errors[e.target.name]
    setDeviceType({ ...deviceType, [e.target.name]: e.target.value })
  }

  const checkIfFormIsValid = () => {
    if (deviceType['device_type'] === undefined) {
      setErrors({ ...errors, message: "Field Can't be blank." })
    }
  }

  const newDeviceType = async () => {
    if (checkIfFormIsValid() === 0) {
      createDeviceType(device)
      setCreateNewDeviceType(false)
    }
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
        <DataTable>
          rowClick={() => console.log('row clicked')}
          columns={columns}
          fetchFunction={fetchDeviceTypes}
        </DataTable>
      </TableContainer>
      {createNewDeviceType && (
        <Modal
          showModal={createNewDeviceType}
          setShowModal={setCreateNewDeviceType}
          title="New Device Type"
        >
          <div className="flex flex-wrap">
            <InputWithLabelAndError
              name={'device_type'}
              onChange={updateDeviceType}
              value={deviceType['device_type']}
              errors={errors}
            />
          </div>

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

export default connect(() => ({}), { fetchDeviceTypes, createDeviceType })(
  DeviceTypesDataTable,
)
