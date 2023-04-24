import React, { ReactElement } from 'react'
import stylesOrders from './orders.module.css'

export const Orders = React.memo(
    (): ReactElement => (
        <section className={stylesOrders.container}>
            Страница в разработке...
        </section>
    )
)
