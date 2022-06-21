import { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Jsona from 'jsona'
import { Btn, Label, Select, Option } from '../formComponents'
import Modal from '../modal'
import InputWithLabelAndError from '../InputWithLabelAndError'
import DataTable from './DataTable'
import { columns } from '../../data/deviceTableData'
import { TableContainer } from '../modalComponents'
import { fetchDevices } from '../../redux/actions/dashboardActions'
import { createDevice } from '../../redux/actions/deviceActions'

function DevicesDataTable({ fetchDevices }) {
  const [device, setDevice] = useState({})
  const [createNewDevice, setCreateNewDevice] = useState(false)
  const [errors, setErrors] = useState({})
  const creatingNewDevice = () => setCreateNewDevice(true)

  const updateDevice = (e) => {
    delete errors[e.target.name]
    setDevice({ ...device, [e.target.name]: e.target.value })
  }

  const checkIfFormIsValid = () => {
    ;['device_type_id', 'identifier', 'status', 'images'].forEach((field) => {
      if (device[field] === undefined) {
        setErrors({ ...errors, [field]: "Can't be blank." })
      }
    })
  }

  const newDevice = async () => {
    if (checkIfFormIsValid() === 0) {
      createDevice(device)
      setCreateNewDevice(false)
    }
  }

  return (
    <>
      <TableContainer>
        <div className="flex justify-end py-4">
          <Btn
            className="bg-teal-500 hover:bg-teal-600"
            onClick={creatingNewDevice}
          >
            New Device
          </Btn>
        </div>
        <DataTable
          rowClick={() => console.log('row clicked')}
          columns={columns}
          fetchFunction={fetchDevices}
        />
      </TableContainer>
      {createNewDevice && (
        <Modal
          showModal={createNewDevice}
          setShowModal={setCreateNewDevice}
          title="New Device"
        >
          <div className="flex flex-wrap">
            {['device_type', 'identifier', 'images'].map((field) => {
              if (field === 'images') {
                return (
                  <InputWithLabelAndError
                    name={field}
                    onChange={updateDevice}
                    value={device[field]}
                    errors={errors}
                    type={'file'}
                  />
                )
              } else {
                return (
                  <InputWithLabelAndError
                    name={field}
                    onChange={updateDevice}
                    value={device[field]}
                    errors={errors}
                  />
                )
              }
            })}

            <div className="w-status">
              <Label className="block pb-3 text-sm font-semibold text-gray-500 uppercase">
                Status
              </Label>
              <Select
                className="w-full px-3 py-3 text-sm border rounded-lg mt-0"
                name="status"
                onClick={updateDevice}
                errrors={errors}
              >
                <Option>Please Select one</Option>
                <Option
                  value="available"
                  selected={device.status == 'available'}
                >
                  available
                </Option>
                <Option
                  value="unavailable"
                  selected={device.status == 'unavailable'}
                >
                  unavailable
                </Option>
                <Option
                  value="dysfunctional"
                  selected={device.status == 'dysfunctional'}
                >
                  dysfunctional
                </Option>
              </Select>
            </div>
          </div>

          <Btn
            className="bg-teal-500 hover:bg-teal-600"
            onClick={() => newDevice()}
          >
            Submit
          </Btn>
        </Modal>
      )}
    </>
  )
}

export default connect(() => ({}), { fetchDevices, createDevice })(
  DevicesDataTable,
)
