import { Navigate, useLocation } from 'react-router-dom'
import { ReactElement } from 'react'
import { IUser } from '../../utils/types'
import { useSelector } from '../../store'

type TProtected = {
    onlyUnAuth?: boolean
    component: ReactElement
}

function Protected({ onlyUnAuth = false, component }: TProtected) {
    const isChecked: boolean = useSelector(
        (store) => store.authReducer.isChecked
    )
    const user: IUser | null = useSelector((store) => store.authReducer.user)
    const location = useLocation()

    if (!isChecked) {
        // Запрос еще выполняется
        return null // или прелоадер
    }

    if (onlyUnAuth && user) {
        // Пользователь авторизован, но запрос предназначен только для неавторизованных пользователей
        // Нужно сделать редирект на главную страницу или на тот адрес, что записан в location.state.from
        const { from } = location.state || { from: { pathname: '/' } }
        return <Navigate to={from} />
    }

    if (!onlyUnAuth && !user) {
        // Сервер не ответил
        return <Navigate to="/login" state={{ from: location }} />
    }

    // !onlyUnAuth && user

    return component
}

export const OnlyAuth = Protected
export function OnlyUnAuth({
    component,
}: {
    component: ReactElement
}): ReactElement {
    return <Protected onlyUnAuth component={component} />
}
