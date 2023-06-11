import { ReactElement, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { AnimatePresence, motion } from 'framer-motion'
import stylesFeed from './feed.module.css'
import { useDispatch, useSelector } from '../../store'
import { OrdersBoard } from '../../components/orders-board/orders-board'
import { IFeed } from '../../utils/types'
import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_START,
} from '../../services/actions/WS-action'
import { Order } from '../../components/order/order'
import { EmptyItem } from '../../components/empty-item/empty-item'

export function Feed(): ReactElement {
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START })
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSE })
        }
    }, [dispatch])

    const { orders, total, totalToday } = useSelector(
        (store) => store.wsReducer
    )

    const emptyOrders = [
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
        {
            id: 4,
        },
        {
            id: 5,
        },
    ]

    const doneOrders: Array<IFeed> = []
    const pendingOrders: Array<IFeed> = []

    orders.forEach((order) => {
        if (order.status === 'done') doneOrders.push(order)
        if (order.status === 'pending') pendingOrders.push(order)
    })

    return (
        <section className={stylesFeed.container}>
            <AnimatePresence>
                <motion.h2
                    key="burger-constructor"
                    initial={{ y: '-180%' }}
                    animate={{ y: '0', transition: { duration: 0.45 } }}
                    exit={{ y: '+100%', transition: { duration: 0.15 } }}
                    transition={{ type: 'ease-in-out' }}
                    className={`${stylesFeed.text} text text_type_main-large pt-10 pb-5`}
                >
                    Лента заказов
                </motion.h2>
            </AnimatePresence>

            <AnimatePresence>
                <motion.ul
                    key="feed-list"
                    initial={{ x: '-100%' }}
                    animate={{ x: '0', transition: { duration: 0.45 } }}
                    exit={{ x: '+100%', transition: { duration: 0.15 } }}
                    transition={{ type: 'ease-in-out' }}
                    className={`${stylesFeed.orders} pr-2 custom-scroll`}
                >
                    {orders.length > 0
                        ? orders.map((order) => (
                              <Order
                                  key={uuid()}
                                  order={order}
                                  ordersPage={false}
                                  location={location}
                              />
                          ))
                        : emptyOrders.map((order) => (
                              <EmptyItem isFeed key={order.id} />
                          ))}
                </motion.ul>
            </AnimatePresence>

            <AnimatePresence>
                <motion.section
                    key="orders-board-wrapper"
                    initial={{ x: '+100%' }}
                    animate={{ x: '0', transition: { duration: 0.45 } }}
                    exit={{ x: '-100%', transition: { duration: 0.15 } }}
                    transition={{ type: 'ease-in-out' }}
                    className={stylesFeed.ordersBoardContainer}
                >
                    <OrdersBoard
                        doneOrders={doneOrders.slice(0, 10)}
                        pendingOrders={pendingOrders.slice(0, 10)}
                        total={total}
                        totalToday={totalToday}
                    />
                </motion.section>
            </AnimatePresence>
        </section>
    )
}
