import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css'
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';
const Login = () => {
    const [state, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(res => {
            dispatch({
                type: actionTypes.SET_USER,
                user: res.user,
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <div className="login">
            <div className="login_logo">
                <img src="https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png" alt="logo" />
                <h1 >Facebook 2.O</h1>
            </div>
            <Button type='submit' onClick={signIn}>
                LogIn
            </Button>
        </div>
    );
};

export default Login;