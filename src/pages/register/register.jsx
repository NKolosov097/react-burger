import { useState } from 'react'
import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import registerStyles from './register.module.css'
import { registerAction } from '../../services/actions/auth-action'

export function Register() {
    const dispatch = useDispatch()

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registerAction(form.email, form.password, form.name))
    }

    return (
        <section className={registerStyles.wrapper}>
            <form onSubmit={handleSubmit} className={registerStyles.container}>
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
                            registerAction(form.email, form.password, form.name)
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
}
