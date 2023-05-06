import { ReactElement } from 'react'
import stylesOrders from './orders.module.css'
import { ProfileAsideMenu } from '../aside-menu/aside-menu'
import { Order } from './order/order'
import { TOrder } from '../../../utils/types'

type Resolve = {
    success: boolean
    orders: Array<TOrder>
    total: number
    totalToday: number
}

const resolve: Resolve = {
    success: true,
    orders: [
        {
            ingredients: [
                '643d69a5c3f7b9001cfa094a',
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093d',
            ],
            _id: '1',
            name: 'Death Star Starship Main бургер',
            status: 'done',
            number: '034535',
            createdAt: '2021-06-23T14:43:22.587Z',
            updatedAt: '2021-06-23T14:43:22.603Z',
        },
        {
            ingredients: [
                '643d69a5c3f7b9001cfa094a',
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093d',
            ],
            _id: '2',
            name: 'Interstellar бургер',
            status: 'process',
            number: '034536',
            createdAt: '2021-06-23T14:43:22.587Z',
            updatedAt: '2021-06-23T14:43:22.603Z',
        },
        {
            ingredients: [
                '643d69a5c3f7b9001cfa094a',
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093d',
            ],
            _id: '3',
            name: 'Black Hole Singularity острый бургер',
            status: 'done',
            number: '034537',
            createdAt: '2021-06-23T14:43:22.587Z',
            updatedAt: '2021-06-23T14:43:22.603Z',
        },
        {
            ingredients: [
                '643d69a5c3f7b9001cfa094a',
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093d',
            ],
            _id: '4',
            name: 'Supernova Infinity бургер',
            status: 'process',
            number: '034538',
            createdAt: '2021-06-23T14:43:22.587Z',
            updatedAt: '2021-06-23T14:43:22.603Z',
        },
    ],
    total: 1,
    totalToday: 1,
}

export function Orders(): ReactElement {
    return (
        <section className={stylesOrders.container}>
            <ProfileAsideMenu />
            <ul className={stylesOrders.orders}>
                {resolve.orders.map((order) => (
                    <Order key={order._id} order={order} />
                ))}
            </ul>
        </section>
    )
}
