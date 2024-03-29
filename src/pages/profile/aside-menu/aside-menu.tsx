import { ReactElement } from 'react'
import cn from 'classnames'
import { Link, useMatch, useNavigate } from 'react-router-dom'
import asideMenuStyles from './aside-menu.module.css'
import { paths } from '../../../utils/routes/routes'
import { useDispatch } from '../../../store'
import { logoutRequest } from '../../../services/actions/auth-action/auth-thunk'

export function ProfileAsideMenu(): ReactElement {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isProfile = !!useMatch<string, string>(paths.profile)
    const isOrders = !!useMatch<string, string>(paths.orders)

    const handleLogout = () => {
        dispatch(logoutRequest())
        navigate(paths.login)
    }

    return (
        <>
            <ul className={cn(asideMenuStyles.asideList)}>
                <li
                    className={cn(
                        asideMenuStyles.asideItem,
                        isProfile ? asideMenuStyles.active : ''
                    )}
                >
                    <Link
                        className={cn(
                            asideMenuStyles.asideItem,
                            isProfile ? asideMenuStyles.active : ''
                        )}
                        to={paths.profile}
                    >
                        Профиль
                    </Link>
                </li>
                <li
                    className={cn(
                        asideMenuStyles.asideItem,
                        isOrders ? asideMenuStyles.active : ''
                    )}
                >
                    <Link
                        className={cn(
                            asideMenuStyles.asideItem,
                            isOrders ? asideMenuStyles.active : ''
                        )}
                        to={paths.orders}
                    >
                        История заказа
                    </Link>
                </li>
                <li className={asideMenuStyles.asideItem}>
                    <Link
                        className={asideMenuStyles.asideItem}
                        to={paths.login}
                        onClick={handleLogout}
                    >
                        Выход
                    </Link>
                </li>
            </ul>
            <p className={asideMenuStyles.p}>
                В этом разделе вы можете изменить свои персональные данные
            </p>
        </>
    )
}
