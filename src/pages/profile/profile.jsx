import { useState, useEffect } from 'react'
import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import profileStyles from './profile.module.css'
import {
    logoutRequest,
    patchUserInfo,
} from '../../services/actions/auth-action'

export function Profile() {
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.authReducer)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    useEffect(() => {
        setForm({
            email: user.email,
            name: user.name,
            password: '',
        })
    }, [user.email, user.name])

    const resetForms = () => {
        setForm({
            email: user.email,
            name: user.name,
            password: '',
        })
    }

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // dispatch(patchUserInfo(form.email, form.password, form.name))
    }
    return (
        <section className={profileStyles.wrapper}>
            <div className={profileStyles.container}>
                <aside className={profileStyles.asideWrapper}>
                    <ul className={cn(profileStyles.asideList, 'mb-20')}>
                        <li
                            className={cn(
                                profileStyles.asideItem,
                                profileStyles.active
                            )}
                        >
                            <Link
                                className={cn(
                                    profileStyles.asideItem,
                                    profileStyles.active
                                )}
                                to="/profile"
                            >
                                Профиль
                            </Link>
                        </li>
                        <li className={profileStyles.asideItem}>
                            <Link
                                className={profileStyles.asideItem}
                                to="orders"
                            >
                                История заказа
                            </Link>
                        </li>
                        <li className={profileStyles.asideItem}>
                            <Link
                                className={profileStyles.asideItem}
                                to="/login"
                                onClick={() => dispatch(logoutRequest())}
                            >
                                Выход
                            </Link>
                        </li>
                    </ul>
                    <p className={profileStyles.p}>
                        В этом разделе вы можете изменить свои персональные
                        данные
                    </p>
                </aside>
                <form onSubmit={onSubmit}>
                    <Input
                        onChange={onChange}
                        placeholder="Имя"
                        name="name"
                        type="text"
                        value={form.name}
                        icon="EditIcon"
                        extraClass={cn('mb-6', profileStyles.input)}
                    />
                    <EmailInput
                        onChange={onChange}
                        value={form.email}
                        name="email"
                        placeholder="email"
                        isIcon
                        extraClass="mb-6"
                    />
                    <PasswordInput
                        onChange={onChange}
                        value={form.password}
                        name="password"
                        placeholder="password"
                        icon="EditIcon"
                        extraClass="mb-6"
                    />

                    {(form.name === user.name &&
                        form.email === user.email &&
                        form.password?.length === 0) || (
                        <div className={profileStyles.changeInputsContainer}>
                            <Button
                                htmlType="button"
                                type="primary"
                                size="medium"
                                onClick={resetForms}
                            >
                                Отмена
                            </Button>
                            <Button
                                htmlType="button"
                                type="primary"
                                size="medium"
                                onClick={() =>
                                    dispatch(
                                        patchUserInfo(
                                            form.email,
                                            form.password,
                                            form.name
                                        )
                                    )
                                }
                            >
                                Сохранить
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        </section>
    )
}
