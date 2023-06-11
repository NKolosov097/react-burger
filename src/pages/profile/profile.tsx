import React, {
    useState,
    useEffect,
    ReactElement,
    ChangeEvent,
    FormEvent,
} from 'react'
import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import profileStyles from './profile.module.css'
import { ProfileAsideMenu } from './aside-menu/aside-menu'
import { useDispatch, useSelector } from '../../store'
import { patchUserInfo } from '../../services/actions/auth-action/auth-thunk'

type TForm = {
    name: string
    email: string
    password: string
}

export const Profile = React.memo((): ReactElement => {
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.authReducer)
    const [form, setForm] = useState<TForm>({
        name: '',
        email: '',
        password: '',
    })

    useEffect(() => {
        setForm({
            email: user?.email || '',
            name: user?.name || '',
            password: '',
        })
    }, [user?.email, user?.name])

    const resetForms = () => {
        setForm({
            email: user?.email || '',
            name: user?.email || '',
            password: '',
        })
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        const userData = {
            email: form.email,
            password: form.password,
            name: form.name,
        }
        patchUserInfo(userData)(dispatch)
    }
    return (
        <section className={profileStyles.wrapper}>
            <AnimatePresence>
                <motion.div
                    key="profile-aside-menu"
                    initial={{ x: '-100%' }}
                    animate={{ x: '0', transition: { duration: 0.45 } }}
                    exit={{ x: '+100%', transition: { duration: 0.15 } }}
                    transition={{ type: 'ease-in-out' }}
                    className={profileStyles.asideWrapper}
                >
                    <ProfileAsideMenu />
                </motion.div>
            </AnimatePresence>

            <AnimatePresence>
                <motion.div
                    key="profile-form-container"
                    initial={{ x: '+100%' }}
                    animate={{ x: '0', transition: { duration: 0.45 } }}
                    exit={{ x: '-100%', transition: { duration: 0.15 } }}
                    transition={{ type: 'ease-in-out' }}
                    className={profileStyles.container}
                >
                    <form onSubmit={onSubmit} autoComplete="on">
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

                        {(form.name === user?.name &&
                            form.email === user?.email &&
                            form.password?.length === 0) || (
                            <div
                                className={profileStyles.changeInputsContainer}
                            >
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
                                        patchUserInfo({
                                            email: form.email,
                                            password: form.password,
                                            name: form.name,
                                        })(dispatch)
                                    }
                                >
                                    Сохранить
                                </Button>
                            </div>
                        )}
                    </form>
                </motion.div>
            </AnimatePresence>
        </section>
    )
})
