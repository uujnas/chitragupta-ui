import React from 'react'
import { connect } from 'react-redux'
import DataTable from './DataTable'
import { columns } from '../../data/overtimeTableData'
import { fetchOvertimes } from '../../redux/actions/dashboardActions'

const OvertimesDataTable = ({ fetchOvertimes }) => {
  return (
    <DataTable
      rowClick={() => console.log('')}
      columns={columns}
      fetchFunction={fetchOvertimes}
    />
  )
}

export default connect(() => ({}), { fetchOvertimes })(OvertimesDataTable)
