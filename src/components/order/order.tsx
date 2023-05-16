import { ReactElement } from 'react'
import {
    CurrencyIcon,
    FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useLocation } from 'react-router-dom'
import cn from 'classnames'
import orderStyles from './order.module.css'
import { useSelector } from '../../store'
import { IFeed, IIngredient } from '../../utils/types'
import { paths } from '../../utils/routes/routes'
import { Ingredient } from './ingredientForOrder/ingredient'
import { Overlay } from './overlayForImageIngredient/overlay'
// import * as H from "history";

type OrderProps = {
    order: IFeed
    ordersPage: boolean
}

export function Order({ order, ordersPage }: OrderProps): ReactElement {
    const location = useLocation()
    // const state = location.state as { background?: H.Location }
    // const background = state && state.background

    const { ingredients } = useSelector((store) => store.ingredientsReducer)
    let totalPrice: number = 0
    let status: string = ''
    let stylesStatus = orderStyles.statusDone

    if (order.status === 'done') {
        status = 'Выполнен'
        stylesStatus = orderStyles.statusDone
    } else if (order.status === 'pending') {
        status = 'Готовится'
        stylesStatus = orderStyles.statusPending
    } else if (order.status === 'created') {
        status = 'Создан'
        stylesStatus = orderStyles.statusCreated
    } else {
        status = 'Отменен'
        stylesStatus = orderStyles.statusError
    }

    const imagesOfIngredients = order.ingredients.map((ingredient) => {
        const itemOfOrder = ingredients.find(
            (item: IIngredient) => item._id === ingredient
        )
        const { image, price, type } = itemOfOrder || {
            image: '',
            price: 0,
            type: '',
        }

        if (type === 'bun') totalPrice += 2 * price
        else totalPrice += price

        return <Ingredient image={image} />
    })

    const getDate = () => {
        const date = order.createdAt
        return <FormattedDate date={new Date(date)} />
    }

    const countOfIngredients = imagesOfIngredients.length

    return (
        <li
            className={cn(
                orderStyles.container,
                ordersPage ? orderStyles.containerOrderStyles : ''
            )}
        >
            <NavLink
                className={orderStyles.link}
                to={
                    ordersPage
                        ? { pathname: `${paths.orders}/:${order._id}` }
                        : { pathname: `${paths.feed}/:${order._id}` }
                }
                state={{ background: location }}
            >
                <div className={orderStyles.ID}>
                    <h2 className={orderStyles.numberOfOrder}>
                        #{order.number}
                    </h2>
                    <h2 className={orderStyles.createdAt}>{getDate()}</h2>
                </div>
                <h1 title={order.name} className={orderStyles.burgerName}>
                    {order.name}
                </h1>
                <h3 className={stylesStatus}>{status}</h3>
                <div className={orderStyles.ingredientsContainer}>
                    <ul className={orderStyles.ingredients}>
                        {imagesOfIngredients.map((item, index) => {
                            if (!ordersPage && index < 4) return item
                            if (ordersPage && index < 5) return item
                            if (!ordersPage && index === 4)
                                return (
                                    <Overlay
                                        key={item.key}
                                        countOfIngredients={countOfIngredients}
                                        ordersPage={ordersPage || false}
                                    >
                                        {item}
                                    </Overlay>
                                )
                            if (ordersPage && index === 5)
                                return (
                                    <Overlay
                                        key={item.key}
                                        countOfIngredients={countOfIngredients}
                                        ordersPage={ordersPage || false}
                                    >
                                        {item}
                                    </Overlay>
                                )
                            return null
                        })}
                    </ul>
                    <h4 className={orderStyles.price}>
                        <span>{totalPrice}</span>
                        <CurrencyIcon type="primary" />
                    </h4>
                </div>
            </NavLink>
        </li>
    )
}
