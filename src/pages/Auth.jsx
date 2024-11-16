import React, {useRef, useState} from 'react';
import {URLs} from "../__data__/URLs";
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import {post} from "../backend/api";
import {displayMessage} from "../notifications/notifications";
import {MessageType} from "../notifications/message.tsx";

const Auth = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [emailRef, setEmail] = useState(null);
  const [passwordRef, setPassword] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const testEmail = email => {
    if (emailRegex.test(email)) {
      setIsValid(true);
    } else {
      setIsValid(false);
      setEmail(email);
    }
  };

  const login = () => {
    const body = {
        username: emailRef,
        password: passwordRef,
    }

    post("/auth/login", body).then(response => {
        if (!response.ok) {
            displayMessage(response.data, MessageType.ERROR);
            return;
        }

        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("token_type", response.data.token_type);

        console.log("logged in");
    })
  }

  return (
      <div className="innoviant-wrapper">
        <div className="form-box login">
                <h2>Вход</h2>
                <form action="#">
                    <div className="input-box">
                        <span className="icon">
                            <IonIcon icon={mailOutline} />
                        </span>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} required/>
                        <label>Корпоративная почта</label>
                    </div>
                    <div className="input-box">
                        <span className="icon">
                            <IonIcon icon={lockClosedOutline} />
                        </span>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} required/>
                        <label>Пароль</label>
                    </div>
                    <div style={{justifyContent: 'center'}}><a href="#" >Забыли пароль?</a></div>
                    <button type="submit" className="btn" onClick={() => {login()}}>Войти</button>
                    <div className="login-register">
                        <p>Нет аккаунта?<br/>
                            <a href={URLs.reg}>Зарегистрироваться</a>
                        </p>
                    </div>
                </form>
            </div>
          <a href={URLs.home}>Back</a>
      </div>
  );
};

export default Auth;
