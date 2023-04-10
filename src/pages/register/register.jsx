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

    const [name, setName] = useState('')
    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const [email, setEmail] = useState('')
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = useState('')
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    return (
        <section className={registerStyles.wrapper}>
            <div className={registerStyles.container}>
                <h1 className={cn(registerStyles.header, 'mb-6')}>
                    Регистрация
                </h1>
                <Input
                    onChange={onChangeName}
                    name="name"
                    placeholder="Имя"
                    type="text"
                    value={name}
                    extraClass="mb-6"
                />
                <EmailInput
                    onChange={onChangeEmail}
                    value={email}
                    name="email"
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
                    onClick={() =>
                        dispatch(registerAction(email, password, name))
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
            </div>
        </section>
    )
}
