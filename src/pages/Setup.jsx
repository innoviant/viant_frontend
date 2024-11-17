import React, { useState } from "react";
import { URLs } from "../__data__/URLs";
import "./css/setup.css";
import { displayMessage } from "../notifications/notifications.js";
import { MessageType } from "../notifications/message.tsx";

const MAX_VISIBLE_ENTRIES = 5;

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
      displayMessage(
        "Необходимо выбрать кандидата и работника",
        MessageType.WARN
      );
      return;
    }

    localStorage.setItem("cand_setup_name", candidates[selectedCandidate].name);
    localStorage.setItem(
      "cand_setup_birth",
      candidates[selectedCandidate].birthdate
    );

    localStorage.setItem("emp_setup_name", employees[selectedEmp].name);
    localStorage.setItem("emp_setup_birth", employees[selectedEmp].birthdate);

    window.location.href = URLs.compat;
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

  const scrollToSelectedEmployee = (index) => {
    const element = document.querySelector(
      `.employee-card:nth-child(${index + 1})`
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const handleEmployeeClick = (index) => {
    setSelectedEmp(index);
    scrollToSelectedEmployee(index);
  };

  const handleCandidateClick = (index) => {
    setSelectedCandidate(index);
    const element = document.querySelector(
      `.candidate-card:nth-child(${index + 1})`
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <div className="innoviant-wrapper innos-wrapper">
      <h1 className="title">Настройка совместимости</h1>
      <div className="sections-wrapper">
        <div className="section">
          <h2 className="section-title">Список Сотрудников</h2>
          <div className="scrollable-list">
            {employees.length <= MAX_VISIBLE_ENTRIES ? (
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
                      onClick={() => handleEmployeeClick(index)}
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
            ) : (
              employees.map((employee, index) => (
                <div
                  className={`employee-card ${
                    index === selectedEmp ? "selected-card" : ""
                  }`}
                  key={index}
                  onClick={() => handleEmployeeClick(index)}
                >
                  <span>{employee.name}</span>
                  <span>{employee.birthdate}</span>
                  <button
                    className="delete-button"
                    onClick={() => deleteEmployee(index)}
                  >
                    ❌
                  </button>
                </div>
              ))
            )}
          </div>
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
          <button className="action-button" onClick={addEmployee}>
            Добавить сотрудника
          </button>
        </div>

        <div className="section">
          <h2 className="section-title">Кандидат</h2>
          <div className="scrollable-list">
            {candidates.length <= MAX_VISIBLE_ENTRIES ? (
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
                      onClick={() => handleCandidateClick(index)}
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
            ) : (
              candidates.map((candidate, index) => (
                <div
                  className={`candidate-card ${
                    index === selectedCandidate ? "selected-card" : ""
                  }`}
                  key={index}
                  onClick={() => handleCandidateClick(index)}
                >
                  <span>{candidate.name}</span>
                  <span>{candidate.birthdate}</span>
                  <button
                    className="delete-button"
                    onClick={() => deleteCandidate(index)}
                  >
                    ❌
                  </button>
                </div>
              ))
            )}
          </div>
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
          <button className="action-button" onClick={addCandidate}>
            Добавить кандидата
          </button>
        </div>
      </div>
      <div className="compat-button-wrapper">
        <button className="compatibility-button" onClick={() => setUpInput()}>
          Узнать совместимость
        </button>
      </div>
    </div>
  );
};

export default Setup;
