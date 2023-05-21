import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useMatch } from 'react-router-dom'
import cn from 'classnames'
import React, { ReactElement } from 'react'
import headerStyles from './app-header.module.css'
import { paths } from '../../utils/routes/routes'

export const AppHeader = React.memo((): ReactElement => {
    const isHome = !!useMatch<string, string>(paths.homePage)
    const isProfile = !!useMatch<string, string>(paths.profile)
    const isOrders = !!useMatch<string, string>(paths.orders)
    const isFeed = !!useMatch<string, string>(paths.feed)

    return (
        <header className="p-4 mb-4">
            <menu className={headerStyles.menu}>
                <li className={headerStyles.menu_item}>
                    <NavLink
                        to={paths.homePage}
                        className={headerStyles.menu_item_content}
                        title="Go to constructor page"
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
                        to={paths.feed}
                        className={headerStyles.menu_item_content}
                        title="Go to orders page"
                    >
                        <ListIcon type={isFeed ? 'primary' : 'secondary'} />
                        <span
                            className={cn(
                                'text text_type_main-default p-2 pt-3',
                                isFeed
                                    ? headerStyles.active
                                    : 'text_color_inactive'
                            )}
                        >
                            Лента заказов
                        </span>
                    </NavLink>
                </li>
                <li
                    className={headerStyles.logo}
                    title="Go to constructor page"
                >
                    <NavLink className="mt-2" to={paths.homePage}>
                        <Logo />
                    </NavLink>
                </li>
                <li className={headerStyles.menu_item}>
                    <NavLink
                        to={paths.profile}
                        className={headerStyles.menu_item_content}
                        title="Go to profile"
                    >
                        <ProfileIcon
                            type={
                                isProfile || isOrders ? 'primary' : 'secondary'
                            }
                        />
                        <span
                            className={cn(
                                'text text_type_main-default p-2 pt-3',
                                isProfile || isOrders
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
