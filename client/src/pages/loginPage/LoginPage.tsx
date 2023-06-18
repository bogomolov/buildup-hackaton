import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import {fetchSignInAction, fetchUserAction} from "src/store/user/user.actions";
import {AppDispatch} from "src/store/types";
import {useToken} from "src/store/user/user.selectors";

import './LoginPage.scss';
import {useHistory} from "react-router-dom";
import Button from "../../components/button/Button";

const LoginPage = () => {
    const token = useToken();

    const dispatch = useDispatch<AppDispatch>();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleClick = () => {
        dispatch(fetchSignInAction({email, password}));
    }

    useEffect(() => {
        if (token) {
            dispatch(fetchUserAction({token}));
            history.push('/map-page')
        }
    }, [token]);

    return (
        <div className={'login-page'}>
            <div className={'login-page__form-window'}>
                <div>
                    LOGO
                </div>
                <div className={'login-page__input-container'}>
                    <h3 className={'login-page__input-title'}>
                        Email
                    </h3>
                    <input className={'login-page__input'} value={email} onChange={changeEmail} type={'text'} placeholder={'Введите адрес почты'}/>
                </div>
                <div className={'login-page__input-container'}>
                    <h3 className={'login-page__input-title'}>
                        Пароль
                    </h3>
                    <input className={'login-page__input'} value={password} onChange={changePassword} type={'password'} placeholder={'Введите пароль'}/>
                </div>
                <Button handleClick={handleClick} title={'Отправить'} />
            </div>
        </div>
    );
};

export default LoginPage;
