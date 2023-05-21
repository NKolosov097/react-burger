import { ReactElement, useEffect } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation, useParams } from 'react-router-dom'
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
    const location = useLocation()
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch()

    useEffect(() => {
        getUserData()(dispatch)
        dispatch({ type: WS_AUTH_CONNECTION_START })
        return () => {
            dispatch({ type: WS_AUTH_CONNECTION_CLOSED })
        }
    }, [dispatch])

    const { orders } = useSelector((store) => store.wsAuthReducer)

    return (
        <section className={stylesOrders.wrapper}>
            <ProfileAsideMenu />
            {orders && orders.length > 0 ? (
                <ul className={`${stylesOrders.orders} pr-2 custom-scroll`}>
                    {orders &&
                        orders.map((order) => (
                            <Order
                                key={order._id}
                                order={order}
                                ordersPage
                                location={location}
                            />
                        ))}
                </ul>
            ) : (
                <div className={stylesOrders.emptyOrders}>
                    Вы пока ничего не заказывали 🙄
                </div>
            )}

            {id ? (
                <div
                    style={{
                        width: '100vw',
                        height: '100vh',
                        background: 'black',
                        fontSize: '100px',
                    }}
                >
                    в id что-то лежит
                </div>
            ) : null}
        </section>
    )
}
