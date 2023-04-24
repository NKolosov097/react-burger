import React, { ReactElement } from 'react'
import { MoneyLogo } from '../../images/money'
import priceStyles from './price-title.module.css'

export const PriceTitle = React.memo(
    ({ price }: { price: number }): ReactElement => (
        <h3 className={priceStyles.header}>
            {price}
            <span className={priceStyles.span}>
                <MoneyLogo size={22} />
            </span>
        </h3>
    )
)
