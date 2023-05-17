import { ReactElement, useEffect } from 'react'
import stylesOrders from './orders.module.css'
import { ProfileAsideMenu } from '../aside-menu/aside-menu'
import { useDispatch, useSelector } from '../../../store'
import {
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_CONNECTION_START,
} from '../../../services/actions/WS-auth-action'
import { Order } from '../../../components/order/order'
import { getUserData } from '../../../services/actions/auth-action/auth-thunk'

export function Orders(): ReactElement {
    const dispatch = useDispatch()

    useEffect(() => {
        getUserData()(dispatch)
        dispatch({ type: WS_AUTH_CONNECTION_START })
        return () => {
            dispatch({ type: WS_AUTH_CONNECTION_CLOSED })
        }
    }, [dispatch])

    const { orders } = useSelector((store) => store.wsAuthReducer)
    // const { orders } = useSelector((store) => store.wsReducer)
    console.log(orders)

    return (
        <section className={stylesOrders.wrapper}>
            <ProfileAsideMenu />
            {orders && orders.length > 0 ? (
                <ul className={`${stylesOrders.orders} pr-2 custom-scroll`}>
                    {orders &&
                        orders.map((order) => (
                            <Order key={order._id} order={order} ordersPage />
                        ))}
                </ul>
            ) : (
                <div className={stylesOrders.emptyOrders}>
                    Вы пока ничего не заказывали 🙄
                </div>
            )}
        </section>
    )
}
