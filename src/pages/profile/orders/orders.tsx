import { ReactElement, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import stylesOrders from './orders.module.css'
import { ProfileAsideMenu } from '../aside-menu/aside-menu'
import { useDispatch, useSelector } from '../../../store'
import {
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_CONNECTION_START,
} from '../../../services/actions/WS-auth-action'
import { Order } from '../../../components/order/order'
import { getUserData } from '../../../services/actions/auth-action/auth-thunk'
import { EmptyItem } from '../../../components/empty-item/empty-item'

export function Orders(): ReactElement {
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserData())
        dispatch({ type: WS_AUTH_CONNECTION_START })
        return () => {
            dispatch({ type: WS_AUTH_CONNECTION_CLOSED })
        }
    }, [dispatch])

    const { orders } = useSelector((store) => store.wsAuthReducer)

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

    return (
        <section className={stylesOrders.wrapper}>
            <AnimatePresence>
                <motion.aside
                    key="orders-aside-menu"
                    initial={{ x: '-100%' }}
                    animate={{ x: '0', transition: { duration: 0.45 } }}
                    exit={{ x: '+100%', transition: { duration: 0.15 } }}
                    transition={{ type: 'ease-in-out' }}
                    className={stylesOrders.asideWrapper}
                >
                    <ProfileAsideMenu />
                </motion.aside>
            </AnimatePresence>

            <AnimatePresence>
                <motion.ul
                    key="orders-container"
                    initial={{ x: '+100%' }}
                    animate={{ x: '0', transition: { duration: 0.55 } }}
                    exit={{ x: '-100%', transition: { duration: 0.25 } }}
                    transition={{ type: 'ease-in-out' }}
                    className={`${stylesOrders.orders} pr-2 custom-scroll`}
                >
                    {orders.length > 0
                        ? orders
                              .map((order) => (
                                  <Order
                                      key={uuid()}
                                      order={order}
                                      ordersPage
                                      location={location}
                                  />
                              ))
                              .reverse()
                        : emptyOrders.map((order) => (
                              <EmptyItem isProfile key={order.id} />
                          ))}
                </motion.ul>
            </AnimatePresence>
        </section>
    )
}
