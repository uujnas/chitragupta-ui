import { useState, useEffect } from 'react'
import axios from 'axios'
import Jsona from 'jsona'
import { columns } from '../../data/salaryRecordsTableData'
import { TableContainer } from '../modalComponents'
import { Btn, Input } from '../formComponents'
import DataTable from './DataTable'
import Alert from '../alert'
import { fetchSalaryRecords } from '../../redux/actions/dashboardActions'
import { connect } from 'react-redux'

function SalaryRecordsDataTable({
  salaryRecords,
  setSalaryRecords,
  fetchSalaryRecords,
}) {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [date, setDate] = useState(null)
  const dataFormatter = new Jsona()

  // make request to remote api for salary records generation
  const generateSalaryRecords = async () => {
    if (!date) {
      setError('Date Must be present.')
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/generate_salary_records`,
          {
            salary_date: date,
          },
          {
            headers: {
              Authorization: localStorage.token,
            },
          },
        )

        if (response.statusText === 'OK') {
          setError('')
          setSuccess(response.data.message)
        } else {
          setSuccess('')
          setError(
            response.data.message || "Couldn't generate salary records...",
          )
        }
      } catch (rerror) {
        setSuccess('')
        setError(
          rerror.response.data.message ||
            rerror.response.data.error ||
            "Couldn't generate salary records",
        )
      }
    }
  }

  return (
    <TableContainer>
      <Alert
        success={success.length > 0}
        message={success.length > 0 ? success : error}
        show={success.length > 0 || error.length > 0}
        setError={setError}
        setSuccess={setSuccess}
      />
      <div className="flex justify-end py-4">
        <Input
          className="w-full mr-4 sm:w-1/2 md:w-1/3"
          onChange={(e) => setDate(e.target.value)}
          type="date"
        />
        {error.length > 0 ? <span>{error}</span> : ''}
        <Btn
          className="bg-teal-500 hover:bg-teal-600"
          onClick={generateSalaryRecords}
        >
          Generate
        </Btn>
      </div>

      <DataTable
        data={salaryRecords}
        columns={columns}
        fetchFunction={fetchSalaryRecords}
      />
    </TableContainer>
  )
}

export default connect(() => ({}), { fetchSalaryRecords })(
  SalaryRecordsDataTable,
)
