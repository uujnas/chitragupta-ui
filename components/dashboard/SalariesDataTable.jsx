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
  const [errors, setErrors] = useState({});

  const dataFormatter = new Jsona();
  const creatingNewSalary = () => setCreateNewSalary(true);
  const numberRegEx = /^\d+.?\d*$/;

  const updateSalary = (e) => {
    delete errors[e.target.name];
    if (!e.target.value.match(numberRegEx))
      setErrors({ ...errors, [e.target.name]: "Must be a number." });
    setSalary({ ...salary, [e.target.name]: e.target.value });
  };

  // this is required because if we submit empty form we are getting error but status is stil 200:OK
  const checkIfFormIsValid = () => {
    let errorCount = 0;
    [
      "basic_salary",
      "commitment_bonus",
      "allowance",
      "festival_bonus",
      "monthly_dispatch",
    ].forEach((field) => {
      if (salary[field] === undefined) {
        errorCount += 1;
        setErrors({ ...errors, [field]: "Can't be blank." });
      } else if (!String(salary[field]).match(numberRegEx)) {
        errorCount += 1;
        setErrors({ ...errors, [field]: "Must be a number." });
      }
    });

    return errorCount;
  };

  const createSalary = async () => {
    if (checkIfFormIsValid() === 0) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/salaries.json`,
          {
            salary,
          },
          {
            headers: {
              Authorization: localStorage.token,
            },
          }
        );

        if (response.statusText === "OK") {
          setSalaries([dataFormatter.deserialize(response.data), ...salaries]);
          setCreateNewSalary(false);
          setSalary({});
        }
      } catch (error) {
        console.log(error);
      }
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
                className={errors.basic_salary ? "border-red-500" : ""}
              />
              {errors.basic_salary && (
                <span className="text-sm text-red-500">
                  {errors.basic_salary}
                </span>
              )}
            </div>
            <div className="md:w-1/2">
              <Label>Commitment Bonus</Label>
              <Input
                name="commitment_bonus"
                value={salary.commitment_bonus || ""}
                onChange={updateSalary}
                className={errors.commitment_bonus ? "border-red-500" : ""}
              />
              {errors.commitment_bonus && (
                <span className="text-sm text-red-500">
                  {errors.commitment_bonus}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <div className="pr-4 md:w-1/2">
              <Label>Allowance</Label>
              <Input
                name="allowance"
                value={salary.allowance || ""}
                onChange={updateSalary}
                className={errors.allowance ? "border-red-500" : ""}
              />
              {errors.allowance && (
                <span className="text-sm text-red-500">{errors.allowance}</span>
              )}
            </div>
            <div className="md:w-1/2">
              <Label>Festival Bonus</Label>
              <Input
                name="festival_bonus"
                value={salary.festival_bonus || ""}
                onChange={updateSalary}
                className={errors.festival_bonus ? "border-red-500" : ""}
              />
              {errors.festival_bonus && (
                <span className="text-sm text-red-500">
                  {errors.festival_bonus}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <div className="pr-4 md:w-1/2">
              <Label>Income Tax</Label>
              <Input
                name="income_tax"
                value={salary.income_tax || ""}
                onChange={updateSalary}
                className={errors.income_tax ? "border-red-500" : ""}
              />
              {errors.income_tax && (
                <span className="text-sm text-red-500">
                  {errors.income_tax}
                </span>
              )}
            </div>
            <div className="md:w-1/2">
              <Label>Net CTC</Label>
              <Input
                name="net_ctc"
                value={salary.net_ctc}
                onChange={updateSalary}
                className={errors.net_ctc ? "border-red-500" : ""}
              />
              {errors.net_ctc && (
                <span className="text-sm text-red-500">{errors.net_ctc}</span>
              )}
            </div>
          </div>

          <div className="flex">
            <div className="pr-4 md:w-1/2">
              <Label>Cash In Hand</Label>
              <Input
                name="cash_in_hand"
                value={salary.cash_in_hand}
                onChange={updateSalary}
                className={errors.cash_in_hand ? "border-red-500" : ""}
              />
              {errors.cash_in_hand && (
                <span className="text-sm text-red-500">
                  {errors.cash_in_hand}
                </span>
              )}
            </div>
            <div className="md:w-1/2">
              <Label>Monthly Dispatch</Label>
              <Input
                name="monthly_dispatch"
                value={salary.monthly_dispatch}
                onChange={updateSalary}
                className={errors.monthly_dispatch ? "border-red-500" : ""}
              />
              {errors.monthly_dispatch && (
                <span className="text-sm text-red-500">
                  {errors.monthly_dispatch}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <div className="w-full pr-4">
              <Label>Life Insurance Deduction</Label>
              <Input
                name="life_insurance_deduction"
                value={salary.life_insurance_deduction}
                onChange={updateSalary}
                className={errors.life_insurance_deduction ? "border-red-500" : ""}
              />
              {errors.life_insurance_deduction && (
                <span className="text-sm text-red-500">
                  {errors.life_insurance_deduction}
                </span>
              )}
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
