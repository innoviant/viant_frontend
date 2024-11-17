import React from 'react';
import Tarot from "../components/compat/Tarot.jsx";
import FateMatrix from "../components/compat/FateMatrix.jsx";
import {tarot_map} from "../__data__/Tarot_map";

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
        return [1, 2, 3];
    }

    // TODO: get Tarot analysis
    const tarot_analysis = (tarot_1, tarot_2) => {
        const req_data = {
            first: [],
            second: []
        }

        tarot_1.forEach((item) => {
            req_data.first.push(tarot_map[item].en);
        })
        tarot_2.forEach((item) => {
            req_data.second.push(tarot_map[item].en);
        })

        // ... /tarot

        return "Согласно картам Таро, выпавшим работнику и кандидату, можно сказать..."
    }

    // TODO: get Pythagoras analysis
    const pyth_analysis = (pyth_1, pyth_2) => {
        const req_data = {
            first: pyth_1,
            second: pyth_2
        }

        // ... /fate_matrix

        return "Согласно матрицам Пифагора, построенным для выбранных работника и кандидата, можно сказать...";
    }

    // TODO: get results and suggestions
    const concl_analysis = (tarot_text, pyth_text) => {
        const req_data = {
            tarot: tarot_text,
            fate_matrix: pyth_text
        }

        // ... /concl

        return "Сотрудник и кандидат подходят друг другу, потому что...";
    }

    // TODO: calculate Pythagoras from birth
    const calculate_pyth = (birth) => {
        if (birth.getDate() === 1) {
            return [2, 1, 3, 0, 3, 2, 1, 4, 2];
        } else {
            return [1, 2, 4, 1, 0, 1, 3, 2, 1];
        }
    }

    const tarot_emp = calculate_tarot(emp.birth);
    const tarot_candidate = calculate_tarot(candidate.birth);

    const tarot_info = tarot_analysis(tarot_candidate, tarot_emp);

    const fate_emp = calculate_pyth(emp.birth);
    const fate_candidate = calculate_pyth(candidate.birth);

    const fate_info = pyth_analysis(fate_candidate, fate_emp);

    const conclusion = concl_analysis(tarot_info, fate_info);

  return (
      <div className="innoviant-wrapper">
          <h1 className="compat-title">Анализ совместимости</h1>

          <Tarot role={"кандидата"} name={candidate.name} tarot={tarot_candidate}/>
          <Tarot role={"работника"} name={emp.name} tarot={tarot_emp}/>

          <h2>Анализ карт Таро</h2>
          <div>{tarot_info}</div>

          <h2 className="pyth-title">Матрицы Пифагора</h2>
          <div className="fate-matrices-wrapper">
              <FateMatrix role={"кандидата"} name={candidate.name} fate={fate_candidate}/>
              <FateMatrix role={"сотрудника"} name={emp.name} fate={fate_emp}/>
          </div>

          <h2>Анализ матриц</h2>
          <div>{fate_info}</div>

          <h1 className="compat-title conclusion-compat">Итог и рекомендации</h1>
          <div>{conclusion}</div>
      </div>
  );
};

export default Compat;
