import React, { useState, FormEvent, ChangeEvent, ReactElement } from 'react'

import {
    Button,
    EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import forgotPasswordStyles from './forgot-password.module.css'
import { useDispatch } from '../../store'
import { passwordForgot } from '../../services/actions/auth-action/auth-thunk'

export const ForgotPassword = React.memo((): ReactElement => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('')
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        passwordForgot(email)(dispatch).then(() => {
            // @ts-ignore
            localStorage.setItem('correctEmail', true)
            navigate('/reset-password')
        })
    }

    return (
        <section className={forgotPasswordStyles.wrapper}>
            <form
                onSubmit={handleSubmit}
                className={forgotPasswordStyles.container}
            >
                <h1 className={cn(forgotPasswordStyles.header, 'mb-6')}>
                    Восстановление пароля
                </h1>
                <EmailInput
                    onChange={onChangeEmail}
                    value={email}
                    placeholder="Укажите e-mail"
                    name="email"
                    isIcon={false}
                    extraClass="mb-6"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass="mb-20"
                >
                    Восстановить
                </Button>
                <h2 className={cn(forgotPasswordStyles.someProblem, 'mb-4')}>
                    Вспомнили пароль?
                    <Link className={forgotPasswordStyles.link} to="/login">
                        Войти
                    </Link>
                </h2>
            </form>
        </section>
    )
})
