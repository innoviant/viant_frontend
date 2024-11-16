import React, {useRef, useState} from 'react';
import {URLs} from "../__data__/URLs";
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

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

  return (
      <div className="innoviant-wrapper">
        <div className="form-box login">
                <h2>Вход</h2>
                <form action="#">
                    <div className="input-box">
                        <span className="icon">
                            <IonIcon icon={mailOutline} />
                        </span>
                        <input type="email" ref={emailRef} required/>
                        <label>Корпоративная почта</label>
                    </div>
                    <div className="input-box">
                        <span className="icon">
                            <IonIcon icon={lockClosedOutline} />
                        </span>
                        <input type="password" ref={passwordRef} required/>
                        <label>Пароль</label>
                    </div>
                    <div style={{justifyContent: 'center'}}><a href="#" >Забыли пароль?</a></div>
                    <button type="submit" className="btn" onClick={() => {}}>Войти</button>
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
