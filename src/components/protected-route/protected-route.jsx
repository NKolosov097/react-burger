import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Protected({ onlyUnAuth = false, component }) {
    const isAuth = useSelector((store) => store.authReducer.isAuth)
    const user = useSelector((store) => store.authReducer.user)
    const location = useLocation()

    if (!isAuth) {
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
export function OnlyUnAuth({ component }) {
    return <Protected onlyUnAuth component={component} />
}
