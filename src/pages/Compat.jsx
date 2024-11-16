import React from 'react';
import Tarot from "../components/compat/Tarot.jsx";

const Compat = () => {
    // TODO: get this info from local storage
    const candidate = {
        name: "Иван Сидоров",
        birth: new Date('01-01-2001')
    };
    const emp = {
        name: "Пётр Сергеев",
        birth: new Date('02-02-2002')
    };

    // TODO: calculate Tarot cards from birth
    const calculate_tarot = (birth) => {
        if (birth.getDate() === 1) {
            return [5, 7, 12];
        } else {
            return [19, 2, 4];
        }
    }


    const tarot_emp = calculate_tarot(emp.birth);
    const tarot_candidate = calculate_tarot(candidate.birth);

  return (
      <div className="innoviant-wrapper">
          <h1 className="compat-title">Анализ совместимости</h1>

          <Tarot role={"Кандидат"} name={candidate.name} tarot={tarot_candidate} />
          <Tarot role={"Работник"} name={emp.name} tarot={tarot_emp} />
      </div>
  );
};

export default Compat;
