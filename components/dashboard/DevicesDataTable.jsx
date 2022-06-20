import { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Jsona from 'jsona'
import { Btn } from '../formComponents'
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
    ;['device_type', 'identifier', 'status', 'image'].forEach((field) => {
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
      {['device_type', 'identifier', 'status', 'image'].map((field) => {
        if (field === 'image') {
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
          