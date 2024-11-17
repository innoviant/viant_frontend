import React, {useState, useEffect} from 'react';
import { URLs } from "../__data__/URLs";
import "./css/account.css";
import {get} from "../backend/api";
import {displayMessage} from "../notifications/notifications";
import {MessageType} from "../notifications/message.tsx";


const Account = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [history, setHistory] = useState([
    {
      "first": {
        "name": "Сысоев Гремислав Гавриилович",
        "birthdate": "08.04.1991"
      },
      "second": {
        "name": "Стоян Антипович Смирнов",
        "birthdate": "09.03.1975"
      }
    },
    {
      "first": {
        "name": "Самсонова Нина Максимовна",
        "birthdate": "11.05.1975"
      },
      "second": {
        "name": "Дмитриев Панфил Георгиевич",
        "birthdate": "23.09.1990"
      }
    },
    {
      "first": {
        "name": "Людмила Семеновна Суханова",
        "birthdate": "10.04.1974"
      },
      "second": {
        "name": "Кудрявцева Александра Валериевна",
        "birthdate": "15.09.1971"
      }
    },
    {
      "first": {
        "name": "Ипполит Васильевич Комиссаров",
        "birthdate": "24.05.1973"
      },
      "second": {
        "name": "Потапова Нинель Геннадиевна",
        "birthdate": "04.03.1990"
      }
    },
    {
      "first": {
        "name": "Лобанов Рубен Анисимович",
        "birthdate": "08.10.1973"
      },
      "second": {
        "name": "Ирина Натановна Федотова",
        "birthdate": "09.01.1974"
      }
    },
    {
      "first": {
        "name": "Майя Павловна Кудрявцева",
        "birthdate": "04.10.1994"
      },
      "second": {
        "name": "Анастасия Антоновна Селезнева",
        "birthdate": "02.09.1970"
      }
    },
    {
      "first": {
        "name": "Сергеев Эраст Ааронович",
        "birthdate": "09.06.1997"
      },
      "second": {
        "name": "Соловьева Октябрина Матвеевна",
        "birthdate": "20.11.1987"
      }
    },
    {
      "first": {
        "name": "Назарова Маргарита Архиповна",
        "birthdate": "21.08.1978"
      },
      "second": {
        "name": "Лаврентий Фокич Котов",
        "birthdate": "12.03.1995"
      }
    },
    {
      "first": {
        "name": "Наумова Евпраксия Владиславовна",
        "birthdate": "24.07.1983"
      },
      "second": {
        "name": "Спиридон Ефстафьевич Ершов",
        "birthdate": "20.04.1977"
      }
    },
    {
      "first": {
        "name": "Нинель Васильевна Гришина",
        "birthdate": "24.10.1976"
      },
      "second": {
        "name": "Марина Николаевна Гордеева",
        "birthdate": "15.03.1972"
      }
    }

  ]);

  useEffect(() => {

  }, [])

  const currentUser = async () => {
    get("/get_current_user").then(response => {
      if (!response.ok) {
        displayMessage(response.data, MessageType.ERROR);
        return;
      }

      setUserName((response.data.name).split(" ")[1])
      setEmail(response.data.email)
    })
  }

  const deleteNote = (index) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
  };

  return (
      <div className="innoviant-wrapper inno-wrapper">
          <h2 className="title">Добро пожаловать, {userName}</h2>
          <div className="sections-wrapper">
            <div className="section">
              <h2 className="section-title">История расчётов</h2>

              {history.map((record, index) => (
                  <table className="history-table">
                  <thead>
                <tr className="custom-tr" style={{height: '70px'}}>
                <th className="custom-th" colspan={5}>ФИО</th>
                <th className="custom-th" colspan={3}>Дата рождения</th>
                <th className="custom-th" colspan={1} style={{alignItems: 'end'}}>
                  <button
                      className="delete-button"
                      onClick={() => deleteNote(index)}
                    >
                      ❌
                    </button></th>
              </tr>
                </thead>
                <tbody>
                    <tr className="custom-tr" key={index}>
                      <td className="custom-td" colSpan={5}>{record.first.name}</td>
                      <td colspan={3}>{record.first.birthdate}</td>
                      <td colspan={1}></td>
                    </tr>
                    <tr className="custom-tr" key={index}>
                      <td className="custom-td" colSpan={5}>{record.second.name}</td>
                      <td colspan={3}>{record.second.birthdate}</td>
                      <td colspan={1}></td>
                    </tr>
            </tbody>
            </table>

             ))}

            </div>
          </div>
      </div>
  );
};

export default Account;
