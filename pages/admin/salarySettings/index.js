import { useEffect, useState } from 'react'
import Navbar from '../../../components/layout/Navbar'
import SalarySettingsDataTable from '../../../components/dashboard/SalarySettingsDataTable'

const salarySettings = () => {
  const [salarySettings, setSalarySettings] = useState([])

  return (
    <>
      <Navbar />
      <SalarySettingsDataTable
        salarySettings={salarySettings}
        setSalarySettings={setSalarySettings}
      />
    </>
  )
}

export default salarySettings
