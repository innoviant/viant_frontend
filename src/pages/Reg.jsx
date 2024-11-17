import React, {useState, useRef, useEffect} from 'react';
import {IonIcon} from '@ionic/react';
import { mailOutline, personOutline, lockClosedOutline } from 'ionicons/icons';
import {URLs} from "../__data__/URLs";
import {post} from "../backend/api";
import {displayMessage} from "../notifications/notifications";
import {MessageType} from "../notifications/message.tsx";

const Reg = () => {

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef(null);
  const [initialWidth, setInitialWidth] = useState(0);

  useEffect(() => {
    if (inputRef.current) {
      const computedStyle = window.getComputedStyle(inputRef.current);
      setInitialWidth(parseInt(computedStyle.width)); // Получаем ширину из CSS
    }
  }, []);

  const inputStyle = {
    width: `${Math.max(initialWidth, username.length * 15)}px`,
    textTransform: 'capitalize',
    transition: 'width 0.01s ease'
  }

  const styles = {
    input: {
      padding: '10px',
      border: `1px solid ${isValid ? 'green' : 'red'}`,
      borderRadius: '4px',
      outline: 'none',
      marginBottom: '10px',
      width: '100%',
      boxSizing: 'border-box',
    },
    errorMessage: {
      color: 'red',
      fontSize: '0.8em',
      margin: 0,
    },
  };

  const sendRequest = async () => {
    const user = {
        email: email,
        password: password,
        is_active: true,
        is_superuser: false,
        is_verified: false,
        name: username
    };

    console.log("user for reg:", user);

    post("/auth/register", user).then(response => {
      if (!response.ok) {
        displayMessage(response.data, MessageType.ERROR);
        return;
      }

      console.log("registered");

      window.location.href = URLs.auth;
    })
  }


  const testEmail = email => {
    setEmail(email);

    if (emailRegex.test(email)) {
      setEmail(email);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
      <div className="innoviant-wrapper">
          <div className="form-box register">
          <h2>Регистрация</h2>
          <form>
            <div className="input-box">
              <span className="icon">
                <IonIcon icon={personOutline}/>
              </span>
              <input type="text" onChange={(e) => setUsername(e.target.value)} required
              style={inputStyle} ref={inputRef}/>
              <label>ФИО:</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <IonIcon icon={mailOutline}/>
              </span>
              <input type="email" onChange={(e) => testEmail(e.target.value)} required
              className={isValid ? 'valid' : 'invalid'}/>
              <label>Корпоративная почта: </label>
              {!isValid && <p style={styles.errorMessage}>Введите корректный email</p>}
            </div>
            <div className="input-box">
              <span className="icon">
                <IonIcon icon={lockClosedOutline}/>
              </span>
              <input type="text" onChange={(e) => setPassword(e.target.value)} required />
              <label>Пароль:</label>
            </div>
            <button type="submit" className="btn" onClick={(e) => {
              e.preventDefault();
              sendRequest().then();
            }}>Зарегистрироваться</button>
            <div className="login-register">
              <p>Уже есть аккаунт?<br/>
              <a href={URLs.auth}>Войти</a>
              </p>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Reg;
