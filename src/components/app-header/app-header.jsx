import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from './app-header.module.css'

export default function AppHeader() {
    return (
        <header className="p-4 mb-4">
            <menu className={headerStyles.menu}>
                <li className={headerStyles.menu_item}>
                    <a
                        onClick={(e) => e.preventDefault()}
                        href="/"
                        className={headerStyles.menu_item_content}
                    >
                        <BurgerIcon type="primary" />
                        <span className="text text_type_main-default p-2 pt-3">
                            Конструктор
                        </span>
                    </a>
                    <a
                        onClick={(e) => e.preventDefault()}
                        href="/"
                        className={headerStyles.menu_item_content}
                    >
                        <ListIcon type="secondary" />
                        <span className="text text_type_main-default text_color_inactive p-2 pt-3">
                            Лента заказов
                        </span>
                    </a>
                </li>
                <li className={headerStyles.logo}>
                    <a onClick={(e) => e.preventDefault()} href="/">
                        <Logo className="mt-2" />
                    </a>
                </li>
                <li className={headerStyles.menu_item}>
                    <a
                        onClick={(e) => e.preventDefault()}
                        href="/"
                        className={headerStyles.menu_item_content}
                    >
                        <ProfileIcon type="secondary" />
                        <span className="text text_type_main-default text_color_inactive p-2 pt-3">
                            Личный кабинет
                        </span>
                    </a>
                </li>
            </menu>
        </header>
    )
}
