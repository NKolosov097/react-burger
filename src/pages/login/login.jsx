import { useState } from 'react'
import {
    Button,
    EmailInput,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import loginStyles from './login.module.css'
import { loginAction } from '../../services/actions/auth-action'

export function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginAction(form.email, form.password)).then(() => {
            navigate('/login')
        })
    }

    return (
        <section className={loginStyles.wrapper}>
            <form onSubmit={handleSubmit} className={loginStyles.container}>
                <h1 className={cn(loginStyles.header, 'mb-6')}>Вход</h1>
                <EmailInput
                    onChange={onChange}
                    value={form.email}
                    name="email"
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={onChange}
                    value={form.password}
                    name="password"
                    extraClass="mb-6"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass="mb-20"
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
            </form>
        </section>
    )
}
