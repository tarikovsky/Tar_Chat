import React, { useContext, useState } from 'react'
import { Context } from '..';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider, getRedirectResult, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    //наш пользователь
    const { auth } = useContext(Context);

    //авторизация с помощью гугла с помощью firebase
    const googleLogin = async () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    }


    return (
        <div className='container' >
            <div className="form_auth_block">
                <div className="form_auth_block_content">
                    <img src='/img/logo3.svg' alt='logo' />
                    <p className="form_auth_block_head_text">Вход в ТарЧат</p>
                    <button className="form_auth_button" type="submit" name="form_auth_submit">Войти</button>
                    <img onClick={googleLogin} className="google_button" src='/img/google.png' alt='google' ></img>
                </div>
            </div>

        </div>
    )
}

export default Login;