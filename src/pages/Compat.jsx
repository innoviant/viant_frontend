import React, {useEffect, useState} from 'react';
import Tarot from "../components/compat/Tarot.jsx";
import FateMatrix from "../components/compat/FateMatrix.jsx";
import {tarot_map} from "../__data__/Tarot_map";
import {post} from "../backend/api";
import {displayMessage} from "../notifications/notifications";
import {MessageType} from "../notifications/message.tsx";

const Compat = () => {
    function gen_to_html(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/#/g, "")
            .replace(/(\d\.)/g, '\n$1')
            .replace(/\n/g, "<br/>")
    }

    const setup = {
        candidate: {
            name: localStorage.getItem("cand_setup_name"),
            birth: localStorage.getItem("cand_setup_birth")
        },
        emp: {
            name: localStorage.getItem("emp_setup_name"),
            birth: localStorage.getItem("emp_setup_birth")
        },
    }

    const candidate = {
        name: setup.candidate.name ? setup.candidate.name : "",
        birth: setup.candidate.birth ? setup.candidate.birth : "01.01.2000"
    };
    const emp = {
        name: setup.emp.name ? setup.emp.name : "",
        birth: setup.emp.birth ? setup.emp.birth : "01.01.2000"
    };

    console.log('setup:', setup);
    console.log(candidate, emp);

    const [tarotInfo, setTarotInfo] = useState("");
    const [pythInfo, setPythInfo] = useState("");
    const [conclusion, setConclusion] = useState("");

    // calculate Tarot cards from birth
    const calculate_tarot = (birthData) => {
        const birth = new Date(birthData);

        const reduce_to_tarot = (num) => {
            while (num > 22) {
                num = num
                    .toString()
                    .split("")
                    .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
            }
            return num;
        };

        const day = birth.getDate();
        const month = birth.getMonth() + 1;
        const year = birth.getFullYear();

        const lifePathNumber = reduce_to_tarot(day);
        const soulCard = reduce_to_tarot(day + month + year);
        const personalityCard = reduce_to_tarot(day + month + year + soulCard);

        return [lifePathNumber, soulCard, personalityCard];
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

        post("/tarot", req_data).then((response) => {
            if (!response.ok) {
                displayMessage("Ошибка при анализе карт Таро:" + response.message, MessageType.ERROR);
                return;
            }

            setTarotInfo(gen_to_html(response.data.analysis));
        })
    }

    // TODO: get Pythagoras analysis
    const pyth_analysis = (pyth_1, pyth_2) => {
        const req_data = {
            first: pyth_1,
            second: pyth_2
        }

        // ... /fate_matrix

        setPythInfo("Согласно матрицам Пифагора, построенным для выбранных работника и кандидата, можно сказать...");

        concl_analysis(tarotInfo, "pythInfo");
    }

    // TODO: get results and suggestions
    const concl_analysis = (tarot_text, pyth_text) => {
        const req_data = {
            tarot: tarot_text,
            fate_matrix: pyth_text
        }

        // ... /concl

        setConclusion("Сотрудник и кандидат подходят друг другу, потому что...");
    }

    // TODO: calculate Pythagoras from birth
    const calculate_pyth = (birth) => {
        return [2, 1, 3, 0, 3, 2, 1, 4, 2];
    }

    const tarot_emp = calculate_tarot(emp.birth);
    const tarot_candidate = calculate_tarot(candidate.birth);

    const fate_emp = calculate_pyth(emp.birth);
    const fate_candidate = calculate_pyth(candidate.birth);

    useEffect(() => {
        tarot_analysis(tarot_candidate, tarot_emp);
    }, []);

    useEffect(() => {
        pyth_analysis(fate_candidate, fate_emp);
    }, []);

    useEffect(() => {
        if (tarotInfo && pythInfo) {
            concl_analysis(tarotInfo, pythInfo);
        }
    }, [tarotInfo, pythInfo]);

  return (
      <div className="innoviant-wrapper">
          <h1 className="compat-title">Анализ совместимости</h1>

          <Tarot role={"кандидата"} name={candidate.name} tarot={tarot_candidate}/>
          <Tarot role={"работника"} name={emp.name} tarot={tarot_emp}/>

          <h2>Анализ карт Таро</h2>
          <div className="analysis-wrapper">
              <div
                  dangerouslySetInnerHTML={{__html: gen_to_html(tarotInfo)}}
              />
          </div>

          <h2 className="pyth-title">Матрицы Пифагора</h2>
          <div className="fate-matrices-wrapper">
              <FateMatrix role={"кандидата"} name={candidate.name} fate={fate_candidate}/>
              <FateMatrix role={"сотрудника"} name={emp.name} fate={fate_emp}/>
          </div>

          <h2>Анализ матриц</h2>
          <div>{pythInfo}</div>

          <h1 className="compat-title conclusion-compat">Итог и рекомендации</h1>
          <div>{conclusion}</div>
      </div>
  );
};

export default Compat;
