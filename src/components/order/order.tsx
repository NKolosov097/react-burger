import { ReactElement, useMemo } from 'react'
import { v4 as uuid } from 'uuid'
import {
    CurrencyIcon,
    FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Location, NavLink } from 'react-router-dom'
import cn from 'classnames'
import orderStyles from './order.module.css'

import { useDispatch, useSelector } from '../../store'
import { IFeed, IIngredient } from '../../utils/types'
import { paths } from '../../utils/routes/routes'
import { ORDER_INFO_OPEN } from '../../services/actions/order-info-action'
import { Overlay } from './overlay-for-image-ingredient/overlay'

type OrderProps = {
    order: IFeed
    ordersPage: boolean
    location: Location
}

export function Order({
    order,
    ordersPage,
    location,
}: OrderProps): ReactElement {
    const dispatch = useDispatch()
    const { ingredients } = useSelector((store) => store.ingredientsReducer)

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

    const ordersOfIngredients = useMemo(
        () =>
            order.ingredients
                .map((id) =>
                    ingredients.find((item: IIngredient) => item._id === id)
                )
                .filter((ingredient) => ingredient),
        [order, ingredients]
    )

    const uniqueIngredients = useMemo(
        () =>
            Array.from(
                new Set<IIngredient>(ordersOfIngredients as IIngredient[])
            ),
        [ordersOfIngredients]
    )

    const totalPrice = useMemo(
        () =>
            ordersOfIngredients.reduce(
                (acc, ingredient) => acc + Number(ingredient?.price),
                0
            ),
        [ordersOfIngredients]
    )

    const getDate = () => {
        const date = order.createdAt
        return <FormattedDate date={new Date(date)} />
    }

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
                        ? { pathname: `${paths.orders}/${order._id}` }
                        : { pathname: `${paths.feed}/${order._id}` }
                }
                state={{ background: location }}
                onClick={() => dispatch({ type: ORDER_INFO_OPEN })}
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
                        {uniqueIngredients.map((item, index) => {
                            if (index < 5)
                                return (
                                    <li
                                        key={uuid()}
                                        className={orderStyles.ingredientEl}
                                    >
                                        <img
                                            src={item.image}
                                            alt=""
                                            width={110}
                                        />
                                    </li>
                                )
                            if (index === 5)
                                return (
                                    <Overlay
                                        key={item.ID}
                                        countOfIngredients={
                                            ordersOfIngredients.length
                                        }
                                    >
                                        <li
                                            key={uuid()}
                                            className={orderStyles.ingredientEl}
                                        >
                                            <img
                                                src={item.image}
                                                alt=""
                                                width={110}
                                            />
                                        </li>
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
