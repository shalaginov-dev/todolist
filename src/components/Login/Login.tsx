import React from "react";
import {IFormData, LoginReduxForm} from "./LoginForm";
import s from './LoginForm.module.css'
import {LogIn} from "../../state/actions/auth-actions";
import {useDispatch} from "react-redux";


export const Login = () => {
    const dispatch = useDispatch()
    const onSubmit = (formData: IFormData) => {
        dispatch(LogIn(formData.email, formData.password, formData.rememberMe))
    }

    return (
        <div className={s.loginBlock}>
            <h1>ACCOUNT LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}