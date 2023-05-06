import { ReactElement } from 'react'
import cn from 'classnames'
import { Link, useMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import asideMenuStyles from './aside-menu.module.css'
import { logoutRequest } from '../../../services/actions/auth-action'
import { paths } from '../../../utils/routes/routes'

export function ProfileAsideMenu(): ReactElement {
    const dispatch = useDispatch()

    const isProfile = !!useMatch<string, string>(paths.profile)
    const isOrders = !!useMatch<string, string>(paths.orders)

    return (
        <aside className={asideMenuStyles.asideWrapper}>
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
                        onClick={() => logoutRequest()(dispatch)}
                    >
                        Выход
                    </Link>
                </li>
            </ul>
            <p className={asideMenuStyles.p}>
                В этом разделе вы можете изменить свои персональные данные
            </p>
        </aside>
    )
}
