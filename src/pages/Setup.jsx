import React, { useState } from "react";
import { URLs } from "../__data__/URLs";
import "./css/setup.css";
import { displayMessage } from "../notifications/notifications.js";
import { MessageType } from "../notifications/message.tsx";

const Setup = () => {
  const [employees, setEmployees] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeBirthdate, setEmployeeBirthdate] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateBirthdate, setCandidateBirthdate] = useState("");

  const [selectedCandidate, setSelectedCandidate] = useState(-1);
  const [selectedEmp, setSelectedEmp] = useState(-1);

  const setError = (error) => {
    if (error) {
      displayMessage(error, MessageType.ERROR);
    }
  };

  const setUpInput = () => {
    if (selectedCandidate === -1 || selectedEmp === -1) {
      return;
    }

    localStorage.setItem("cand_setup", candidates[selectedCandidate]);
    localStorage.setItem("emp_setup", employees[selectedEmp]);
  };

  const validateDateOfBirth = (birthdate) => {
    const today = new Date();
    const enteredDate = new Date(birthdate);
    return enteredDate > today;
  };

  const addEmployee = () => {
    if (employeeName && employeeBirthdate) {
      if (validateDateOfBirth(employeeBirthdate)) {
        setError("Дата рождения не может быть в будущем.");
      } else {
        setEmployees([
          ...employees,
          { name: employeeName, birthdate: employeeBirthdate },
        ]);
        setEmployeeName("");
        setEmployeeBirthdate("");
        setError("");
      }
    }
  };

  const addCandidate = () => {
    if (candidateName && candidateBirthdate) {
      if (validateDateOfBirth(candidateBirthdate)) {
        setError("Дата рождения не может быть в будущем.");
      } else {
        setCandidates([
          ...candidates,
          { name: candidateName, birthdate: candidateBirthdate },
        ]);
        setCandidateName("");
        setCandidateBirthdate("");
        setError("");
      }
    }
  };

  const deleteEmployee = (index) => {
    const newEmployees = employees.filter((_, i) => i !== index);
    setEmployees(newEmployees);
  };

  const deleteCandidate = (index) => {
    const newCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(newCandidates);
  };

  return (
    <div className="innoviant-wrapper inno-wrapper">
      <h1 className="title">Настройка совместимости</h1>
      <div className="sections-wrapper">
        {}
        <div className="section">
          <h2 className="section-title">Список Сотрудников</h2>
          <table className="data-table">
            <thead>
              <tr className="custom-tr">
                <th className="custom-th">ФИО</th>
                <th className="custom-th">Дата рождения</th>
                <th className="custom-th"> </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr
                  className={`custom-tr ${
                    index === selectedEmp ? "selected-card" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    setSelectedEmp(index);
                  }}
                >
                  <td className="custom-td">{employee.name}</td>
                  <td className="custom-td">{employee.birthdate}</td>
                  <td className="custom-td">
                    <button
                      className="delete-button"
                      onClick={() => deleteEmployee(index)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <input
            className="input-field"
            type="text"
            placeholder="Напишите ФИО сотрудника"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
          <input
            className="input-field"
            type="date"
            placeholder="Дата рождения"
            value={employeeBirthdate}
            onChange={(e) => setEmployeeBirthdate(e.target.value)}
          />
          {/*{error && employeeBirthdate && (*/}
          {/*  <div className="error-message">{error}</div>*/}
          {/*)}*/}
          <button className="action-button" onClick={addEmployee}>
            Добавить сотрудника
          </button>
        </div>

        {}
        <div className="section">
          <h2 className="section-title">Кандидат</h2>
          <table className="data-table">
            <thead>
              <tr className="custom-tr">
                <th className="custom-th">ФИО</th>
                <th className="custom-th">Дата рождения</th>
                <th className="custom-th"> </th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr
                  className={`custom-tr ${
                    index === selectedCandidate ? "selected-card" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    setSelectedCandidate(index);
                  }}
                >
                  <td className="custom-td">{candidate.name}</td>
                  <td className="custom-td">{candidate.birthdate}</td>
                  <td className="custom-td">
                    <button
                      className="delete-button"
                      onClick={() => deleteCandidate(index)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <input
            className="input-field"
            type="text"
            placeholder="Напишите ФИО кандидата"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
          />
          <input
            className="input-field"
            type="date"
            placeholder="Дата рождения"
            value={candidateBirthdate}
            onChange={(e) => setCandidateBirthdate(e.target.value)}
          />
          {/*{error && candidateBirthdate && (*/}
          {/*  <div className="error-message">{error}</div>*/}
          {/*)}*/}
          <button className="action-button" onClick={addCandidate}>
            Добавить кандидата
          </button>
        </div>
      </div>
      <div className="compat-button-wrapper">
        <a href={URLs.compat}>
          <button className="compatibility-button" onClick={() => setUpInput()}>
            Узнать совместимость
          </button>
        </a>
      </div>
    </div>
  );
};

export default Setup;
