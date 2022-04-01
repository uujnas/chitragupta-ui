import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import { columns } from "../../data/salariesTableData";
import { TableContainer } from "../modalComponents";
import { Btn, Input, Label } from "../formComponents";
import Modal from "../modal";
import axios from "axios";
import Jsona from "jsona";

const SalariesDataTable = ({ salaries, setSalaries }) => {
  const [salary, setSalary] = useState({});
  const [createNewSalary, setCreateNewSalary] = useState(false);

  const dataFormatter = new Jsona();

  const creatingNewSalary = () => {
    console.log("creating new salary");
    setCreateNewSalary(true);
  };

  const updateSalary = (e) => {
    setSalary({ ...salary, [e.target.name]: e.target.value });
  };

  const createSalary = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/salaries.json`, 
      {
        salary
      },
      {
        headers: {
          Authorization: localStorage.token,
        },
      });

      setSalaries([dataFormatter.deserialize(response.data), ...salaries]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TableContainer>
        <div className="flex justify-end py-4">
          <Btn
            className="bg-teal-500 hover:bg-teal-600"
            onClick={creatingNewSalary}
          >
            New Salary
          </Btn>
        </div>

        <DataTable
          data={salaries}
          rowClick={() => console.log()}
          columns={columns}
        />
      </TableContainer>
      {createNewSalary && (
        <Modal
          showModal={createNewSalary}
          setShowModal={setCreateNewSalary}
          title={"New Salary"}
        >
          <div className="flex">
            <div className="pr-4 md:w-1/2">
              <Label>Basic Salary</Label>
              <Input
                name="basic_salary"
                value={salary.basic_salary || ""}
                onChange={updateSalary}
              />
            </div>
            <div className="md:w-1/2">
              <Label>Commitment Bonus</Label>
              <Input
                name="commitment_bonus"
                value={salary.commitment_bonus || ""}
                onChange={updateSalary}
              />
            </div>
          </div>

          <div className="flex">
            <div className="pr-4 md:w-1/2">
              <Label>Allowance</Label>
              <Input
                name="allowance"
                value={salary.allowance || ""}
                onChange={updateSalary}
              />
            </div>
            <div className="md:w-1/2">
              <Label>Festival Bonus</Label>
              <Input
                name="festival_bonus"
                value={salary.festival_bonus || ""}
                onChange={updateSalary}
              />
            </div>
          </div>

          <div className="flex">
            <div className="pr-4 md:w-1/2">
              <Label>Income Tax</Label>
              <Input
                name="income_tax"
                value={salary.income_tax || ""}
                onChange={updateSalary}
              />
            </div>
            <div className="md:w-1/2">
              <Label>Net CTC</Label>
              <Input
                name="net_ctc"
                value={salary.net_ctc}
                onChange={updateSalary}
              />
            </div>
          </div>

          <div className="flex">
            <div className="pr-4 md:w-1/2">
              <Label>Cash In Hand</Label>
              <Input
                name="cash_in_hand"
                value={salary.cash_in_hand}
                onChange={updateSalary}
              />
            </div>
            <div className="md:w-1/2">
              <Label>Monthly Dispatch</Label>
              <Input
                name="monthly_dispatch"
                value={salary.monthly_dispatch}
                onChange={updateSalary}
              />
            </div>
          </div>

          <div className="flex">
            <div className="w-full pr-4">
              <Label>Life Insurance Deduction</Label>
              <Input
                name="life_insurance_deduction"
                value={salary.life_insurance_deduction}
                onChange={updateSalary}
              />
            </div>
          </div>

          <Btn className="bg-teal-500 hover:bg-teal-600" onClick={createSalary}>
            Submit
          </Btn>
        </Modal>
      )}
    </>
  );
};

export default SalariesDataTable;
