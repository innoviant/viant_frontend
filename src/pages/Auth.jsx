import React, {useRef, useState} from 'react';
import {URLs} from "../__data__/URLs";
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import {post} from "../backend/api";
import {displayMessage} from "../notifications/notifications";
import {MessageType} from "../notifications/message.tsx";

const Auth = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [emailRef, setEmail] = useState("");
  const [passwordRef, setPassword] = useState("");
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
        grant_type: 'password'
    }

    post("/auth/login", body, false).then(response => {
        if (!response.ok) {
            displayMessage(response.data, MessageType.ERROR);
            return;
        }

        console.log("at:", response.data.access_token);

        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("token_type", response.data.token_type);

        console.log("logged in");

        window.location.href = URLs.home;
    })
  }

  const forgotPassword = () => {
    const info = {
      email: emailRef
    }

    // post("/auth/forgot-password", info).then(response => {
    //   if (!response.ok) {
    //     displayMessage(response.data, MessageType.ERROR);
    //     return;
    //   }
    //   else if (emailRef !== '') {
    //     setPassword(response.data);
    //   }
    // })
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
                        <input type="text" onChange={(e) => setPassword(e.target.value)} required value={passwordRef}/>
                        <label>Пароль</label>
                    </div>
                    <div className="button-forgot-pass"><button onClick={() => forgotPassword()}>Забыли пароль?</button></div>
                    <button type="submit" className="btn" onClick={(e) => {
                        e.preventDefault();
                        login();
                    }}>Войти</button>
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
