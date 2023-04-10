import { useState } from 'react'
import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import resetPasswordStyles from './reset-password.module.css'
import { passwordReset } from '../../../services/actions/auth-action'

export function ResetPassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const [token, setToken] = useState('')
    const onChangeCode = (e) => {
        setToken(e.target.value)
    }

    const handleSubmit = () => {
        dispatch(
            passwordReset(password, token).then(() => {
                localStorage.removeItem('correctEmail')
                navigate('/login')
            })
        )
    }

    if (!localStorage.getItem('correctEmail')) {
        return <Navigate to="/" />
    }

    return (
        <section className={resetPasswordStyles.wrapper}>
            <form
                onSubmit={handleSubmit}
                className={resetPasswordStyles.container}
            >
                <h1 className={cn(resetPasswordStyles.header, 'mb-6')}>
                    Восстановление пароля
                </h1>
                <PasswordInput
                    onChange={onChangePassword}
                    value={password}
                    placeholder="Введите новый пароль"
                    name=""
                    extraClass="mb-6"
                />
                <Input
                    onChange={onChangeCode}
                    placeholder="Введите код из письма"
                    type="text"
                    value={token}
                    extraClass="mb-6"
                />
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    extraClass="mb-20"
                >
                    Сохранить
                </Button>
                <h2 className={cn(resetPasswordStyles.someProblem, 'mb-4')}>
                    Вспомнили пароль?
                    <Link className={resetPasswordStyles.link} to="/login">
                        Войти
                    </Link>
                </h2>
            </form>
        </section>
    )
}
