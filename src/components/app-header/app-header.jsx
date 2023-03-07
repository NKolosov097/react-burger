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
                    <div className={headerStyles.menu_item_content}>
                        <BurgerIcon type="primary" />
                        <span className="text text_type_main-default p-2">
                            Конструктор
                        </span>
                    </div>
                    <div className={headerStyles.menu_item_content}>
                        <ListIcon type="secondary" />
                        <span className="text text_type_main-default text_color_inactive p-2">
                            Лента заказов
                        </span>
                    </div>
                </li>
                <li className={headerStyles.logo}>
                    <Logo className="mt-2" />
                </li>
                <li className={headerStyles.menu_item}>
                    <div className={headerStyles.menu_item_content}>
                        <ProfileIcon type="secondary" />
                        <span className="text text_type_main-default text_color_inactive p-2">
                            Личный кабинет
                        </span>
                    </div>
                </li>
            </menu>
        </header>
    )
}
