import { ReactElement, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import stylesFeed from './feed.module.css'
import { useDispatch, useSelector } from '../../store'
import { OrdersBoard } from '../../components/orders-board/orders-board'
import { IFeed } from '../../utils/types'
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
} from '../../services/actions/WS-action'
import { Order } from '../../components/order/order'

export function Feed(): ReactElement {
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START })
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED })
        }
    }, [dispatch])

    const { orders, total, totalToday } = useSelector(
        (store) => store.wsReducer
    )

    const doneOrders: Array<IFeed> = []
    const pendingOrders: Array<IFeed> = []

    orders.forEach((order) => {
        if (order.status === 'done') doneOrders.push(order)
        if (order.status === 'pending') pendingOrders.push(order)
    })

    return (
        <section className={stylesFeed.container}>
            <h2
                className={`${stylesFeed.text} text text_type_main-large pt-10 pb-5`}
            >
                Лента заказов
            </h2>
            <ul className={`${stylesFeed.orders} pr-2 custom-scroll`}>
                {orders &&
                    orders.map((order) => (
                        <Order
                            key={order._id}
                            order={order}
                            ordersPage={false}
                            location={location}
                        />
                    ))}
            </ul>

            <OrdersBoard
                doneOrders={doneOrders.slice(0, 10)}
                pendingOrders={pendingOrders.slice(0, 10)}
                total={total}
                totalToday={totalToday}
            />
        </section>
    )
}
