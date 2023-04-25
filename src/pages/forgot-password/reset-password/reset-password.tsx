import React, { useState, FormEvent, ChangeEvent, ReactElement } from 'react'
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

type TForm = {
    password: string
    token: string
}

export const ResetPassword = React.memo((): ReactElement => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [form, setForm] = useState<TForm>({
        password: '',
        token: '',
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        // @ts-ignore
        dispatch(passwordReset(form.password, form.token)).then(() => {
            localStorage.removeItem('correctEmail')
            navigate('/login')
        })
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
                    onChange={onChange}
                    value={form.password}
                    placeholder="Введите новый пароль"
                    name="password"
                    extraClass="mb-6"
                />
                <Input
                    onChange={onChange}
                    placeholder="Введите код из письма"
                    type="text"
                    name="token"
                    value={form.token}
                    extraClass="mb-6"
                />
                <Button
                    htmlType="submit"
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
})
