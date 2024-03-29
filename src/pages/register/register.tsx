import React, { useState, ReactElement, ChangeEvent, FormEvent } from 'react'

import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import registerStyles from './register.module.css'
import { useDispatch } from '../../store'
import { registerAction } from '../../services/actions/auth-action/auth-thunk'

type TForm = {
    name: string
    email: string
    password: string
}

export const Register = React.memo((): ReactElement => {
    const dispatch = useDispatch()

    const [form, setForm] = useState<TForm>({
        name: '',
        email: '',
        password: '',
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(
            registerAction({
                email: form.email,
                password: form.password,
                name: form.name,
            })
        )
    }

    return (
        <section className={registerStyles.wrapper}>
            <form
                onSubmit={handleSubmit}
                autoComplete="on"
                className={registerStyles.container}
            >
                <h1 className={cn(registerStyles.header, 'mb-6')}>
                    Регистрация
                </h1>
                <Input
                    onChange={onChange}
                    name="name"
                    placeholder="Имя"
                    type="text"
                    value={form.name}
                    extraClass="mb-6"
                />
                <EmailInput
                    onChange={onChange}
                    value={form.email}
                    name="email"
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={onChange}
                    value={form.password}
                    name="password"
                    extraClass="mb-6"
                />
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    extraClass="mb-20"
                    onClick={() =>
                        dispatch(
                            registerAction({
                                email: form.email,
                                password: form.password,
                                name: form.name,
                            })
                        )
                    }
                >
                    Зарегистрироваться
                </Button>
                <h2 className={cn(registerStyles.someProblem, 'mb-4')}>
                    Уже зарегистрированы?
                    <Link className={registerStyles.link} to="/login">
                        Войти
                    </Link>
                </h2>
            </form>
        </section>
    )
})
