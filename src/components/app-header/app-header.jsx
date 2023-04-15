import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useMatch } from 'react-router-dom'
import cn from 'classnames'
import React from 'react'
import headerStyles from './app-header.module.css'
import { paths } from '../../routes/routes.ts'

export const AppHeader = React.memo(() => {
    const isHome = !!useMatch(paths.homePage)
    const isProfile = !!useMatch(paths.profile)
    const isOrders = !!useMatch(paths.orders)

    return (
        <header className="p-4 mb-4">
            <menu className={headerStyles.menu}>
                <li className={headerStyles.menu_item}>
                    <NavLink
                        to={paths.homePage}
                        className={headerStyles.menu_item_content}
                    >
                        <BurgerIcon type={isHome ? 'primary' : 'secondary'} />
                        <span
                            className={cn(
                                'text text_type_main-default p-2 pt-3',
                                isHome
                                    ? headerStyles.active
                                    : 'text_color_inactive'
                            )}
                        >
                            Конструктор
                        </span>
                    </NavLink>
                    <NavLink
                        to={paths.orders}
                        className={headerStyles.menu_item_content}
                    >
                        <ListIcon type={isOrders ? 'primary' : 'secondary'} />
                        <span
                            className={cn(
                                'text text_type_main-default p-2 pt-3',
                                isOrders
                                    ? headerStyles.active
                                    : 'text_color_inactive'
                            )}
                        >
                            Лента заказов
                        </span>
                    </NavLink>
                </li>
                <li className={headerStyles.logo}>
                    <NavLink to={paths.homePage}>
                        <Logo className="mt-2" />
                    </NavLink>
                </li>
                <li className={headerStyles.menu_item}>
                    <NavLink
                        to={paths.profile}
                        className={headerStyles.menu_item_content}
                    >
                        <ProfileIcon
                            type={isProfile ? 'primary' : 'secondary'}
                        />
                        <span
                            className={cn(
                                'text text_type_main-default p-2 pt-3',
                                isProfile
                                    ? headerStyles.active
                                    : 'text_color_inactive'
                            )}
                        >
                            Личный кабинет
                        </span>
                    </NavLink>
                </li>
            </menu>
        </header>
    )
})
