import { ReactElement, useMemo } from 'react'
import { useMatch, useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import {
    CurrencyIcon,
    FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'
import orderDetailsStyles from './order-info.module.css'
import { useSelector } from '../../../store'
import { paths } from '../../../utils/routes/routes'
import { IIngredient } from '../../../utils/types'
import { Ingredient } from '../ingredient/ingredient'

export function OrderInfo(): ReactElement {
    const { id } = useParams<{ id: string }>()
    const { ingredients } = useSelector((store) => store.ingredientsReducer)

    const isOrders = !!useMatch<string, string>(
        `${paths.orders}${paths.orderDetails}`
    )

    const feedOrders = useSelector((store) => store.wsReducer.orders)
    const profileOrders = useSelector((store) => store.wsAuthReducer.orders)

    const orders = isOrders ? profileOrders : feedOrders
    const order = orders.find((item) => item._id === id)

    let status: string = ''
    let stylesStatus = orderDetailsStyles.statusDone

    if (order?.status === 'done') {
        status = 'Выполнен'
        stylesStatus = orderDetailsStyles.statusDone
    } else if (order?.status === 'pending') {
        status = 'Готовится'
        stylesStatus = orderDetailsStyles.statusPending
    } else if (order?.status === 'created') {
        status = 'Создан'
        stylesStatus = orderDetailsStyles.statusCreated
    } else {
        status = 'Отменен'
        stylesStatus = orderDetailsStyles.statusError
    }

    const getDate = () => {
        const date = order?.createdAt
        return <FormattedDate key={uuid()} date={new Date(date as string)} />
    }

    const ordersOfIngredients = useMemo(
        () =>
            order?.ingredients
                .map((el) =>
                    ingredients.find((item: IIngredient) => item._id === el)
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

    uniqueIngredients.map((item) => {
        const count = ordersOfIngredients?.filter(
            (ingredient) => ingredient?._id === item._id
        ).length
        // eslint-disable-next-line no-param-reassign
        item.count = count
        return item
    })

    const totalPrice = useMemo(
        () =>
            ordersOfIngredients?.reduce(
                (acc, ingredient) => acc + Number(ingredient?.price),
                0
            ),
        [ordersOfIngredients]
    )

    return (
        <dialog className={orderDetailsStyles.wrapper}>
            <h2 className={orderDetailsStyles.number}>#{order?.number}</h2>
            <h1 className={orderDetailsStyles.name}>{order?.name}</h1>
            <h3 className={`${stylesStatus} ${orderDetailsStyles.status}`}>
                {status}
            </h3>
            <p className={orderDetailsStyles.constituent}>Состав:</p>
            <ul
                className={`${orderDetailsStyles.listOfOrders} pl-2 custom-scroll`}
            >
                {uniqueIngredients.map((item) => (
                    <Ingredient
                        key={item.ID}
                        image={item.image}
                        price={item.price}
                        name={item.name}
                        count={item.count}
                    />
                ))}
            </ul>
            <div className={orderDetailsStyles.timeAndTotal}>
                <div className={orderDetailsStyles.createdAt}>{getDate()}</div>
                <div className={orderDetailsStyles.totalPrice}>
                    <span>{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </dialog>
    )
}
