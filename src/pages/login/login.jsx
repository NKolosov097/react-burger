import { useState } from 'react'
import {
    Button,
    EmailInput,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import loginStyles from './login.module.css'
import { loginAction } from '../../services/actions/auth-action'

export function Login() {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = useState('')
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <section className={loginStyles.wrapper}>
            <div className={loginStyles.container}>
                <h1 className={cn(loginStyles.header, 'mb-6')}>Вход</h1>
                <EmailInput
                    onChange={onChangeEmail}
                    value={email}
                    name="email"
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={onChangePassword}
                    value={password}
                    name="password"
                    extraClass="mb-6"
                />
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    extraClass="mb-20"
                    onClick={() => dispatch(loginAction(email, password))}
                >
                    Войти
                </Button>
                <h2 className={cn(loginStyles.someProblem, 'mb-4')}>
                    Вы - новый пользователь?
                    <Link className={loginStyles.link} to="/register">
                        Зарегистрироваться
                    </Link>
                </h2>
                <h2 className={cn(loginStyles.someProblem)}>
                    Забыли пароль?
                    <Link className={loginStyles.link} to="/forgot-password">
                        Восстановить пароль
                    </Link>
                </h2>
            </div>
        </section>
    )
}
